import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'clock_policy_event_types',
  synchronize: false,
})
export class ClockPolicyEventType {
  @PrimaryColumn({
    name: 'policy_id',
    type: 'uuid',
  })
  policyId: string;

  @PrimaryColumn({
    name: 'event_type_id',
    type: 'uuid',
  })
  eventTypeId: string;

  @Column({
    default: true,
  })
  enabled: boolean;

  @Column({
    name: 'requires_selfie',
    default: false,
  })
  requiresSelfie: boolean;

  @Column({
    name: 'requires_geofence',
    default: false,
  })
  requiresGeofence: boolean;

  @Column({
    name: 'requires_justification',
    default: false,
  })
  requiresJustification: boolean;

  @Column({
    name: 'display_order',
    type: 'int',
    nullable: true,
  })
  displayOrder: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
