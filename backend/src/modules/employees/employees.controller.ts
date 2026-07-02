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
