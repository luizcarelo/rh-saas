import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit.entity';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    
    // Só auditamos ações de escrita
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const user = request.user;
      
      const log = this.repo.create({
        userId: user?.id || 'SYSTEM',
        action: request.method,
        resource: request.url,
        payload: request.body,
        ipAddress: request.ip || request.connection.remoteAddress
      });
      
      await this.repo.save(log).catch(console.error);
    }
    
    return next.handle();
  }
}
