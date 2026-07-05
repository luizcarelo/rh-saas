import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RegisterMobileDeviceDto } from './dto/register-mobile-device.dto';
import { CreateLocationTrackingPointDto } from './dto/create-location-tracking-point.dto';
import { FoundationService } from './foundation.service';

@Controller('v1/foundation')
@UseGuards(JwtAuthGuard)
export class FoundationController {
  constructor(
    private readonly foundationService: FoundationService,
  ) {}

  @Get('overview')
  overview(@Req() req: any) {
    return this.foundationService.overview(
      req.user.tenantId,
    );
  }

  @Get('hr/employees')
  employees(@Req() req: any) {
    return this.foundationService.employees(
      req.user.tenantId,
    );
  }

  @Get('hr/departments')
  departments(@Req() req: any) {
    return this.foundationService.departments(
      req.user.tenantId,
    );
  }

  @Get('hr/job-positions')
  jobPositions(@Req() req: any) {
    return this.foundationService.jobPositions(
      req.user.tenantId,
    );
  }

  @Get('hr/job-functions')
  jobFunctions(@Req() req: any) {
    return this.foundationService.jobFunctions(
      req.user.tenantId,
    );
  }

  @Get('hr/work-locations')
  workLocations(@Req() req: any) {
    return this.foundationService.workLocations(
      req.user.tenantId,
    );
  }

  @Get('hr/geofences')
  geofences(@Req() req: any) {
    return this.foundationService.geofences(
      req.user.tenantId,
    );
  }

  @Get('mobile/devices')
  mobileDevices(@Req() req: any) {
    return this.foundationService.mobileDevices(
      req.user.tenantId,
    );
  }

  @Get('mobile/settings')
  mobileSettings(@Req() req: any) {
    return this.foundationService.mobileSettings(
      req.user.tenantId,
    );
  }

  @Get('tracking/points')
  trackingPoints(@Req() req: any) {
    return this.foundationService.trackingPoints(
      req.user.tenantId,
    );
  }

  @Get('clock/overview')
  clockOverview(@Req() req: any) {
    return this.foundationService.clockOverview(
      req.user.tenantId,
    );
  }

  @Get('clock/events')
  clockEvents(@Req() req: any) {
    return this.foundationService.clockEvents(
      req.user.tenantId,
    );
  }

  @Get('clock/event-types')
  clockEventTypes() {
    return this.foundationService.clockEventTypes();
  }

  @Get('clock/policies')
  clockPolicies(@Req() req: any) {
    return this.foundationService.clockPolicies(
      req.user.tenantId,
    );
  }

  @Get('clock/policy-event-types')
  clockPolicyEventTypes() {
    return this.foundationService.clockPolicyEventTypes();
  }

  @Get('clock/justifications')
  clockJustifications(@Req() req: any) {
    return this.foundationService.clockJustifications(
      req.user.tenantId,
    );
  }

  @Get('documents/overview')
  documentsOverview(@Req() req: any) {
    return this.foundationService.documentsOverview(
      req.user.tenantId,
    );
  }

  @Get('documents')
  documents(@Req() req: any) {
    return this.foundationService.documents(
      req.user.tenantId,
    );
  }

  @Get('documents/recipients')
  documentRecipients() {
    return this.foundationService.documentRecipients();
  }


  @Get('timebank/overview')
  timebankOverview(@Req() req: any) {
    return this.foundationService.timebankOverview(
      req.user.tenantId,
    );
  }

  @Get('timebank/balances')
  timebankBalances(@Req() req: any) {
    return this.foundationService.timebankBalances(
      req.user.tenantId,
    );
  }


  @Get('payroll/overview')
  payrollOverview(@Req() req: any) {
    return this.foundationService.payrollOverview(
      req.user.tenantId,
    );
  }

  @Get('payroll/payslips')
  payrollPayslips(@Req() req: any) {
    return this.foundationService.payrollPayslips(
      req.user.tenantId,
    );
  }


  @Post('live-tracking/device')
  registerLiveTrackingDevice(
    @Req() req: any,
    @Body() dto: RegisterMobileDeviceDto,
  ) {
    return this.foundationService.registerOrUpdateMobileDevice(
      req.user.tenantId,
      dto,
    );
  }

  @Post('live-tracking/location')
  createLiveTrackingLocation(
    @Req() req: any,
    @Body() dto: CreateLocationTrackingPointDto,
  ) {
    return this.foundationService.createLocationTrackingPoint(
      req.user.tenantId,
      dto,
    );
  }

  @Get('live-tracking/points')
  liveTrackingPoints(
    @Req() req: any,
  ) {
    return this.foundationService.liveTrackingPoints(
      req.user.tenantId,
    );
  }

  @Get('live-tracking/latest')
  latestTrackingPoints(
    @Req() req: any,
  ) {
    return this.foundationService.latestTrackingPoints(
      req.user.tenantId,
    );
  }

}
