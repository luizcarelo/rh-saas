import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'hr_employee_profiles',
  synchronize: false,
})
export class HrEmployeeProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'client_id',
    type: 'uuid',
  })
  clientId: string;

  @Column({
    name: 'employee_external_ref',
    type: 'text',
    nullable: true,
  })
  employeeExternalRef: string;

  @Column({
    name: 'first_name',
    type: 'text',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'text',
  })
  lastName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  cpf: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  email: string;

  @Column({
    name: 'department_id',
    type: 'uuid',
    nullable: true,
  })
  departmentId: string;

  @Column({
    name: 'job_position_id',
    type: 'uuid',
    nullable: true,
  })
  jobPositionId: string;

  @Column({
    name: 'job_function_id',
    type: 'uuid',
    nullable: true,
  })
  jobFunctionId: string;

  @Column({
    name: 'admission_date',
    type: 'date',
    nullable: true,
  })
  admissionDate: string;

  @Column({
    type: 'text',
    default: 'ACTIVE',
  })
  status: string;

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
