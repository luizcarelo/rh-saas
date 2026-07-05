import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { AssignScheduleDto } from './dto/assign-schedule.dto';
import { Patch } from '@nestjs/common';

@Controller('v1/schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {

  constructor(
    private readonly schedulesService: SchedulesService,
  ) {}

  @Get()
  findAll(
    @Req() req: any,
  ) {
    return this.schedulesService.findAll(
      req.user.tenantId,
    );
  }

  @Post('assign')
  assign(
    @Req() req: any,
    @Body() dto: AssignScheduleDto,
  ) {
    return this.schedulesService.assign(
      req.user.tenantId,
      dto,
    );
  }

  @Get('employee/:employeeId')
  getEmployeeSchedule(
    @Req() req: any,
    @Param('employeeId') employeeId: string,
  ) {
    return this.schedulesService.getEmployeeSchedule(
      req.user.tenantId,
      employeeId,
    );
  }
@Get('employee/:employeeId/active')
getEmployeeScheduleActive(
  @Req() req: any,
  @Param('employeeId') employeeId: string,
) {
  return this.schedulesService.getEmployeeScheduleActive(
    req.user.tenantId,
    employeeId,
  );
}

@Delete('assign/:id')
unassign(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.schedulesService.unassign(
    req.user.tenantId,
    id,
  );
}

@Patch('assign/:id/end')
endAssignment(
  @Req() req: any,
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.schedulesService.endAssignment(
    req.user.tenantId,
    id,
    body.endDate,
  );
}

  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.schedulesService.findOne(
      id,
      req.user.tenantId,
    );
  }

  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateScheduleDto,
  ) {
    return this.schedulesService.create(
      req.user.tenantId,
      dto,
    );
  }

  @Put(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(
      id,
      req.user.tenantId,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.schedulesService.remove(
      id,
      req.user.tenantId,
    );
  }
}