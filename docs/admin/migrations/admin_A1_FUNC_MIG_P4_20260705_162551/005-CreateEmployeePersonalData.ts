import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateEmployeePersonalData005 implements MigrationInterface {
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employee_personal_data',
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
            name: 'cpf',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'rg',
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: 'rg_issuer',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'rg_issue_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: 'marital_status',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'nationality',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'birth_place',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'mother_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'father_name',
            type: 'varchar',
            length: '255',
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
      'ALTER TABLE employee_personal_data ' +
      'ADD CONSTRAINT UNQ_EMPLOYEE_PERSONAL_DATA_EMPLOYEE ' +
      'UNIQUE (employee_id)',
    );

    await queryRunner.createForeignKey(
      'employee_personal_data',
      new TableForeignKey({
        name: 'FK_EMPLOYEE_PERSONAL_DATA_EMPLOYEE',
        columnNames: ['employee_id'],
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );


    await queryRunner.createIndex(
      'employee_personal_data',
      new TableIndex({
        name: 'IDX_PERSONAL_DATA_TENANT',
        columnNames: ['tenant_id'],
      }),
    );

    await queryRunner.createIndex(
      'employee_personal_data',
      new TableIndex({
        name: 'IDX_PERSONAL_DATA_EMPLOYEE',
        columnNames: ['employee_id'],
      }),
    );

    await queryRunner.createIndex(
      'employee_personal_data',
      new TableIndex({
        name: 'IDX_PERSONAL_DATA_CPF',
        columnNames: ['cpf'],
      }),
    );

    await queryRunner.createIndex(
      'employee_personal_data',
      new TableIndex({
        name: 'IDX_PERSONAL_DATA_CREATED_AT',
        columnNames: ['created_at'],
      }),
    );

    await queryRunner.createIndex(
      'employee_personal_data',
      new TableIndex({
        name: 'IDX_PERSONAL_DATA_DELETED_AT',
        columnNames: ['deleted_at'],
      }),
    );

  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    void queryRunner;
  }
}
