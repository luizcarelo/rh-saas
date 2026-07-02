import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tenant } from '../tenant/tenant.entity';
import { User } from '../users/user.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @OneToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: true,
  })
  userId: string | null;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    length: 11,
  })
  cpf: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  department: string;

  @Column({
    nullable: true,
  })
  jobTitle: string;

  @Column({
    type: 'date',
  })
  admissionDate: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
