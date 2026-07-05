import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'hr_work_locations',
  synchronize: false,
})
export class HrWorkLocation {
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
    name: 'address_line',
    type: 'text',
    nullable: true,
  })
  addressLine: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  city: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  state: string;

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
