import { MigrationInterface, QueryRunner } from 'typeorm';

export class 012_CreateEmployeeSalaryHistory implements MigrationInterface {

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {

    /*
      IMPLEMENTAR MIGRATION
      ARCH-P1
      DB-P1..DB-P6
    */

  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {

    /*
      IMPLEMENTAR ROLLBACK
    */

  }
}
