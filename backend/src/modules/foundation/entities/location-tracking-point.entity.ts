import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'location_tracking_points',
  synchronize: false,
})
export class LocationTrackingPoint {
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
    name: 'device_id',
    type: 'uuid',
    nullable: true,
  })
  deviceId: string;

  @Column({
    name: 'tracked_at',
    type: 'timestamptz',
  })
  trackedAt: Date;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 7,
  })
  latitude: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 7,
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
    type: 'text',
    default: 'MOBILE',
  })
  source: string;

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
