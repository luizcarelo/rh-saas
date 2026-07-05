import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'documents_foundation',
  synchronize: false,
})
export class DocumentFoundation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'client_id',
    type: 'uuid',
  })
  clientId: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    name: 'document_type',
    type: 'text',
    nullable: true,
  })
  documentType: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  status: string;

  @Column({
    name: 'requires_signature',
    default: false,
  })
  requiresSignature: boolean;

  @Column({
    name: 'requires_selfie',
    default: false,
  })
  requiresSelfie: boolean;

  @Column({
    name: 'requires_location',
    default: false,
  })
  requiresLocation: boolean;

  @Column({
    name: 'file_path',
    type: 'text',
    nullable: true,
  })
  filePath: string;

  @Column({
    name: 'hash_sha256',
    type: 'text',
    nullable: true,
  })
  hashSha256: string;

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
