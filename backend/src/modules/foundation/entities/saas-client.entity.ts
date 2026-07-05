import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'saas_clients',
  synchronize: false,
})
export class SaasClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'tenant_id',
    type: 'uuid',
    nullable: true,
  })
  tenantId: string;

  @Column({
    name: 'plan_id',
    type: 'uuid',
    nullable: true,
  })
  planId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  slug: string;

  @Column({
    name: 'trade_name',
    type: 'text',
    nullable: true,
  })
  tradeName: string;

  @Column({
    name: 'legal_name',
    type: 'text',
    nullable: true,
  })
  legalName: string;

  @Column({
    name: 'document_number',
    type: 'text',
    nullable: true,
  })
  documentNumber: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  status: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  timezone: string;

  @Column({
    name: 'default_locale',
    type: 'text',
    nullable: true,
  })
  defaultLocale: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

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
