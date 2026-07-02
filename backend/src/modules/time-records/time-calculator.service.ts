import { Injectable } from '@nestjs/common';
import { TimeRecord } from './time-record.entity';

@Injectable()
export class TimeCalculatorService {
  
  // Converte "HH:mm" para minutos totais (Ex: "08:30" -> 510)
  timeToMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + minutes;
  }

  // Converte minutos para string formatada "+HH:mm" ou "-HH:mm"
  minutesToBalanceString(totalMinutes: number): string {
    const sign = totalMinutes >= 0 ? '+' : '-';
    const absMinutes = Math.abs(totalMinutes);
    const hours = Math.floor(absMinutes / 60).toString().padStart(2, '0');
    const mins = (absMinutes % 60).toString().padStart(2, '0');
    return `${sign}${hours}:${mins}`;
  }

  // Recebe as batidas do dia e calcula o saldo baseado na escala
  calculateDailyBalance(records: TimeRecord[], expectedMinutes: number) {
    if (records.length === 0) {
      return { status: 'falta', balanceMinutes: -expectedMinutes, balanceStr: this.minutesToBalanceString(-expectedMinutes) };
    }

    // Ordena as batidas cronologicamente
    const sorted = records.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    let workedMinutes = 0;

    // Lógica para pares de batidas (Entrada 1 -> Saída 1, Entrada 2 -> Saída 2)
    for (let i = 0; i < sorted.length; i += 2) {
      if (sorted[i + 1]) {
        const inTime = new Date(sorted[i].timestamp).getTime();
        const outTime = new Date(sorted[i + 1].timestamp).getTime();
        const diffMs = outTime - inTime;
        workedMinutes += Math.floor(diffMs / 60000); // Converte MS para minutos
      }
    }

    // Identifica se esqueceu de bater a saída (ímpar)
    if (sorted.length % 2 !== 0) {
      return { status: 'incompleto', balanceMinutes: 0, balanceStr: 'Erro: Batida ímpar', workedMinutes };
    }

    const balanceMinutes = workedMinutes - expectedMinutes;
    const balanceStr = this.minutesToBalanceString(balanceMinutes);
    
    // Define o status (com tolerância de 10 minutos por dia segundo a CLT)
    let status = 'ok';
    if (balanceMinutes < -10) status = 'atraso';
    else if (balanceMinutes > 10) status = 'extra';

    return { status, balanceMinutes, balanceStr, workedMinutes };
  }
}
