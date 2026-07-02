import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeRecord } from './time-record.entity';

@Injectable()
export class TimeRecordsService {
  constructor(
    @InjectRepository(TimeRecord)
    private repo: Repository<TimeRecord>,
  ) {}

  async clockIn(tenantId: string, employeeId: string, latitude: number, longitude: number) {
    const record = this.repo.create({ tenantId, employeeId, latitude, longitude });
    return this.repo.save(record);
  }

  async findAll(tenantId: string) {
    return this.repo.find({
      where: { tenantId },
      order: { timestamp: 'DESC' },
    });
  }

  // Gera o layout oficial do Arquivo Fonte de Dados (AFD) conforme Portaria 671 MTE
  async generateAfd(tenantId: string): Promise<string> {
    const records = await this.findAll(tenantId);
    let nsr = 1; // Número Sequencial de Registro
    let afdContent = "";

    // Cabeçalho (Tipo 1)
    const cnpj = "12345678000100".padEnd(14, '0');
    afdContent += `00000000011${cnpj}SAAS RH PRO EMPRESA TESTE                 00001\r\n`;

    // Detalhe das Batidas (Tipo 3)
    for (const rec of records) {
      const seq = String(nsr++).padStart(9, '0');
      const date = new Date(rec.timestamp);
      const dia = String(date.getDate()).padStart(2, '0');
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const ano = date.getFullYear();
      const hora = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      const cpf = "12345678901"; // Em produção, buscar do cadastro de colaboradores

      afdContent += `${seq}3${dia}${mes}${ano}${hora}${min}${cpf}4B6F\r\n`;
    }

    return afdContent;
  }
}
