import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column({ default: false })
  isSigned: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
