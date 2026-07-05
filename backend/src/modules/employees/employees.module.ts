import { AuditModule } from '../audit/audit.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { User } from '../users/user.entity';

@Module({
  imports: [AuditModule, 
    TypeOrmModule.forFeature([
      Employee,
      User,
    ]),
  ],
  providers: [
    EmployeesService,
  ],
  controllers: [
    EmployeesController,
  ],
  exports: [
    EmployeesService,
  ],
})
export class EmployeesModule {}
