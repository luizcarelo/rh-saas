import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'clock_policies',
  synchronize: false,
})
export class ClockPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'client_id',
    type: 'uuid',
  })
  clientId: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'gps_required',
    default: false,
  })
  gpsRequired: boolean;

  @Column({
    name: 'min_accuracy_meters',
    type: 'int',
    nullable: true,
  })
  minAccuracyMeters: number;

  @Column({
    name: 'geofence_required',
    default: false,
  })
  geofenceRequired: boolean;

  @Column({
    name: 'allow_outside_geofence_with_justification',
    default: false,
  })
  allowOutsideGeofenceWithJustification: boolean;

  @Column({
    name: 'offline_allowed',
    default: true,
  })
  offlineAllowed: boolean;

  @Column({
    name: 'max_offline_hours',
    type: 'int',
    nullable: true,
  })
  maxOfflineHours: number;

  @Column({
    name: 'selfie_required',
    default: false,
  })
  selfieRequired: boolean;

  @Column({
    name: 'telemetry_enabled',
    default: false,
  })
  telemetryEnabled: boolean;

  @Column({
    name: 'telemetry_interval_minutes',
    type: 'int',
    nullable: true,
  })
  telemetryIntervalMinutes: number;

  @Column({
    name: 'is_default',
    default: false,
  })
  isDefault: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
