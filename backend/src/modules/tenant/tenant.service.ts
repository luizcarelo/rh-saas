import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tenant } from './tenant.entity';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class TenantService {

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,

    private readonly auditService: AuditService,
  ) {}

  async findOne(tenantId: string) {

    const tenant =
      await this.tenantRepo.findOne({
        where: { id: tenantId },
      });

    if (!tenant) {
      throw new NotFoundException(
        'Tenant não encontrado.',
      );
    }

    return tenant;
  }

  async update(
    tenantId: string,
    data: UpdateTenantDto,
  ) {

    const tenant =
      await this.findOne(tenantId);

    Object.assign(
      tenant,
      data,
    );

    const updated =
      await this.tenantRepo.save(tenant);

    await this.auditService.create({
      tenantId,
      entityId: tenantId,
      action: 'TENANT_UPDATED',
      entityType: 'Tenant',
      details: JSON.stringify(data),
    });

    return updated;
  }
}
