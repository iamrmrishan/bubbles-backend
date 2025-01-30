import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsState1738263719263 implements MigrationInterface {
  name = 'AddVerificationsState1738263719263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "state" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "verifications" DROP COLUMN "state"`);
  }
}
