import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClockEvent, ClockEventType } from './clock-event.entity';
import * as crypto from 'crypto';

@Injectable()
export class ClockEventsService {
  constructor(
    @InjectRepository(ClockEvent)
    private readonly clockEventRepository: Repository<ClockEvent>,
  ) {}

  /**
   * 1. GEOFENCING: Calcula a distância entre a batida e o local autorizado
   * Retorna a distância em metros (Fórmula de Haversine)
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Raio da Terra em metros
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  }

  /**
   * 2. ASSINATURA MTE: Gera o Hash SHA-256 para garantir imutabilidade
   */
  private generateSecurityHash(data: {
    tenantId: string;
    employeeId: string;
    timestamp: string;
    eventType: string;
    latitude: number;
    longitude: number;
  }): string {
    // A ordem dos fatores importa para o Hash. Padrão estrito de concatenação.
    const rawString = `${data.tenantId}|${data.employeeId}|${data.timestamp}|${data.eventType}|${data.latitude}|${data.longitude}`;
    return crypto.createHash('sha256').update(rawString).digest('hex');
  }

  /**
   * 3. REGISTRO OFICIAL DO PONTO (Chamado pela API / App do Colaborador)
   */
  async registerClock(data: {
    tenantId: string;
    employeeId: string;
    eventType: ClockEventType;
    latitude: number;
    longitude: number;
    allowedLatitude: number;
    allowedLongitude: number;
    allowedRadius: number; // Ex: 100 metros
    deviceInfo?: string;
    clientIp?: string;
  }): Promise<ClockEvent> {
    
    // Calcula se o funcionário está dentro da área permitida
    const distance = this.calculateDistance(
      data.latitude,
      data.longitude,
      data.allowedLatitude,
      data.allowedLongitude
    );
    
    const isInsideGeofence = distance <= data.allowedRadius;

    // Regra de Negócio: Se a empresa não permite bater ponto fora da cerca, barra aqui.
    // (Em um SaaS, isso geralmente é uma flag configurável no Painel do RH).
    // if (!isInsideGeofence && !tenantConfig.allowOutlyingClockIn) {
    //   throw new BadRequestException('Sua localização atual está fora do raio permitido pela empresa.');
    // }

    // Congela o tempo exato (UTC) da transação para o MTE
    const currentTimestamp = new Date().toISOString(); 
    
    // Gera a assinatura inviolável
    const rowHash = this.generateSecurityHash({
      tenantId: data.tenantId,
      employeeId: data.employeeId,
      timestamp: currentTimestamp,
      eventType: data.eventType,
      latitude: data.latitude,
      longitude: data.longitude
    });

    // Instancia o novo evento de ponto (Imutável)
    const newEvent = this.clockEventRepository.create({
      tenantId: data.tenantId,
      employeeId: data.employeeId,
      eventType: data.eventType,
      latitude: data.latitude,
      longitude: data.longitude,
      isInsideGeofence,
      deviceInfo: data.deviceInfo,
      clientIp: data.clientIp,
      rowHash // Hash salvo diretamente na linha
    });

    // Salva no banco (PostgreSQL)
    return this.clockEventRepository.save(newEvent);
  }
}
