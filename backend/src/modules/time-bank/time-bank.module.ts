import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeBank } from './time-bank.entity';
import { TimeBankService } from './time-bank.service';
// Importamos a entidade ClockEvent para que o serviço possa consultá-la
import { ClockEvent } from '../clock-events/clock-event.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([TimeBank, ClockEvent])],
  providers: [TimeBankService],
  exports: [TimeBankService],
})
export class TimeBankModule {}
