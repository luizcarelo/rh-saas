import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';

@Controller('v1/reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get('employees')
  employees(@Req() req: any) {
    return this.reportsService.employees(
      req.user.tenantId,
    );
  }

  @Get('schedules')
  schedules(@Req() req: any) {
    return this.reportsService.schedules(
      req.user.tenantId,
    );
  }

  @Get('time-bank')
  timeBank(@Req() req: any) {
    return this.reportsService.timeBank(
      req.user.tenantId,
    );
  }

  @Get('afd')
  afd(@Req() req: any) {
    return this.reportsService.afd(
      req.user.tenantId,
    );
  }

  @Get('executive')
  executive(@Req() req: any) {
    return this.reportsService.executive(
      req.user.tenantId,
    );
  }

  @Get('productivity')
  productivity(@Req() req: any) {
    return this.reportsService.productivity(
      req.user.tenantId,
    );
  }

  @Get('time-bank-summary')
  timeBankSummary(@Req() req: any) {
    return this.reportsService.timeBankSummary(
      req.user.tenantId,
    );
  }

  @Get('schedule-distribution')
  scheduleDistribution(@Req() req: any) {
    return this.reportsService.scheduleDistribution(
      req.user.tenantId,
    );
  }
}