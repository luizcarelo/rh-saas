import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'mobile_devices',
  synchronize: false,
})
export class MobileDevice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'client_id',
    type: 'uuid',
    nullable: true,
  })
  clientId: string;

  @Column({
    name: 'employee_profile_id',
    type: 'uuid',
    nullable: true,
  })
  employeeProfileId: string;

  @Column({
    name: 'device_uid',
    type: 'text',
  })
  deviceUid: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  platform: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  model: string;

  @Column({
    name: 'app_version',
    type: 'text',
    nullable: true,
  })
  appVersion: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'last_seen_at',
    type: 'timestamptz',
    nullable: true,
  })
  lastSeenAt: Date;

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
