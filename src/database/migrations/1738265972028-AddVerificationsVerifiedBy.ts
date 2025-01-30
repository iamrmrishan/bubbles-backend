import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsVerifiedBy1738265972028
  implements MigrationInterface
{
  name = 'AddVerificationsVerifiedBy1738265972028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "verifiedBy" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "verifiedBy"`,
    );
  }
}
