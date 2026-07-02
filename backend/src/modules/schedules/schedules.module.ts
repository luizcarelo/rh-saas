import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { EmployeeSchedule } from './employee-schedule.entity';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, EmployeeSchedule])],
  providers: [SchedulesService],
  exports: [SchedulesService], // Exportado para ser usado no TimeBankModule depois
})
export class SchedulesModule {}
