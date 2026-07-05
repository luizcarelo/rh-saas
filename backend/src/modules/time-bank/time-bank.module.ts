import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeBank } from './time-bank.entity';
import { TimeBankService } from './time-bank.service';
import { TimeBankController } from './time-bank.controller';

import { ClockEvent } from '../clock-events/clock-event.entity';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    AuditModule,
    TypeOrmModule.forFeature([
      TimeBank,
      ClockEvent,
    ]),
  ],
  controllers: [
    TimeBankController,
  ],
  providers: [
    TimeBankService,
  ],
  exports: [
    TimeBankService,
  ],
})
export class TimeBankModule {}
