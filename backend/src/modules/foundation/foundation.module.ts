import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoundationController } from './foundation.controller';
import { FoundationService } from './foundation.service';

import { SaasClient } from './entities/saas-client.entity';

import { HrEmployeeProfile } from './entities/hr-employee-profile.entity';
import { HrDepartment } from './entities/hr-department.entity';
import { HrJobPosition } from './entities/hr-job-position.entity';
import { HrJobFunction } from './entities/hr-job-function.entity';
import { HrWorkLocation } from './entities/hr-work-location.entity';
import { HrGeofence } from './entities/hr-geofence.entity';

import { MobileDevice } from './entities/mobile-device.entity';
import { MobileAppSettings } from './entities/mobile-app-settings.entity';
import { LocationTrackingPoint } from './entities/location-tracking-point.entity';

import { ClockEventFoundation } from './entities/clock-event-foundation.entity';
import { ClockEventType } from './entities/clock-event-type.entity';
import { ClockPolicy } from './entities/clock-policy.entity';
import { ClockPolicyEventType } from './entities/clock-policy-event-type.entity';
import { ClockJustificationFoundation } from './entities/clock-justification-foundation.entity';
import { DocumentFoundation } from './entities/document-foundation.entity';
import { DocumentRecipientFoundation } from './entities/document-recipient-foundation.entity';

import { TimeBankBalanceFoundation } from './entities/time-bank-balance-foundation.entity';
import { PayslipFoundation } from './entities/payslip-foundation.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      SaasClient,

      HrEmployeeProfile,
      HrDepartment,
      HrJobPosition,
      HrJobFunction,
      HrWorkLocation,
      HrGeofence,

      MobileDevice,
      MobileAppSettings,
      LocationTrackingPoint,

      ClockEventFoundation,
      ClockEventType,
      ClockPolicy,
      ClockPolicyEventType,
      ClockJustificationFoundation,
      DocumentFoundation,
      DocumentRecipientFoundation,
      TimeBankBalanceFoundation,
      PayslipFoundation,
    ]),
  ],
  controllers: [
    FoundationController,
  ],
  providers: [
    FoundationService,
  ],
  exports: [
    FoundationService,
  ],
})
export class FoundationModule {}
