import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './audit.entity';
import { AuditInterceptor } from './audit.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  providers: [
    AuditInterceptor,
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor }
  ],
  exports: [AuditInterceptor]
})
export class AuditModule {}
