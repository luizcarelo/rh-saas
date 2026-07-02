import { Controller, Get, Post, Body, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/employees')
@UseGuards(JwtAuthGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createDto: CreateEmployeeDto, @Req() req: any) {
    return this.employeesService.create(req.user.tenantId, createDto);
  }

  @Get()
  async findAll(@Req() req: any) {
    return this.employeesService.findAll(req.user.tenantId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.employeesService.remove(id, req.user.tenantId);
  }
}
