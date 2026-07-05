import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('v1/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('overview')
  overview(@Req() req: any) {
    return this.dashboardService.overview(
      req.user.tenantId,
    );
  }

  @Get('employees')
  employees(@Req() req: any) {
    return this.dashboardService.employees(
      req.user.tenantId,
    );
  }

  @Get('time-bank')
  timeBank(@Req() req: any) {
    return this.dashboardService.timeBank(
      req.user.tenantId,
    );
  }

  @Get('schedules')
  schedules(@Req() req: any) {
    return this.dashboardService.schedules(
      req.user.tenantId,
    );
  }

  @Get('time-records')
  timeRecords(@Req() req: any) {
    return this.dashboardService.timeRecords(
      req.user.tenantId,
    );
  }

  @Get('executive')
  executive(
    @Req() req: any,
  ) {
    return this.dashboardService.executive(
      req.user.tenantId,
    );
  }


}
