import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TimeBankService } from './time-bank.service';

@Controller('v1/time-bank')
@UseGuards(JwtAuthGuard)
export class TimeBankController {

  constructor(
    private readonly timeBankService: TimeBankService,
  ) {}

  @Get()
  findAll(
    @Req() req: any,
  ) {
    return this.timeBankService.findAll(
      req.user.tenantId,
    );
  }

  @Get(':employeeId')
  findByEmployee(
    @Req() req: any,
    @Param('employeeId') employeeId: string,
  ) {
    return this.timeBankService.findByEmployee(
      req.user.tenantId,
      employeeId,
    );
  }

  @Get(':employeeId/details')
  details(
    @Req() req: any,
    @Param('employeeId') employeeId: string,
  ) {
    return this.timeBankService.details(
      req.user.tenantId,
      employeeId,
    );
  }

  @Post('recalculate')
  recalculate(
    @Req() req: any,
    @Body() body: any,
  ) {
    return this.timeBankService.processDailyBalance(
      req.user.tenantId,
      body.employeeId,
      body.date,
      body.expectedMinutes,
    );
  }
}
