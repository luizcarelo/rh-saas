import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'clock_events_foundation',
  synchronize: false,
})
export class ClockEventFoundation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'client_id',
    type: 'uuid',
  })
  clientId: string;

  @Column({
    name: 'employee_profile_id',
    type: 'uuid',
    nullable: true,
  })
  employeeProfileId: string;

  @Column({
    name: 'event_type_id',
    type: 'uuid',
    nullable: true,
  })
  eventTypeId: string;

  @Column({
    name: 'local_event_id',
    type: 'text',
    nullable: true,
  })
  localEventId: string;

  @Column({
    name: 'event_datetime',
    type: 'timestamptz',
  })
  eventDatetime: Date;

  @Column({
    name: 'server_received_at',
    type: 'timestamptz',
  })
  serverReceivedAt: Date;

  @Column({
    type: 'text',
    default: 'MOBILE',
  })
  source: string;

  @Column({
    name: 'sync_status',
    type: 'text',
    default: 'SYNCED',
  })
  syncStatus: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  latitude: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  longitude: string;

  @Column({
    name: 'accuracy_meters',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  accuracyMeters: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'inside_geofence',
    nullable: true,
  })
  insideGeofence: boolean;

  @Column({
    name: 'selfie_required',
    default: false,
  })
  selfieRequired: boolean;

  @Column({
    name: 'selfie_file_id',
    type: 'uuid',
    nullable: true,
  })
  selfieFileId: string;

  @Column({
    name: 'local_hash',
    type: 'text',
    nullable: true,
  })
  localHash: string;

  @Column({
    name: 'server_hash',
    type: 'text',
    nullable: true,
  })
  serverHash: string;

  @Column({
    type: 'bigint',
  })
  nsr: string;

  @Column({
    type: 'jsonb',
    default: () => "'{}'::jsonb",
  })
  metadata: any;

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
