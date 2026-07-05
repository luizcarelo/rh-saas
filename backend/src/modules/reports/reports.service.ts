import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from '../employees/employee.entity';
import { Schedule } from '../schedules/schedule.entity';
import { TimeBank } from '../time-bank/time-bank.entity';
import { TimeRecord } from '../time-records/time-record.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,

    @InjectRepository(TimeBank)
    private readonly timeBankRepo: Repository<TimeBank>,

    @InjectRepository(TimeRecord)
    private readonly timeRecordRepo: Repository<TimeRecord>,
  ) {}

  async employees(tenantId: string) {
    const employees = await this.employeeRepo.find({
      where: { tenantId },
    });

    return {
      total: employees.length,
      active: employees.filter(
        (e) => e.isActive,
      ).length,
      inactive: employees.filter(
        (e) => !e.isActive,
      ).length,
      data: employees,
    };
  }

  async schedules(tenantId: string) {
    const schedules =
      await this.scheduleRepo.find({
        where: { tenantId },
      });

    return {
      total: schedules.length,
      data: schedules,
    };
  }

  async timeBank(tenantId: string) {
    const records =
      await this.timeBankRepo.find({
        where: { tenantId },
      });

    return {
      total: records.length,
      data: records,
    };
  }

  async afd(tenantId: string) {
    const records =
      await this.timeRecordRepo.find({
        where: { tenantId },
        order: {
          timestamp: 'DESC',
        },
      });

    return {
      total: records.length,
      data: records,
    };
  }

  async executive(tenantId: string) {
    const [
      employees,
      schedules,
      timeBankRecords,
    ] = await Promise.all([
      this.employeeRepo.count({
        where: { tenantId },
      }),
      this.scheduleRepo.count({
        where: { tenantId },
      }),
      this.timeBankRepo.find({
        where: { tenantId },
      }),
    ]);

    const positiveBalance =
      timeBankRecords
        .filter(
          (r) => r.balanceMinutes > 0,
        )
        .reduce(
          (acc, r) =>
            acc + r.balanceMinutes,
          0,
        );

    const negativeBalance =
      timeBankRecords
        .filter(
          (r) => r.balanceMinutes < 0,
        )
        .reduce(
          (acc, r) =>
            acc + r.balanceMinutes,
          0,
        );

    return {
      employees,
      schedules,
      timeBankRecords:
        timeBankRecords.length,
      positiveBalance,
      negativeBalance,
    };
  }

  async productivity(tenantId: string) {
    const employees =
      await this.employeeRepo.count({
        where: { tenantId },
      });

    const records =
      await this.timeRecordRepo.count({
        where: { tenantId },
      });

    return {
      employees,
      timeRecords: records,
      averageRecordsPerEmployee:
        employees > 0
          ? Number(
              (
                records /
                employees
              ).toFixed(2),
            )
          : 0,
    };
  }

  async timeBankSummary(
    tenantId: string,
  ) {
    const records =
      await this.timeBankRepo.find({
        where: { tenantId },
      });

    const positiveBalanceMinutes =
      records
        .filter(
          (r) => r.balanceMinutes > 0,
        )
        .reduce(
          (acc, r) =>
            acc + r.balanceMinutes,
          0,
        );

    const negativeBalanceMinutes =
      records
        .filter(
          (r) => r.balanceMinutes < 0,
        )
        .reduce(
          (acc, r) =>
            acc + r.balanceMinutes,
          0,
        );

    return {
      positiveBalanceMinutes,
      negativeBalanceMinutes,
      netBalanceMinutes:
        positiveBalanceMinutes +
        negativeBalanceMinutes,
      records: records.length,
    };
  }

  async scheduleDistribution(
    tenantId: string,
  ) {
    const schedules =
      await this.scheduleRepo.find({
        where: { tenantId },
      });

    return {
      FIXED: schedules.filter(
        (s) => s.type === 'FIXED',
      ).length,

      SHIFT_12X36:
        schedules.filter(
          (s) =>
            s.type ===
            'SHIFT_12X36',
        ).length,
    };
  }
}