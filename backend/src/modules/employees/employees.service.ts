import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  async create(tenantId: string, data: CreateEmployeeDto) {
    const employee = this.employeeRepo.create({ ...data, tenantId });
    return this.employeeRepo.save(employee);
  }

  async findAll(tenantId: string) {
    return this.employeeRepo.find({ where: { tenantId } });
  }

  async remove(id: string, tenantId: string) {
    return this.employeeRepo.delete({ id, tenantId });
  }
}
