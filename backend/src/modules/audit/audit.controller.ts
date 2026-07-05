import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {

  constructor(
    private readonly auditService: AuditService,
  ) {}

  @Get()
  async findAll() {
    return this.auditService.findAll();
  }

  @Get('action/:action')
  async findByAction(
    @Param('action') action: string,
  ) {
    return this.auditService.findByAction(
      action,
    );
  }

  @Get('entity/:entityType')
  async findByEntity(
    @Param('entityType')
    entityType: string,
  ) {
    return this.auditService.findByEntity(
      entityType,
    );
  }

  @Get(':id')
  async findById(
    @Param('id')
    id: string,
  ) {
    return this.auditService.findById(
      id,
    );
  }
}