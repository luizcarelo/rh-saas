import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'clock_justifications_foundation',
  synchronize: false,
})
export class ClockJustificationFoundation {
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
    name: 'clock_event_id',
    type: 'uuid',
    nullable: true,
  })
  clockEventId: string;

  @Column({
    name: 'justification_type',
    type: 'text',
  })
  justificationType: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  status: string;

  @Column({
    name: 'attachment_path',
    type: 'text',
    nullable: true,
  })
  attachmentPath: string;

  @Column({
    name: 'reviewed_by',
    type: 'text',
    nullable: true,
  })
  reviewedBy: string;

  @Column({
    name: 'reviewed_at',
    type: 'timestamptz',
    nullable: true,
  })
  reviewedAt: Date;

  @Column({
    name: 'review_notes',
    type: 'text',
    nullable: true,
  })
  reviewNotes: string;

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
