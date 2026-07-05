import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'document_recipients_foundation',
  synchronize: false,
})
export class DocumentRecipientFoundation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'document_id',
    type: 'uuid',
  })
  documentId: string;

  @Column({
    name: 'employee_profile_id',
    type: 'uuid',
    nullable: true,
  })
  employeeProfileId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  status: string;

  @Column({
    name: 'viewed_at',
    type: 'timestamptz',
    nullable: true,
  })
  viewedAt: Date;

  @Column({
    name: 'signed_at',
    type: 'timestamptz',
    nullable: true,
  })
  signedAt: Date;

  @Column({
    type: 'jsonb',
    default: () => "'{}'::jsonb",
  })
  evidence: any;

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
