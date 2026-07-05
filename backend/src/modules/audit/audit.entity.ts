import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('audit_events')
export class AuditEvent {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'tenant_id',
    nullable: true,
  })
  tenantId: string;

  @Column({
    name: 'user_id',
    nullable: true,
  })
  userId: string;

  @Column()
  action: string;

  @Column({
    name: 'entity_type',
    nullable: true,
  })
  entityType: string;

  @Column({
    name: 'entity_id',
    nullable: true,
  })
  entityId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  details: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
