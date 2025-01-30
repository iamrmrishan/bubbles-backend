import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsDoB1738250437304 implements MigrationInterface {
  name = 'AddVerificationsDoB1738250437304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "dateOfBirth" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "dateOfBirth"`,
    );
  }
}
