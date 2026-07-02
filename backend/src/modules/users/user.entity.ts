import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ unique: true })
  email: string;

  // A senha já virá em Hash (Bcrypt) do banco de dados
  @Column()
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;
}
