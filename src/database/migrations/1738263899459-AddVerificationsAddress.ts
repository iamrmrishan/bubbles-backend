import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsAddress1738263899459
  implements MigrationInterface
{
  name = 'AddVerificationsAddress1738263899459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "address" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "address"`,
    );
  }
}
