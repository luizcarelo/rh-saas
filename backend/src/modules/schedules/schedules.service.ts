import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Schedule, ScheduleType } from './schedule.entity';
import { EmployeeSchedule } from './employee-schedule.entity';

import { AuditService } from '../audit/audit.service';
import { AssignScheduleDto } from './dto/assign-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,

    @InjectRepository(EmployeeSchedule)
    private employeeScheduleRepo: Repository<EmployeeSchedule>,

    private readonly auditService: AuditService,
  ) {}

  async findAll(tenantId: string) {
    return this.scheduleRepo.find({
      where: { tenantId },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(
    id: string,
    tenantId: string,
  ) {
    const schedule =
      await this.scheduleRepo.findOne({
        where: {
          id,
          tenantId,
        },
      });

    if (!schedule) {
      throw new NotFoundException(
        'Escala não encontrada.',
      );
    }

    return schedule;
  }

  async create(
    tenantId: string,
    data: Partial<Schedule>,
  ) {
    const schedule =
      this.scheduleRepo.create({
        ...data,
        tenantId,
      });

    const saved =
      await this.scheduleRepo.save(schedule);

    await this.auditService.create({
      tenantId,
      entityId: saved.id,
      action: 'SCHEDULE_CREATED',
      entityType: 'Schedule',
      details: saved.name,
    });

    return saved;
  }

  async update(
    id: string,
    tenantId: string,
    data: Partial<Schedule>,
  ) {
    const schedule =
      await this.findOne(
        id,
        tenantId,
      );

    Object.assign(
      schedule,
      data,
    );

    const updated =
      await this.scheduleRepo.save(
        schedule,
      );

    await this.auditService.create({
      tenantId,
      entityId: updated.id,
      action: 'SCHEDULE_UPDATED',
      entityType: 'Schedule',
      details: updated.name,
    });

    return updated;
  }

  async remove(
    id: string,
    tenantId: string,
  ) {
    await this.findOne(
      id,
      tenantId,
    );

    await this.auditService.create({
      tenantId,
      entityId: id,
      action: 'SCHEDULE_DELETED',
      entityType: 'Schedule',
    });

    return this.scheduleRepo.delete({
      id,
      tenantId,
    });
  }

  async assign(
    tenantId: string,
    dto: AssignScheduleDto,
  ) {
    const link =
      this.employeeScheduleRepo.create({
        tenantId,
        employeeId: dto.employeeId,
        scheduleId: dto.scheduleId,
        startDate: dto.startDate,
        endDate: dto.endDate,
      });

    const saved =
      await this.employeeScheduleRepo.save(
        link,
      );

    await this.auditService.create({
      tenantId,
      entityId: saved.id,
      action: 'SCHEDULE_ASSIGNED',
      entityType: 'EmployeeSchedule',
      details: JSON.stringify(dto),
    });

    return saved;
  }

  async getEmployeeSchedule(
    tenantId: string,
    employeeId: string,
  ) {
    return this.employeeScheduleRepo
      .createQueryBuilder('es')
      .leftJoinAndSelect(
        'es.schedule',
        'schedule',
      )
      .where(
        'es.tenantId = :tenantId',
        { tenantId },
      )
      .andWhere(
        'es.employeeId = :employeeId',
        { employeeId },
      )
      .orderBy(
        'es.startDate',
        'DESC',
      )
      .getMany();
  }
async getEmployeeScheduleActive(
  tenantId: string,
  employeeId: string,
) {
  return this.employeeScheduleRepo
    .createQueryBuilder('es')
    .leftJoinAndSelect(
      'es.schedule',
      'schedule',
    )
    .where(
      'es.tenantId = :tenantId',
      { tenantId },
    )
    .andWhere(
      'es.employeeId = :employeeId',
      { employeeId },
    )
    .andWhere('es.endDate IS NULL')
    .orderBy(
      'es.startDate',
      'DESC',
    )
    .getOne();
}

async unassign(
  tenantId: string,
  assignmentId: string,
) {

  const link =
    await this.employeeScheduleRepo.findOne({
      where: {
        id: assignmentId,
        tenantId,
      },
    });

  if (!link) {
    throw new NotFoundException(
      'Vínculo não encontrado.',
    );
  }

  await this.auditService.create({
    tenantId,
    entityId: assignmentId,
    action: 'SCHEDULE_UNASSIGNED',
    entityType: 'EmployeeSchedule',
  });

  return this.employeeScheduleRepo.delete({
    id: assignmentId,
  });
}

async endAssignment(
  tenantId: string,
  assignmentId: string,
  endDate: string,
) {

  const link =
    await this.employeeScheduleRepo.findOne({
      where: {
        id: assignmentId,
        tenantId,
      },
    });

  if (!link) {
    throw new NotFoundException(
      'Vínculo não encontrado.',
    );
  }

  link.endDate = endDate;

  const saved =
    await this.employeeScheduleRepo.save(
      link,
    );

  await this.auditService.create({
    tenantId,
    entityId: saved.id,
    action: 'SCHEDULE_ENDED',
    entityType: 'EmployeeSchedule',
    details: endDate,
  });

  return saved;
}
  /**
   * Método chamado pelo Banco de Horas para saber:
   * "Quantos minutos este funcionário tem que trabalhar hoje?"
   */
  async getExpectedMinutesForDate(
    tenantId: string,
    employeeId: string,
    targetDateStr: string,
  ): Promise<{
    expected: number;
    tolerance: number;
  }> {

    const targetDate =
      new Date(
        `${targetDateStr}T12:00:00Z`,
      );

    const link =
      await this.employeeScheduleRepo
        .createQueryBuilder('es')
        .leftJoinAndSelect(
          'es.schedule',
          'schedule',
        )
        .where(
          'es.tenantId = :tenantId',
          { tenantId },
        )
        .andWhere(
          'es.employeeId = :employeeId',
          { employeeId },
        )
        .andWhere(
          'es.startDate <= :targetDate',
          { targetDate: targetDateStr },
        )
        .andWhere(
          '(es.endDate IS NULL OR es.endDate >= :targetDate)',
          { targetDate: targetDateStr },
        )
        .getOne();

    if (!link) {
      return {
        expected: 0,
        tolerance: 0,
      };
    }

    const { schedule } = link;

    if (
      schedule.type ===
      ScheduleType.FIXED
    ) {
      const dayOfWeek =
        targetDate.getUTCDay();

      if (
        schedule.workDays &&
        schedule.workDays.includes(
          dayOfWeek,
        )
      ) {
        return {
          expected:
            schedule.expectedMinutesPerDay,
          tolerance:
            schedule.dailyToleranceMinutes,
        };
      }

      return {
        expected: 0,
        tolerance:
          schedule.dailyToleranceMinutes,
      };
    }

    if (
      schedule.type ===
      ScheduleType.SHIFT_12X36
    ) {
      const startDate =
        new Date(
          `${link.startDate}T12:00:00Z`,
        );

      const diffTime =
        Math.abs(
          targetDate.getTime() -
          startDate.getTime(),
        );

      const diffDays =
        Math.floor(
          diffTime /
          (1000 * 60 * 60 * 24),
        );

      if (diffDays % 2 === 0) {
        return {
          expected:
            schedule.expectedMinutesPerDay,
          tolerance:
            schedule.dailyToleranceMinutes,
        };
      }

      return {
        expected: 0,
        tolerance:
          schedule.dailyToleranceMinutes,
      };
    }

    return {
      expected: 0,
      tolerance: 0,
    };
  }
}