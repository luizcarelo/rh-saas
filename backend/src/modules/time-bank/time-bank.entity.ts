import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('time_bank')
export class TimeBank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'date' })
  date: string; // Formato YYYY-MM-DD

  @Column({ name: 'expected_minutes', type: 'int' })
  expectedMinutes: number; // Jornada esperada (Ex: 480 min = 8h)

  @Column({ name: 'worked_minutes', type: 'int', default: 0 })
  workedMinutes: number; // O que ele de fato trabalhou

  @Column({ name: 'balance_minutes', type: 'int', default: 0 })
  balanceMinutes: number; // Positivo (Hora Extra) ou Negativo (Atraso)

  @Column({ default: 'OPEN' })
  status: string; // OPEN (Aberto no mês) | CLOSED (Fechado/Pago na Folha)

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
