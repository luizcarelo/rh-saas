import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'time_bank_balances_foundation',
  synchronize: false,
})
export class TimeBankBalanceFoundation {
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
    name: 'reference_date',
    type: 'date',
  })
  referenceDate: string;

  @Column({
    name: 'balance_minutes',
    type: 'int',
    default: 0,
  })
  balanceMinutes: number;

  @Column({
    name: 'credit_minutes',
    type: 'int',
    default: 0,
  })
  creditMinutes: number;

  @Column({
    name: 'debit_minutes',
    type: 'int',
    default: 0,
  })
  debitMinutes: number;

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
