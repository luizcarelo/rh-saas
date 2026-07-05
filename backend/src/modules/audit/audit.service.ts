import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuditEvent } from './audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEvent)
    private readonly repo: Repository<AuditEvent>,
  ) {}

  async create(
    data: Partial<AuditEvent>,
  ) {
    const event =
      this.repo.create(data);

    return this.repo.save(event);
  }

  async findAll() {
    return this.repo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(
    id: string,
  ) {
    const event =
      await this.repo.findOne({
        where: { id },
      });

    if (!event) {
      throw new NotFoundException(
        'Evento de auditoria não encontrado.',
      );
    }

    return event;
  }

  async findByAction(
    action: string,
  ) {
    return this.repo.find({
      where: {
        action,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByEntity(
    entityType: string,
  ) {
    return this.repo.find({
      where: {
        entityType,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}