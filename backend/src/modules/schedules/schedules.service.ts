import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule, ScheduleType } from './schedule.entity';
import { EmployeeSchedule } from './employee-schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
    @InjectRepository(EmployeeSchedule)
    private employeeScheduleRepo: Repository<EmployeeSchedule>,
  ) {}

  /**
   * Método chamado pelo Banco de Horas para saber: 
   * "Quantos minutos este funcionário tem que trabalhar hoje?"
   */
  async getExpectedMinutesForDate(tenantId: string, employeeId: string, targetDateStr: string): Promise<{ expected: number, tolerance: number }> {
    const targetDate = new Date(`${targetDateStr}T12:00:00Z`); // Meio-dia para evitar bug de fuso na extração do dia
    
    // Busca a escala ativa do funcionário para a data desejada
    const link = await this.employeeScheduleRepo.createQueryBuilder('es')
      .leftJoinAndSelect('es.schedule', 'schedule')
      .where('es.tenantId = :tenantId', { tenantId })
      .andWhere('es.employeeId = :employeeId', { employeeId })
      .andWhere('es.startDate <= :targetDate', { targetDate: targetDateStr })
      .andWhere('(es.endDate IS NULL OR es.endDate >= :targetDate)', { targetDate: targetDateStr })
      .getOne();

    if (!link) {
      return { expected: 0, tolerance: 0 }; // Sem escala, ou dia livre
    }

    const { schedule } = link;

    // LÓGICA 1: Escala Fixa (Verifica os dias da semana)
    if (schedule.type === ScheduleType.FIXED) {
      const dayOfWeek = targetDate.getUTCDay();
      if (schedule.workDays && schedule.workDays.includes(dayOfWeek)) {
        return { expected: schedule.expectedMinutesPerDay, tolerance: schedule.dailyToleranceMinutes };
      }
      return { expected: 0, tolerance: schedule.dailyToleranceMinutes }; // Final de semana/folga
    }

    // LÓGICA 2: Escala 12x36 (Verifica a paridade dos dias desde o início)
    if (schedule.type === ScheduleType.SHIFT_12X36) {
      const startDate = new Date(`${link.startDate}T12:00:00Z`);
      const diffTime = Math.abs(targetDate.getTime() - startDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Se a diferença de dias for PAR (0, 2, 4...), é dia de trabalho. Se IMPAR, é folga.
      if (diffDays % 2 === 0) {
        return { expected: schedule.expectedMinutesPerDay, tolerance: schedule.dailyToleranceMinutes };
      }
      return { expected: 0, tolerance: schedule.dailyToleranceMinutes };
    }

    return { expected: 0, tolerance: 0 };
  }
}
