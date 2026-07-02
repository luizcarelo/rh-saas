import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { TimeRecord } from '../time-records/time-record.entity';

@Injectable()
export class AnalyticsService {
  constructor(@InjectRepository(TimeRecord) private repo: Repository<TimeRecord>) {}

  async getDashboardStats(tenantId: string, startDate?: string, endDate?: string) {
    const where: any = { tenantId };
    
    if (startDate && endDate) {
        where.createdAt = Between(new Date(startDate), new Date(endDate));
    }

    const records = await this.repo.find({ where });
    
    return {
      totalRecords: records.length,
      punctualityRate: 94, // Lógica a refinar
      overtimeMinutes: 120,
      absenteeismRate: 2.5
    };
  }
}
