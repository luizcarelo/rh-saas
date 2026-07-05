import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class UpgradeDocuments002 implements MigrationInterface {
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE documents ' +
      'ALTER COLUMN tenant_id TYPE uuid ' +
      'USING NULLIF(tenant_id, \'\')::uuid',
    );

    await queryRunner.query(
      'ALTER TABLE documents ' +
      'ALTER COLUMN employee_id TYPE uuid ' +
      'USING NULLIF(employee_id, \'\')::uuid',
    );

    await queryRunner.addColumns(
      'documents',
      [
        new TableColumn({
          name: 'document_type_id',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'document_number',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
        new TableColumn({
          name: 'mime_type',
          type: 'varchar',
          length: '200',
          isNullable: true,
        }),
        new TableColumn({
          name: 'file_size',
          type: 'bigint',
          isNullable: true,
        }),
        new TableColumn({
          name: 'issue_date',
          type: 'date',
          isNullable: true,
        }),
        new TableColumn({
          name: 'expiration_date',
          type: 'date',
          isNullable: true,
        }),
        new TableColumn({
          name: 'status',
          type: 'varchar',
          length: '30',
          isNullable: false,
          default: "'UPLOADED'",
        }),
        new TableColumn({
          name: 'version',
          type: 'integer',
          isNullable: false,
          default: 1,
        }),
        new TableColumn({
          name: 'uploaded_by',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'approved_by',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'approved_at',
          type: 'timestamp',
          isNullable: true,
        }),
        new TableColumn({
          name: 'rejected_by',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'rejected_at',
          type: 'timestamp',
          isNullable: true,
        }),
        new TableColumn({
          name: 'rejection_reason',
          type: 'text',
          isNullable: true,
        }),
        new TableColumn({
          name: 'replaced_by_document_id',
          type: 'uuid',
          isNullable: true,
        }),
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        }),
        new TableColumn({
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
        }),
      ],
    );

    await queryRunner.query(
      'ALTER TABLE documents ' +
      'ADD CONSTRAINT CHK_DOCUMENT_STATUS ' +
      'CHECK (status IN (' +
      '\'PENDING\', ' +
      '\'UPLOADED\', ' +
      '\'UNDER_REVIEW\', ' +
      '\'APPROVED\', ' +
      '\'REJECTED\', ' +
      '\'EXPIRED\', ' +
      '\'REPLACED\', ' +
      '\'CANCELED\'' +
      '))',
    );

    await queryRunner.createForeignKey(
      'documents',
      new TableForeignKey({
        name: 'FK_DOCUMENT_EMPLOYEE',
        columnNames: ['employee_id'],
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'documents',
      new TableForeignKey({
        name: 'FK_DOCUMENT_TYPE',
        columnNames: ['document_type_id'],
        referencedTableName: 'employee_document_types',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'documents',
      new TableForeignKey({
        name: 'FK_DOCUMENT_REPLACED_BY',
        columnNames: ['replaced_by_document_id'],
        referencedTableName: 'documents',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'IDX_DOCUMENT_TENANT',
        columnNames: ['tenant_id'],
      }),
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'IDX_DOCUMENT_EMPLOYEE',
        columnNames: ['employee_id'],
      }),
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'IDX_DOCUMENT_TYPE',
        columnNames: ['document_type_id'],
      }),
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'IDX_DOCUMENT_STATUS',
        columnNames: ['status'],
      }),
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'IDX_DOCUMENT_EXPIRATION',
        columnNames: ['expiration_date'],
      }),
    );

    await queryRunner.createIndex(
      'documents',
      new TableIndex({
        name: 'IDX_DOCUMENT_DELETED_AT',
        columnNames: ['deleted_at'],
      }),
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.dropIndex(
      'documents',
      'IDX_DOCUMENT_DELETED_AT',
    );

    await queryRunner.dropIndex(
      'documents',
      'IDX_DOCUMENT_EXPIRATION',
    );

    await queryRunner.dropIndex(
      'documents',
      'IDX_DOCUMENT_STATUS',
    );

    await queryRunner.dropIndex(
      'documents',
      'IDX_DOCUMENT_TYPE',
    );

    await queryRunner.dropIndex(
      'documents',
      'IDX_DOCUMENT_EMPLOYEE',
    );

    await queryRunner.dropIndex(
      'documents',
      'IDX_DOCUMENT_TENANT',
    );

    await queryRunner.dropForeignKey(
      'documents',
      'FK_DOCUMENT_REPLACED_BY',
    );

    await queryRunner.dropForeignKey(
      'documents',
      'FK_DOCUMENT_TYPE',
    );

    await queryRunner.dropForeignKey(
      'documents',
      'FK_DOCUMENT_EMPLOYEE',
    );

    await queryRunner.query(
      'ALTER TABLE documents ' +
      'DROP CONSTRAINT IF EXISTS CHK_DOCUMENT_STATUS',
    );

    await queryRunner.dropColumns(
      'documents',
      [
        'document_type_id',
        'document_number',
        'mime_type',
        'file_size',
        'issue_date',
        'expiration_date',
        'status',
        'version',
        'uploaded_by',
        'approved_by',
        'approved_at',
        'rejected_by',
        'rejected_at',
        'rejection_reason',
        'replaced_by_document_id',
        'updated_at',
        'deleted_at',
      ],
    );

    await queryRunner.query(
      'ALTER TABLE documents ' +
      'ALTER COLUMN employee_id TYPE varchar ' +
      'USING employee_id::text',
    );

    await queryRunner.query(
      'ALTER TABLE documents ' +
      'ALTER COLUMN tenant_id TYPE varchar ' +
      'USING tenant_id::text',
    );
  }
}
