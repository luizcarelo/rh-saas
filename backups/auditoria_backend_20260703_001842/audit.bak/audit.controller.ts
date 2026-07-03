import { Controller, Get } from '@nestjs/common';

type AuditLogResponse = {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  userId: string | null;
  userEmail: string | null;
  ip: string | null;
  createdAt: string;
  metadata: Record<string, unknown>;
};

@Controller('audit')
export class AuditController {
  @Get()
  findAll(): AuditLogResponse[] {
    return [];
  }
}
