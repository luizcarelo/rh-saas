import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { TimeBank } from './time-bank.entity';
import { ClockEvent, ClockEventType } from '../clock-events/clock-event.entity';

@Injectable()
export class TimeBankService {
  constructor(
    @InjectRepository(TimeBank)
    private timeBankRepo: Repository<TimeBank>,
    @InjectRepository(ClockEvent)
    private clockEventRepo: Repository<ClockEvent>,
  ) {}

  /**
   * Calcula a diferença em minutos entre duas datas
   */
  private getMinutesBetween(start: Date, end: Date): number {
    const diffMs = end.getTime() - start.getTime();
    return Math.floor(diffMs / 1000 / 60);
  }

  /**
   * Processa o saldo do dia cruzando os pontos batidos com a jornada prevista
   */
  async processDailyBalance(tenantId: string, employeeId: string, targetDate: string, expectedMinutes: number) {
    // 1. Define o início e fim do dia para buscar as batidas no banco
    const startOfDay = new Date(`${targetDate}T00:00:00.000Z`);
    const endOfDay = new Date(`${targetDate}T23:59:59.999Z`);

    // 2. Busca todas as batidas imutáveis do funcionário neste dia
    const events = await this.clockEventRepo.find({
      where: {
        tenantId,
        employeeId,
        timestamp: Between(startOfDay, endOfDay)
      },
      order: { timestamp: 'ASC' } // Ordena cronologicamente
    });

    let workedMinutes = 0;
    let lastEntryTime: Date | null = null;

    // 3. Lógica pareada de cálculo (Entrada -> Saída)
    for (const event of events) {
      if (event.eventType === ClockEventType.ENTRADA || event.eventType === ClockEventType.RETORNO_INTERVALO) {
        lastEntryTime = event.timestamp;
      } 
      else if (event.eventType === ClockEventType.SAIDA_INTERVALO || event.eventType === ClockEventType.SAIDA) {
        if (lastEntryTime) {
          workedMinutes += this.getMinutesBetween(lastEntryTime, event.timestamp);
          lastEntryTime = null; // Reseta para o próximo par
        }
      }
    }

    // 4. Calcula o saldo final (Matemática Trabalhista)
    const balanceMinutes = workedMinutes - expectedMinutes;

    // 5. Salva ou atualiza o banco de horas do dia
    let timeBankRecord = await this.timeBankRepo.findOne({
      where: { tenantId, employeeId, date: targetDate }
    });

    if (!timeBankRecord) {
      timeBankRecord = this.timeBankRepo.create({
        tenantId,
        employeeId,
        date: targetDate,
        expectedMinutes,
      });
    }

    timeBankRecord.workedMinutes = workedMinutes;
    timeBankRecord.balanceMinutes = balanceMinutes;

    return this.timeBankRepo.save(timeBankRecord);
  }
}
