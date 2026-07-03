import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string; // Quem executou

  @Column()
  action: string; // POST, PUT, DELETE

  @Column()
  resource: string; // Qual endpoint (ex: /v1/time-records/clock-in)

  @Column({ type: 'jsonb', nullable: true })
  payload: any; // O que foi alterado

  @Column()
  ipAddress: string; // Origem

  @Index()
  @CreateDateColumn()
  timestamp: Date;
}
