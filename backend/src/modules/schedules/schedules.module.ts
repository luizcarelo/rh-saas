import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Schedule } from './schedule.entity';
import { EmployeeSchedule } from './employee-schedule.entity';

import { SchedulesService } from './schedules.service';
import { ScheduleController } from './schedule.controller';

import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    AuditModule,
    TypeOrmModule.forFeature([
      Schedule,
      EmployeeSchedule,
    ]),
  ],
  providers: [
    SchedulesService,
  ],
  controllers: [
    ScheduleController,
  ],
  exports: [
    SchedulesService,
  ],
})
export class SchedulesModule {}