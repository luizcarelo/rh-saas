import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'hr_job_functions',
  synchronize: false,
})
export class HrJobFunction {
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
    name: 'allows_external_visit',
    default: false,
  })
  allowsExternalVisit: boolean;

  @Column({
    name: 'allows_travel',
    default: false,
  })
  allowsTravel: boolean;

  @Column({
    name: 'allows_overtime',
    default: false,
  })
  allowsOvertime: boolean;

  @Column({
    name: 'allows_on_call',
    default: false,
  })
  allowsOnCall: boolean;

  @Column({
    name: 'allows_shift_duty',
    default: false,
  })
  allowsShiftDuty: boolean;

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
