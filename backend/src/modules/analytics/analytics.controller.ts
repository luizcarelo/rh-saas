import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Get('overview')
  async getOverview(@Req() req: any, @Query('start') start: string, @Query('end') end: string) {
    return this.service.getDashboardStats(req.user.tenantId, start, end);
  }
}
