import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'mobile_app_settings',
  synchronize: false,
})
export class MobileAppSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'client_id',
    type: 'uuid',
  })
  clientId: string;

  @Column({
    name: 'min_supported_version',
    type: 'text',
    nullable: true,
  })
  minSupportedVersion: string;

  @Column({
    name: 'force_update',
    default: false,
  })
  forceUpdate: boolean;

  @Column({
    name: 'allow_offline',
    default: true,
  })
  allowOffline: boolean;

  @Column({
    name: 'show_address_before_clock',
    default: true,
  })
  showAddressBeforeClock: boolean;

  @Column({
    name: 'show_pending_sync_count',
    default: true,
  })
  showPendingSyncCount: boolean;

  @Column({
    name: 'privacy_notice_required',
    default: true,
  })
  privacyNoticeRequired: boolean;

  @Column({
    type: 'jsonb',
    default: () => "'{}'::jsonb",
  })
  settings: any;

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
