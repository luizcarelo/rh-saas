import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

import { Employee } from '../employees/employee.entity';
import { Schedule } from '../schedules/schedule.entity';
import { TimeBank } from '../time-bank/time-bank.entity';
import { TimeRecord } from '../time-records/time-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Schedule,
      TimeBank,
      TimeRecord,
    ]),
  ],
  controllers: [
    ReportsController,
  ],
  providers: [
    ReportsService,
  ],
})
export class ReportsModule {}
