import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('employee_schedules')
export class EmployeeSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @Column({ name: 'schedule_id' })
  scheduleId: string;

  // Data em que o funcionário começou nesta escala (Crucial para o cálculo do 12x36)
  @Column({ name: 'start_date', type: 'date' })
  startDate: string; 

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: string;
}
