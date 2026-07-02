import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ScheduleType {
  FIXED = 'FIXED',
  SHIFT_12X36 = 'SHIFT_12X36'
}

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ScheduleType, default: ScheduleType.FIXED })
  type: ScheduleType;

  @Column({ type: 'jsonb', nullable: true })
  workDays: number[];

  @Column({ name: 'expected_minutes_per_day', type: 'int', default: 480 })
  expectedMinutesPerDay: number;

  @Column({ name: 'daily_tolerance_minutes', type: 'int', default: 10 })
  dailyToleranceMinutes: number;

  @Column({ nullable: true })
  entry1: string;

  @Column({ nullable: true })
  exit1: string;

  @Column({ nullable: true })
  entry2: string;

  @Column({ nullable: true })
  exit2: string;

  @Column({ name: 'expected_minutes', type: 'int', default: 480 })
  expectedMinutes: number;
}
