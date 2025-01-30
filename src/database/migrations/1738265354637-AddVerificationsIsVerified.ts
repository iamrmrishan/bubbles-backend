import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsIsVerified1738265354637
  implements MigrationInterface
{
  name = 'AddVerificationsIsVerified1738265354637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "isVerified" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "isVerified"`,
    );
  }
}
