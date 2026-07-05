import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { Employee } from '../employees/employee.entity';
import { User } from '../users/user.entity';
import { Schedule } from '../schedules/schedule.entity';
import { TimeBank } from '../time-bank/time-bank.entity';
import { TimeRecord } from '../time-records/time-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      User,
      Schedule,
      TimeBank,
      TimeRecord,
    ]),
  ],
  controllers: [
    DashboardController,
  ],
  providers: [
    DashboardService,
  ],
})
export class DashboardModule {}
