import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

export enum ClockEventType {
  ENTRADA = 'ENTRADA',
  SAIDA_INTERVALO = 'SAIDA_INTERVALO',
  RETORNO_INTERVALO = 'RETORNO_INTERVALO',
  SAIDA = 'SAIDA',
  EXTRA = 'EXTRA'
}

@Entity('clock_events')
export class ClockEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  // A Portaria 671 exige data/hora exata do registro e o fuso horário
  @CreateDateColumn({ name: 'timestamp', type: 'timestamp with time zone' })
  timestamp: Date;

  @Column({ default: 'UTC' })
  timezone: string;

  @Column({ type: 'enum', enum: ClockEventType })
  eventType: ClockEventType;

  // Coordenadas geográficas para validação posterior (PostGIS)
  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ name: 'is_inside_geofence', default: true })
  isInsideGeofence: boolean;

  // Auditoria do dispositivo usado para bater o ponto
  @Column({ name: 'device_info', type: 'text', nullable: true })
  deviceInfo: string;

  @Column({ name: 'client_ip', length: 45, nullable: true })
  clientIp: string;

  // ASSINATURA DIGITAL (HASH SHA-256): Garante que a linha não foi adulterada no banco de dados
  @Column({ type: 'varchar', length: 64, unique: true })
  rowHash: string;
}
