import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsUser1738249855851 implements MigrationInterface {
  name = 'AddVerificationsUser1738249855851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD CONSTRAINT "UQ_e6a542673f9abc1f67e5f32abaf" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "UQ_e6a542673f9abc1f67e5f32abaf"`,
    );
    await queryRunner.query(`ALTER TABLE "verifications" DROP COLUMN "userId"`);
  }
}
