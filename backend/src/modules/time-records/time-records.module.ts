import { TimeCalculatorService } from "./time-calculator.service";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeRecord } from './time-record.entity';
import { TimeRecordsService } from './time-records.service';
import { TimeRecordsController } from './time-records.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TimeRecord])],
  controllers: [TimeRecordsController],
  providers: [TimeRecordsService, TimeCalculatorService],
})
export class TimeRecordsModule {}
