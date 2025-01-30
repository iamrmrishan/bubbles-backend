import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsStatus1738264570208 implements MigrationInterface {
  name = 'AddVerificationsStatus1738264570208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "status" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "verifications" DROP COLUMN "status"`);
  }
}
