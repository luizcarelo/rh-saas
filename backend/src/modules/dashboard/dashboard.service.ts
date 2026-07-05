import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from '../employees/employee.entity';
import { User } from '../users/user.entity';
import { Schedule } from '../schedules/schedule.entity';
import { TimeBank } from '../time-bank/time-bank.entity';
import { TimeRecord } from '../time-records/time-record.entity';

@Injectable()
export class DashboardService {

  constructor(

    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,

    @InjectRepository(TimeBank)
    private timeBankRepo: Repository<TimeBank>,

    @InjectRepository(TimeRecord)
    private timeRecordRepo: Repository<TimeRecord>,
  ) {}

  async overview(tenantId: string) {

    const employees =
      await this.employeeRepo.count({
        where: { tenantId },
      });

    const users =
      await this.userRepo.count({
        where: { tenantId },
      });

    const schedules =
      await this.scheduleRepo.count({
        where: { tenantId },
      });

    const timeBank =
      await this.timeBankRepo.find({
        where: { tenantId },
      });

    const positiveBalance =
      timeBank
        .filter(x => x.balanceMinutes > 0)
        .reduce(
          (a, b) => a + b.balanceMinutes,
          0,
        );

    const negativeBalance =
      timeBank
        .filter(x => x.balanceMinutes < 0)
        .reduce(
          (a, b) => a + b.balanceMinutes,
          0,
        );

    return {
      employees,
      users,
      schedules,
      positiveBalance,
      negativeBalance,
    };
  }

  async employees(tenantId: string) {
    return this.employeeRepo.find({
      where: { tenantId },
    });
  }

  async schedules(tenantId: string) {
    return this.scheduleRepo.find({
      where: { tenantId },
    });
  }

  async timeBank(tenantId: string) {
    return this.timeBankRepo.find({
      where: { tenantId },
    });
  }

  async timeRecords(tenantId: string) {
    return this.timeRecordRepo.find({
      where: { tenantId },
      order: {
        timestamp: 'DESC',
      },
      take: 50,
    });
  }

  async executive(tenantId: string) {

    const employees =
      await this.employeeRepo.count({
        where: { tenantId },
      });

    const users =
      await this.userRepo.count({
        where: { tenantId },
      });

    const schedules =
      await this.scheduleRepo.count({
        where: { tenantId },
      });

    const timeBankRows =
      await this.timeBankRepo.find({
        where: { tenantId },
      });

    const positiveBalance =
      timeBankRows
        .filter(x => x.balanceMinutes > 0)
        .reduce(
          (a, b) => a + b.balanceMinutes,
          0,
        );

    const negativeBalance =
      timeBankRows
        .filter(x => x.balanceMinutes < 0)
        .reduce(
          (a, b) => a + b.balanceMinutes,
          0,
        );

    const timeBankRecords =
      timeBankRows.length;

    return {
      employees,
      users,
      schedules,
      positiveBalance,
      negativeBalance,
      timeBankRecords,
    };
  }

}
