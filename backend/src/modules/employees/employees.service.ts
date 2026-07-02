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
  ) {}

  async create(tenantId: string, data: CreateEmployeeDto) {
    const employee = this.employeeRepo.create({
      ...data,
      tenantId,
    });

    return this.employeeRepo.save(employee);
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

  async findOne(id: string, tenantId: string) {
    const employee = await this.employeeRepo.findOne({
      where: {
        id,
        tenantId,
      },
      relations: {
        user: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    return employee;
  }

  async linkUser(
    employeeId: string,
    tenantId: string,
    userId: string,
  ) {
    const employee = await this.employeeRepo.findOne({
      where: {
        id: employeeId,
        tenantId,
      },
    });

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        tenantId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado neste tenant.');
    }

    const alreadyLinked = await this.employeeRepo.findOne({
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

    return this.employeeRepo.save(employee);
  }

  async unlinkUser(
    employeeId: string,
    tenantId: string,
  ) {
    const employee = await this.employeeRepo.findOne({
      where: {
        id: employeeId,
        tenantId,
      },
    });

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    employee.userId = null;

    return this.employeeRepo.save(employee);
  }

  async remove(id: string, tenantId: string) {
    return this.employeeRepo.delete({
      id,
      tenantId,
    });
  }
}
