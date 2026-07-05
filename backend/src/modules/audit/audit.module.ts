import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditController } from './audit.controller';
import { AuditEvent } from './audit.entity';
import { AuditService } from './audit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuditEvent,
    ]),
  ],
    controllers: [
    AuditController,
  ],
  providers: [
    AuditService,
  ],
  exports: [
    AuditService,
  ],
})
export class AuditModule {}
