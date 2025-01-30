import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsFullName1738250246565
  implements MigrationInterface
{
  name = 'AddVerificationsFullName1738250246565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "fullName" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "fullName"`,
    );
  }
}
