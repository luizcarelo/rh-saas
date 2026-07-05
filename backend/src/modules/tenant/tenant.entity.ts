import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 14 })
  cnpj: string;

  @Column({
    name: 'corporate_name',
    length: 255,
  })
  corporateName: string;

  @Column({
    name: 'trading_name',
    length: 255,
    nullable: true,
  })
  tradingName: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column({
    nullable: true,
    length: 50,
  })
  phone?: string;

  @Column({
    nullable: true,
    length: 255,
  })
  email?: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  address?: string;

  @Column({
    nullable: true,
    length: 255,
  })
  website?: string;

  @Column({
    nullable: true,
    name: 'hr_manager',
    length: 255,
  })
  hrManager?: string;

  @Column({
    nullable: true,
    name: 'logo_url',
    type: 'text',
  })
  logoUrl?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}