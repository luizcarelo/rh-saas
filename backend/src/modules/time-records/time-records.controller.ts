import { Controller, Post, Get, Body, Req, Res, UseGuards } from '@nestjs/common';
import { TimeRecordsService } from './time-records.service';
import { TimeCalculatorService } from './time-calculator.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/time-records')
@UseGuards(JwtAuthGuard)
export class TimeRecordsController {
  constructor(
    private readonly timeRecordsService: TimeRecordsService,
    private readonly calculator: TimeCalculatorService
  ) {}

  @Post('clock-in')
  async clockIn(@Body() body: any, @Req() req: any) {
    return this.timeRecordsService.clockIn(req.user.tenantId, body.employeeId, body.latitude, body.longitude);
  }

  @Get('afd')
  async downloadAfd(@Req() req: any, @Res() res: any) {
    const afdData = await this.timeRecordsService.generateAfd(req.user.tenantId);
    res.setHeader("Content-disposition", "attachment; filename=AFD_MTE.txt");
    res.setHeader("Content-type", "text/plain");
    res.send(afdData);
  }

  @Post('simulate-math')
  simulateMath(@Body() body: any) {
    const baseDate = "2026-07-01T";
    const records: any[] = [];
    
    if (body.in1) records.push({ timestamp: new Date(`${baseDate}${body.in1}:00Z`) });
    if (body.out1) records.push({ timestamp: new Date(`${baseDate}${body.out1}:00Z`) });
    if (body.in2) records.push({ timestamp: new Date(`${baseDate}${body.in2}:00Z`) });
    if (body.out2) records.push({ timestamp: new Date(`${baseDate}${body.out2}:00Z`) });

    return this.calculator.calculateDailyBalance(records, body.expectedMinutes);
  }
}
