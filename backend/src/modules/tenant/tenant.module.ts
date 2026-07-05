import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    AuditModule,
    TypeOrmModule.forFeature([
      Tenant,
    ]),
  ],
  providers: [
    TenantService,
  ],
  controllers: [
    TenantController,
  ],
  exports: [
    TenantService,
  ],
})
export class TenantModule {}
