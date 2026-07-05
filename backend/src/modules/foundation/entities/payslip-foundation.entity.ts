import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'payslips_foundation',
  synchronize: false,
})
export class PayslipFoundation {
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
    name: 'reference_month',
    type: 'int',
  })
  referenceMonth: number;

  @Column({
    name: 'reference_year',
    type: 'int',
  })
  referenceYear: number;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    name: 'file_path',
    type: 'text',
    nullable: true,
  })
  filePath: string;

  @Column({
    name: 'hash_sha256',
    type: 'text',
    nullable: true,
  })
  hashSha256: string;

  @Column({
    name: 'acknowledged_at',
    type: 'timestamptz',
    nullable: true,
  })
  acknowledgedAt: Date;

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
