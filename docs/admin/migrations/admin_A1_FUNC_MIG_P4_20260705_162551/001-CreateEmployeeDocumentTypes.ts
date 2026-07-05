import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableUnique,
} from 'typeorm';

export class CreateEmployeeDocumentTypes001 implements MigrationInterface {
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
    );

    await queryRunner.createTable(
      new Table({
        name: 'employee_document_types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tenant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'is_required',
            type: 'boolean',
            default: false,
          },
          {
            name: 'requires_expiration',
            type: 'boolean',
            default: false,
          },
          {
            name: 'default_validity_months',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'allow_multiple_versions',
            type: 'boolean',
            default: true,
          },
          {
            name: 'requires_approval',
            type: 'boolean',
            default: false,
          },
          {
            name: 'employee_can_upload',
            type: 'boolean',
            default: false,
          },
          {
            name: 'mobile_visible',
            type: 'boolean',
            default: true,
          },
          {
            name: 'blocks_admission',
            type: 'boolean',
            default: false,
          },
          {
            name: 'blocks_app_access',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_sensitive',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'employee_document_types',
      new TableUnique({
        name: 'UK_DOCUMENT_TYPE_CODE',
        columnNames: ['tenant_id', 'code'],
      }),
    );

    await queryRunner.createIndex(
      'employee_document_types',
      new TableIndex({
        name: 'IDX_DOCUMENT_TYPE_TENANT',
        columnNames: ['tenant_id'],
      }),
    );

    await queryRunner.createIndex(
      'employee_document_types',
      new TableIndex({
        name: 'IDX_DOCUMENT_TYPE_ACTIVE',
        columnNames: ['is_active'],
      }),
    );

    await queryRunner.createIndex(
      'employee_document_types',
      new TableIndex({
        name: 'IDX_DOCUMENT_TYPE_DELETED_AT',
        columnNames: ['deleted_at'],
      }),
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.dropIndex(
      'employee_document_types',
      'IDX_DOCUMENT_TYPE_DELETED_AT',
    );

    await queryRunner.dropIndex(
      'employee_document_types',
      'IDX_DOCUMENT_TYPE_ACTIVE',
    );

    await queryRunner.dropIndex(
      'employee_document_types',
      'IDX_DOCUMENT_TYPE_TENANT',
    );

    await queryRunner.dropUniqueConstraint(
      'employee_document_types',
      'UK_DOCUMENT_TYPE_CODE',
    );

    await queryRunner.dropTable(
      'employee_document_types',
    );
  }
}
