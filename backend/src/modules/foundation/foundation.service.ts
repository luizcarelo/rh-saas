import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
import { RegisterMobileDeviceDto } from './dto/register-mobile-device.dto';
import { CreateLocationTrackingPointDto } from './dto/create-location-tracking-point.dto';
@Injectable()
export class FoundationService {
  constructor(
    @InjectRepository(SaasClient)
    private readonly clientRepo: Repository<SaasClient>,

    @InjectRepository(HrEmployeeProfile)
    private readonly employeeProfileRepo: Repository<HrEmployeeProfile>,

    @InjectRepository(HrDepartment)
    private readonly departmentRepo: Repository<HrDepartment>,

    @InjectRepository(HrJobPosition)
    private readonly jobPositionRepo: Repository<HrJobPosition>,

    @InjectRepository(HrJobFunction)
    private readonly jobFunctionRepo: Repository<HrJobFunction>,

    @InjectRepository(HrWorkLocation)
    private readonly workLocationRepo: Repository<HrWorkLocation>,

    @InjectRepository(HrGeofence)
    private readonly geofenceRepo: Repository<HrGeofence>,

    @InjectRepository(MobileDevice)
    private readonly mobileDeviceRepo: Repository<MobileDevice>,

    @InjectRepository(MobileAppSettings)
    private readonly mobileSettingsRepo: Repository<MobileAppSettings>,

    @InjectRepository(LocationTrackingPoint)
    private readonly trackingPointRepo: Repository<LocationTrackingPoint>,

    @InjectRepository(ClockEventFoundation)
    private readonly clockEventRepo: Repository<ClockEventFoundation>,

    @InjectRepository(ClockEventType)
    private readonly clockEventTypeRepo: Repository<ClockEventType>,

    @InjectRepository(ClockPolicy)
    private readonly clockPolicyRepo: Repository<ClockPolicy>,

    @InjectRepository(ClockPolicyEventType)
    private readonly clockPolicyEventTypeRepo: Repository<ClockPolicyEventType>,

    @InjectRepository(ClockJustificationFoundation)
    private readonly clockJustificationRepo: Repository<ClockJustificationFoundation>,

    @InjectRepository(DocumentFoundation)
    private readonly documentFoundationRepo: Repository<DocumentFoundation>,

    @InjectRepository(DocumentRecipientFoundation)
    private readonly documentRecipientFoundationRepo: Repository<DocumentRecipientFoundation>,

    @InjectRepository(TimeBankBalanceFoundation)
    private readonly timeBankBalanceFoundationRepo: Repository<TimeBankBalanceFoundation>,

    @InjectRepository(PayslipFoundation)
    private readonly payslipFoundationRepo: Repository<PayslipFoundation>,
  ) {}

  private async getClientIdByTenantId(
    tenantId: string,
  ): Promise<string> {
    const client =
      await this.clientRepo.findOne({
        where: { tenantId },
      });

    if (!client) {
      throw new NotFoundException(
        'Cliente SaaS não encontrado para o tenant informado.',
      );
    }

    return client.id;
  }

  async overview(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    const [
      employeeProfiles,
      departments,
      jobPositions,
      jobFunctions,
      workLocations,
      geofences,
      mobileDevices,
      mobileSettings,
      trackingPoints,
      clockEvents,
      clockEventTypes,
      clockPolicies,
      clockPolicyEventTypes,
      clockJustifications,
    ] = await Promise.all([
      this.employeeProfileRepo.count({
        where: { clientId },
      }),
      this.departmentRepo.count({
        where: { clientId },
      }),
      this.jobPositionRepo.count({
        where: { clientId },
      }),
      this.jobFunctionRepo.count({
        where: { clientId },
      }),
      this.workLocationRepo.count({
        where: { clientId },
      }),
      this.geofenceRepo.count({
        where: { clientId },
      }),
      this.mobileDeviceRepo.count({
        where: { clientId },
      }),
      this.mobileSettingsRepo.count({
        where: { clientId },
      }),
      this.trackingPointRepo.count({
        where: { clientId },
      }),
      this.clockEventRepo.count({
        where: { clientId },
      }),
      this.clockEventTypeRepo.count(),
      this.clockPolicyRepo.count({
        where: { clientId },
      }),
      this.clockPolicyEventTypeRepo.count(),
      this.clockJustificationRepo.count({
        where: { clientId },
      }),
    ]);

    return {
      clientId,
      employeeProfiles,
      departments,
      jobPositions,
      jobFunctions,
      workLocations,
      geofences,
      mobileDevices,
      mobileSettings,
      trackingPoints,
      clockEvents,
      clockEventTypes,
      clockPolicies,
      clockPolicyEventTypes,
      clockJustifications,
    };
  }

  async employees(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.employeeProfileRepo.find({
      where: { clientId },
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  async departments(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.departmentRepo.find({
      where: { clientId },
      order: { name: 'ASC' },
    });
  }

  async jobPositions(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.jobPositionRepo.find({
      where: { clientId },
      order: { name: 'ASC' },
    });
  }

  async jobFunctions(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.jobFunctionRepo.find({
      where: { clientId },
      order: { name: 'ASC' },
    });
  }

  async workLocations(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.workLocationRepo.find({
      where: { clientId },
      order: { name: 'ASC' },
    });
  }

  async geofences(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.geofenceRepo.find({
      where: { clientId },
      order: { name: 'ASC' },
    });
  }

  async mobileDevices(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.mobileDeviceRepo.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  async mobileSettings(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.mobileSettingsRepo.findOne({
      where: { clientId },
    });
  }

  async trackingPoints(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.trackingPointRepo.find({
      where: { clientId },
      order: { trackedAt: 'DESC' },
      take: 200,
    });
  }

  async clockOverview(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    const [
      events,
      eventTypes,
      policies,
      policyEventTypes,
      justifications,
    ] = await Promise.all([
      this.clockEventRepo.count({
        where: { clientId },
      }),
      this.clockEventTypeRepo.count(),
      this.clockPolicyRepo.count({
        where: { clientId },
      }),
      this.clockPolicyEventTypeRepo.count(),
      this.clockJustificationRepo.count({
        where: { clientId },
      }),
    ]);

    return {
      clientId,
      events,
      eventTypes,
      policies,
      policyEventTypes,
      justifications,
    };
  }

  async clockEvents(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.clockEventRepo.find({
      where: { clientId },
      order: { eventDatetime: 'DESC' },
      take: 200,
    });
  }

  async clockEventTypes() {
    return this.clockEventTypeRepo.find({
      order: { defaultOrder: 'ASC' },
    });
  }

  async clockPolicies(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.clockPolicyRepo.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  async clockPolicyEventTypes() {
    return this.clockPolicyEventTypeRepo.find({
      order: { displayOrder: 'ASC' },
    });
  }

  async clockJustifications(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.clockJustificationRepo.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
      take: 200,
    });
  }

  async documentsOverview(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    const [
      documents,
      recipients,
    ] = await Promise.all([
      this.documentFoundationRepo.count({
        where: { clientId },
      }),
      this.documentRecipientFoundationRepo.count(),
    ]);

    return {
      clientId,
      documents,
      recipients,
    };
  }

  async documents(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.documentFoundationRepo.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
      take: 200,
    });
  }

  async documentRecipients() {
    return this.documentRecipientFoundationRepo.find({
      order: { createdAt: 'DESC' },
      take: 200,
    });
  }


  async timebankOverview(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    const balances =
      await this.timeBankBalanceFoundationRepo.count({
        where: { clientId },
      });

    return {
      clientId,
      balances,
    };
  }

  async timebankBalances(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.timeBankBalanceFoundationRepo.find({
      where: { clientId },
      order: { referenceDate: 'DESC' },
      take: 200,
    });
  }


  async payrollOverview(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    const payslips =
      await this.payslipFoundationRepo.count({
        where: { clientId },
      });

    return {
      clientId,
      payslips,
    };
  }

  async payrollPayslips(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.payslipFoundationRepo.find({
      where: { clientId },
      order: {
        referenceYear: 'DESC',
        referenceMonth: 'DESC',
        createdAt: 'DESC',
      },
      take: 200,
    });
  }


  async registerOrUpdateMobileDevice(
    tenantId: string,
    dto: RegisterMobileDeviceDto,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    let employeeProfileId = dto.employeeProfileId;

    if (employeeProfileId) {
      const employee =
        await this.employeeProfileRepo.findOne({
          where: {
            id: employeeProfileId,
            clientId,
          },
        });

      if (!employee) {
        throw new NotFoundException(
          'Perfil de colaborador não encontrado para este cliente.',
        );
      }
    }

    let device =
      await this.mobileDeviceRepo.findOne({
        where: {
          clientId,
          deviceUid: dto.deviceUid,
        },
      });

    if (!device) {
      device =
        this.mobileDeviceRepo.create({
          clientId,
          employeeProfileId,
          deviceUid: dto.deviceUid,
          platform: dto.platform,
          model: dto.model,
          appVersion: dto.appVersion,
          isActive: true,
          lastSeenAt: new Date(),
        });
    } else {
      device.employeeProfileId =
        employeeProfileId ?? device.employeeProfileId;
      device.platform = dto.platform ?? device.platform;
      device.model = dto.model ?? device.model;
      device.appVersion = dto.appVersion ?? device.appVersion;
      device.isActive = true;
      device.lastSeenAt = new Date();
    }

    return this.mobileDeviceRepo.save(device);
  }

  async createLocationTrackingPoint(
    tenantId: string,
    dto: CreateLocationTrackingPointDto,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    const employee =
      await this.employeeProfileRepo.findOne({
        where: {
          id: dto.employeeProfileId,
          clientId,
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Perfil de colaborador não encontrado para este cliente.',
      );
    }

    if (dto.deviceId) {
      const device =
        await this.mobileDeviceRepo.findOne({
          where: {
            id: dto.deviceId,
            clientId,
          },
        });

      if (!device) {
        throw new NotFoundException(
          'Dispositivo móvel não encontrado para este cliente.',
        );
      }
    }

    const point =
      this.trackingPointRepo.create({
        clientId,
        employeeProfileId: dto.employeeProfileId,
        deviceId: dto.deviceId,
        trackedAt: dto.trackedAt
          ? new Date(dto.trackedAt)
          : new Date(),
        latitude: String(dto.latitude),
        longitude: String(dto.longitude),
        accuracyMeters:
          dto.accuracyMeters === undefined
            ? undefined
            : String(dto.accuracyMeters),
        address: dto.address,
        source: dto.source ?? 'MOBILE',
        metadata: dto.metadata ?? {},
      });

    return this.trackingPointRepo.save(point);
  }

  async liveTrackingPoints(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.trackingPointRepo.find({
      where: { clientId },
      order: { trackedAt: 'DESC' },
      take: 200,
    });
  }

  async latestTrackingPoints(
    tenantId: string,
  ) {
    const clientId =
      await this.getClientIdByTenantId(
        tenantId,
      );

    return this.trackingPointRepo
      .createQueryBuilder('point')
      .where('point.client_id = :clientId', { clientId })
      .orderBy('point.employee_profile_id', 'ASC')
      .addOrderBy('point.tracked_at', 'DESC')
      .distinctOn(['point.employee_profile_id'])
      .getMany();
  }

}
