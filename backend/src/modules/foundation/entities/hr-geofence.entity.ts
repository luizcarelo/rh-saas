import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'hr_geofences',
  synchronize: false,
})
export class HrGeofence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'client_id',
    type: 'uuid',
  })
  clientId: string;

  @Column({
    name: 'work_location_id',
    type: 'uuid',
    nullable: true,
  })
  workLocationId: string;

  @Column({
    type: 'text',
  })
  name: string;

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
    name: 'radius_meters',
    type: 'int',
    default: 100,
  })
  radiusMeters: number;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

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
