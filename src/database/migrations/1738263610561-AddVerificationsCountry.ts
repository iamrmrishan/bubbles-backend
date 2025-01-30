import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsCountry1738263610561
  implements MigrationInterface
{
  name = 'AddVerificationsCountry1738263610561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "country" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "country"`,
    );
  }
}
