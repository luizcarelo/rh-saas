import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateEmployeePendingActions003 implements MigrationInterface {
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employee_pending_actions',
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
            name: 'employee_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'title',
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
            name: 'severity',
            type: 'varchar',
            length: '30',
            isNullable: false,
            default: "'MEDIUM'",
          },
          {
            name: 'status',
            type: 'varchar',
            length: '30',
            isNullable: false,
            default: "'OPEN'",
          },
          {
            name: 'due_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'related_entity_type',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'related_entity_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'resolved_at',
            type: 'timestamp',
            isNullable: true,
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
    await queryRunner.query(
      'ALTER TABLE employee_pending_actions ' +
      'ADD CONSTRAINT CHK_PENDING_ACTION_SEVERITY ' +
      'CHECK (severity IN (' +
      "'LOW', " +
      "'MEDIUM', " +
      "'HIGH', " +
      "'CRITICAL'" +
      '))',
    );

    await queryRunner.query(
      'ALTER TABLE employee_pending_actions ' +
      'ADD CONSTRAINT CHK_PENDING_ACTION_STATUS ' +
      'CHECK (status IN (' +
      "'OPEN', " +
      "'IN_PROGRESS', " +
      "'RESOLVED', " +
      "'CANCELED'" +
      '))',
    );

    await queryRunner.createForeignKey(
      'employee_pending_actions',
      new TableForeignKey({
        name: 'FK_PENDING_ACTION_EMPLOYEE',
        columnNames: ['employee_id'],
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'employee_pending_actions',
      new TableIndex({
        name: 'IDX_PENDING_TENANT',
        columnNames: ['tenant_id'],
      }),
    );

    await queryRunner.createIndex(
      'employee_pending_actions',
      new TableIndex({
        name: 'IDX_PENDING_EMPLOYEE',
        columnNames: ['employee_id'],
      }),
    );

    await queryRunner.createIndex(
      'employee_pending_actions',
      new TableIndex({
        name: 'IDX_PENDING_STATUS',
        columnNames: ['status'],
      }),
    );

    await queryRunner.createIndex(
      'employee_pending_actions',
      new TableIndex({
        name: 'IDX_PENDING_SEVERITY',
        columnNames: ['severity'],
      }),
    );

    await queryRunner.createIndex(
      'employee_pending_actions',
      new TableIndex({
        name: 'IDX_PENDING_DUE_DATE',
        columnNames: ['due_date'],
      }),
    );

    await queryRunner.createIndex(
      'employee_pending_actions',
      new TableIndex({
        name: 'IDX_PENDING_TYPE',
        columnNames: ['type'],
      }),
    );

    await queryRunner.createIndex(
      'employee_pending_actions',
      new TableIndex({
        name: 'IDX_PENDING_DELETED_AT',
        columnNames: ['deleted_at'],
      }),
    );

  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.dropIndex(
      'employee_pending_actions',
      'IDX_PENDING_DELETED_AT',
    );

    await queryRunner.dropIndex(
      'employee_pending_actions',
      'IDX_PENDING_TYPE',
    );

    await queryRunner.dropIndex(
      'employee_pending_actions',
      'IDX_PENDING_DUE_DATE',
    );

    await queryRunner.dropIndex(
      'employee_pending_actions',
      'IDX_PENDING_SEVERITY',
    );

    await queryRunner.dropIndex(
      'employee_pending_actions',
      'IDX_PENDING_STATUS',
    );

    await queryRunner.dropIndex(
      'employee_pending_actions',
      'IDX_PENDING_EMPLOYEE',
    );

    await queryRunner.dropIndex(
      'employee_pending_actions',
      'IDX_PENDING_TENANT',
    );

    await queryRunner.dropForeignKey(
      'employee_pending_actions',
      'FK_PENDING_ACTION_EMPLOYEE',
    );

    await queryRunner.query(
      'ALTER TABLE employee_pending_actions ' +
      'DROP CONSTRAINT IF EXISTS CHK_PENDING_ACTION_STATUS',
    );

    await queryRunner.query(
      'ALTER TABLE employee_pending_actions ' +
      'DROP CONSTRAINT IF EXISTS CHK_PENDING_ACTION_SEVERITY',
    );

    await queryRunner.dropTable(
      'employee_pending_actions',
    );
  }
}
