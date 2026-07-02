import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private repo: Repository<Document>,
  ) {}

  async uploadDocument(tenantId: string, employeeId: string, filename: string, path: string) {
    const doc = this.repo.create({ tenantId, employeeId, filename, path });
    return this.repo.save(doc);
  }

  async listForEmployee(tenantId: string, employeeId: string) {
    return this.repo.find({ where: { tenantId, employeeId } });
  }
}
