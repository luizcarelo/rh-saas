import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'clock_event_types',
  synchronize: false,
})
export class ClockEventType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  code: string;

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
    name: 'pair_code',
    type: 'text',
    nullable: true,
  })
  pairCode: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  category: string;

  @Column({
    name: 'default_order',
    type: 'int',
    nullable: true,
  })
  defaultOrder: number;

  @Column({
    name: 'active_by_default',
    default: true,
  })
  activeByDefault: boolean;

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
