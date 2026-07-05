import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { TimeBank } from './time-bank.entity';
import { ClockEvent, ClockEventType } from '../clock-events/clock-event.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class TimeBankService {
constructor(
  @InjectRepository(TimeBank)
  private timeBankRepo: Repository<TimeBank>,

  @InjectRepository(ClockEvent)
  private clockEventRepo: Repository<ClockEvent>,

  private readonly auditService: AuditService,
) {}

  /**
   * Calcula a diferença em minutos entre duas datas
   */
  private getMinutesBetween(start: Date, end: Date): number {
    const diffMs = end.getTime() - start.getTime();
    return Math.floor(diffMs / 1000 / 60);
  }
async findAll(
  tenantId: string,
) {
  return this.timeBankRepo.find({
    where: {
      tenantId,
    },
    order: {
      date: 'DESC',
    },
  });
}

async findByEmployee(
  tenantId: string,
  employeeId: string,
) {
  return this.timeBankRepo.find({
    where: {
      tenantId,
      employeeId,
    },
    order: {
      date: 'DESC',
    },
  });
}

async details(
  tenantId: string,
  employeeId: string,
) {

  const rows =
    await this.findByEmployee(
      tenantId,
      employeeId,
    );

  const totalBalance =
    rows.reduce(
      (acc, row) =>
        acc + row.balanceMinutes,
      0,
    );

  return {
    employeeId,
    totalBalance,
    days: rows,
  };
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

const saved =
  await this.timeBankRepo.save(
    timeBankRecord,
  );

await this.auditService.create({
  tenantId,
  entityId: saved.id,
  action: 'TIMEBANK_RECALCULATED',
  entityType: 'TimeBank',
  details: JSON.stringify({
    employeeId,
    targetDate,
  }),
});

return saved;  }
}
