import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserNameToUser1737710808390 implements MigrationInterface {
  name = 'AddUserNameToUser1737710808390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "userName" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
  }
}
