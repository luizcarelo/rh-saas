import { AuditService } from '../audit/audit.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {

  constructor(
    @InjectRepository(Document)
    private repo: Repository<Document>,

    private readonly auditService: AuditService,
  ) {}

  async uploadDocument(
    tenantId: string,
    employeeId: string,
    filename: string,
    path: string,
  ) {

    const doc = this.repo.create({
      tenantId,
      employeeId,
      filename,
      path,
    });

    const savedDoc =
      await this.repo.save(doc);

    await this.auditService.create({
      tenantId,
      entityId: savedDoc.id,
      action: 'DOCUMENT_UPLOADED',
      entityType: 'Document',
      details: filename,
    });

    return savedDoc;
  }

  async listForEmployee(
    tenantId: string,
    employeeId: string,
  ) {
    return this.repo.find({
      where: {
        tenantId,
        employeeId,
      },
    });
  }
}