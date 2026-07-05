import { Controller, Post, Get, Body, Req, Res, UseGuards, BadRequestException } from '@nestjs/common';

import { TimeRecordsService } from './time-records.service';
import { TimeCalculatorService } from './time-calculator.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/time-records')
@UseGuards(JwtAuthGuard)
export class TimeRecordsController {

  private resolvePrimaryPunchType(punchType: unknown) {
    if (punchType === undefined || punchType === null || punchType === '') {
      return null;
    }

    const normalizedPunchType = String(punchType).trim().toUpperCase();

    const supportedPunchTypes = [
      'ENTRADA',
      'INICIO_INTERVALO',
      'FIM_INTERVALO',
      'SAIDA',
    ] as const;

    if (!supportedPunchTypes.includes(normalizedPunchType as typeof supportedPunchTypes[number])) {
      throw new BadRequestException({
        message: 'Tipo de batida inválido ou ainda não suportado neste endpoint.',
        supportedPunchTypes,
        receivedPunchType: normalizedPunchType,
      });
    }

    return normalizedPunchType as typeof supportedPunchTypes[number];
  }


  constructor(
    private readonly timeRecordsService: TimeRecordsService,
    private readonly calculator: TimeCalculatorService,
  ) {}

  @Post('clock-in')
  async clockIn(
    @Body() body: any,
    @Req() req: any,
  ) {
    const punchType = this.resolvePrimaryPunchType(
      (body as { punchType?: unknown }).punchType,
    );

    // B3_E1_B1_PUNCHTYPE_DISPATCH
    if (!punchType || punchType === 'ENTRADA') {
      return this.timeRecordsService.clockIn(req.user.tenantId,
      body.employeeId,
      body.latitude,
      body.longitude,);
    }

    if (punchType === 'INICIO_INTERVALO') {
      return this.timeRecordsService.breakStart(req.user.tenantId,
      body.employeeId,
      body.latitude,
      body.longitude,);
    }

    if (punchType === 'FIM_INTERVALO') {
      return this.timeRecordsService.breakEnd(req.user.tenantId,
      body.employeeId,
      body.latitude,
      body.longitude,);
    }

    return this.timeRecordsService.clockOut(req.user.tenantId,
      body.employeeId,
      body.latitude,
      body.longitude,);
  }

  @Post('break-start')
  async breakStart(
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.timeRecordsService.breakStart(
      req.user.tenantId,
      body.employeeId,
      body.latitude,
      body.longitude,
    );
  }

  @Post('break-end')
  async breakEnd(
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.timeRecordsService.breakEnd(
      req.user.tenantId,
      body.employeeId,
      body.latitude,
      body.longitude,
    );
  }

  @Post('clock-out')
  async clockOut(
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.timeRecordsService.clockOut(
      req.user.tenantId,
      body.employeeId,
      body.latitude,
      body.longitude,
    );
  }

  @Get('afd')
  async downloadAfd(
    @Req() req: any,
    @Res() res: any,
  ) {
    const afdData =
      await this.timeRecordsService.generateAfd(
        req.user.tenantId,
      );

    res.setHeader(
      'Content-disposition',
      'attachment; filename=AFD_MTE.txt',
    );

    res.setHeader(
      'Content-type',
      'text/plain',
    );

    res.send(afdData);
  }

  @Post('simulate-math')
  simulateMath(
    @Body() body: any,
  ) {
    const baseDate = '2026-07-01T';

    const records: any[] = [];

    if (body.in1)
      records.push({
        timestamp: new Date(
          `${baseDate}${body.in1}:00Z`,
        ),
      });

    if (body.out1)
      records.push({
        timestamp: new Date(
          `${baseDate}${body.out1}:00Z`,
        ),
      });

    if (body.in2)
      records.push({
        timestamp: new Date(
          `${baseDate}${body.in2}:00Z`,
        ),
      });

    if (body.out2)
      records.push({
        timestamp: new Date(
          `${baseDate}${body.out2}:00Z`,
        ),
      });

    return this.calculator.calculateDailyBalance(
      records,
      body.expectedMinutes,
    );
  }
}