# Admin-A1-FUNC-AUDIT-P2

Data: 20260705_160237

====================================================
ARQUIVOS LOCALIZADOS
====================================================

EMPLOYEE_ENTITY=/opt/rh-saas/backend/src/modules/employees/employee.entity.ts
EMPLOYEE_CONTROLLER=/opt/rh-saas/backend/src/modules/employees/employees.controller.ts
EMPLOYEE_SERVICE=/opt/rh-saas/backend/src/modules/employees/employees.service.ts
CREATE_EMPLOYEE_DTO=/opt/rh-saas/backend/src/modules/employees/dto/create-employee.dto.ts
LINK_USER_DTO=/opt/rh-saas/backend/src/modules/employees/dto/link-user.dto.ts
USER_ENTITY=/opt/rh-saas/backend/src/modules/users/user.entity.ts
DOCUMENT_ENTITY=/opt/rh-saas/backend/src/modules/documents/document.entity.ts

====================================================
EMPLOYEE ENTITY
====================================================

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tenant } from '../tenant/tenant.entity';
import { User } from '../users/user.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @OneToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: true,
  })
  userId: string | null;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    length: 11,
  })
  cpf: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  department: string;

  @Column({
    nullable: true,
  })
  jobTitle: string;

  @Column({
    type: 'date',
  })
  admissionDate: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

====================================================
EMPLOYEES CONTROLLER
====================================================

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LinkUserDto } from './dto/link-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('v1/employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.RH)
  async create(
    @Body() createDto: CreateEmployeeDto,
    @Req() req: any,
  ) {
    return this.employeesService.create(
      req.user.tenantId,
      createDto,
    );
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.RH)
  async findAll(
    @Req() req: any,
  ) {
    return this.employeesService.findAll(
      req.user.tenantId,
    );
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.RH)
  async findOne(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.employeesService.findOne(
      id,
      req.user.tenantId,
    );
  }

  @Put(':id/link-user')
  @Roles(UserRole.ADMIN, UserRole.RH)
  async linkUser(
    @Param('id') id: string,
    @Body() dto: LinkUserDto,
    @Req() req: any,
  ) {
    return this.employeesService.linkUser(
      id,
      req.user.tenantId,
      dto.userId,
    );
  }

  @Delete(':id/link-user')
  @Roles(UserRole.ADMIN, UserRole.RH)
  async unlinkUser(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.employeesService.unlinkUser(
      id,
      req.user.tenantId,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.RH)
  async remove(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.employeesService.remove(
      id,
      req.user.tenantId,
    );
  }
}

====================================================
EMPLOYEES SERVICE
====================================================

import { AuditService } from '../audit/audit.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { User } from '../users/user.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly auditService: AuditService,
  ) {}

  async create(
    tenantId: string,
    data: CreateEmployeeDto,
  ) {
    const employee = this.employeeRepo.create({
      ...data,
      tenantId,
    });

    const savedEmployee =
      await this.employeeRepo.save(employee);

    await this.auditService.create({
      tenantId,
      entityId: savedEmployee.id,
      action: 'EMPLOYEE_CREATED',
      entityType: 'Employee',
    });

    return savedEmployee;
  }

  async findAll(tenantId: string) {
    return this.employeeRepo.find({
      where: {
        tenantId,
      },
      relations: {
        user: true,
      },
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  async findOne(
    id: string,
    tenantId: string,
  ) {
    const employee =
      await this.employeeRepo.findOne({
        where: {
          id,
          tenantId,
        },
        relations: {
          user: true,
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Colaborador não encontrado.',
      );
    }

    return employee;
  }

  async linkUser(
    employeeId: string,
    tenantId: string,
    userId: string,
  ) {
    const employee =
      await this.employeeRepo.findOne({
        where: {
          id: employeeId,
          tenantId,
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Colaborador não encontrado.',
      );
    }

    const user =
      await this.userRepo.findOne({
        where: {
          id: userId,
          tenantId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrado neste tenant.',
      );
    }

    const alreadyLinked =
      await this.employeeRepo.findOne({
        where: {
          userId,
          tenantId,
        },
      });

    if (
      alreadyLinked &&
      alreadyLinked.id !== employee.id
    ) {
      throw new BadRequestException(
        'Este usuário já está vinculado a outro colaborador.',
      );
    }

    employee.userId = user.id;

    const savedEmployee =
      await this.employeeRepo.save(employee);

    await this.auditService.create({
      tenantId,
      entityId: savedEmployee.id,
      action: 'USER_LINKED',
      entityType: 'Employee',
      details: user.id,
    });

    return savedEmployee;
  }

  async unlinkUser(
    employeeId: string,
    tenantId: string,
  ) {
    const employee =
      await this.employeeRepo.findOne({
        where: {
          id: employeeId,
          tenantId,
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Colaborador não encontrado.',
      );
    }

    employee.userId = null;

    const savedEmployee =
      await this.employeeRepo.save(employee);

    await this.auditService.create({
      tenantId,
      entityId: savedEmployee.id,
      action: 'USER_UNLINKED',
      entityType: 'Employee',
    });

    return savedEmployee;
  }

  async remove(
    id: string,
    tenantId: string,
  ) {
    await this.auditService.create({
      tenantId,
      entityId: id,
      action: 'EMPLOYEE_DELETED',
      entityType: 'Employee',
    });

    return this.employeeRepo.delete({
      id,
      tenantId,
    });
  }
}
====================================================
CREATE EMPLOYEE DTO
====================================================

import { IsString, IsEmail, IsNotEmpty, IsDateString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  department: string;

  @IsString()
  jobTitle: string;

  @IsDateString()
  admissionDate: string;
}

====================================================
LINK USER DTO
====================================================

import { IsUUID } from 'class-validator';

export class LinkUserDto {
  @IsUUID()
  userId: string;
}

====================================================
USER ENTITY
====================================================

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tenant } from '../tenant/tenant.entity';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  RH = 'RH',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    name: 'last_login_at',
    type: 'timestamp',
    nullable: true,
  })
  lastLoginAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

====================================================
DOCUMENT ENTITY
====================================================

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column({ default: false })
  isSigned: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

====================================================
ANÁLISE AUTOMÁTICA
====================================================

ROTAS @Get:
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:  @Get()
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:  @Get(':id')

ROTAS @Post:
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:  @Post()

ROTAS @Patch:

ROTAS @Delete:
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:  @Delete(':id/link-user')
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:  @Delete(':id')

REFERÊNCIAS A USERS:
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:import { LinkUserDto } from './dto/link-user.dto';
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:import { UserRole } from '../users/user.entity';
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:      req.user.tenantId,
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:      req.user.tenantId,
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:      req.user.tenantId,
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:  @Put(':id/link-user')
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:      req.user.tenantId,
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:      dto.userId,
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:  @Delete(':id/link-user')
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:      req.user.tenantId,
/opt/rh-saas/backend/src/modules/employees/employees.controller.ts:      req.user.tenantId,
/opt/rh-saas/backend/src/modules/employees/employee.entity.ts:import { User } from '../users/user.entity';
/opt/rh-saas/backend/src/modules/employees/employee.entity.ts:  @JoinColumn({ name: 'user_id' })
/opt/rh-saas/backend/src/modules/employees/employee.entity.ts:  user: User | null;
/opt/rh-saas/backend/src/modules/employees/employee.entity.ts:    name: 'user_id',
/opt/rh-saas/backend/src/modules/employees/employee.entity.ts:  userId: string | null;
/opt/rh-saas/backend/src/modules/employees/employees.module.ts:import { User } from '../users/user.entity';
/opt/rh-saas/backend/src/modules/employees/dto/link-user.dto.ts:  userId: string;
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:import { User } from '../users/user.entity';
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:    private readonly userRepo: Repository<User>,
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:        user: true,
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:          user: true,
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:    userId: string,
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:    const user =
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:      await this.userRepo.findOne({
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:          id: userId,
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:    if (!user) {
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:          userId,
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:    employee.userId = user.id;
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:      details: user.id,
/opt/rh-saas/backend/src/modules/employees/employees.service.ts:    employee.userId = null;

REFERÊNCIAS A DOCUMENT:
