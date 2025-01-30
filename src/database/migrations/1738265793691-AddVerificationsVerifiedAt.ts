import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsVerifiedAt1738265793691
  implements MigrationInterface
{
  name = 'AddVerificationsVerifiedAt1738265793691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "verifiedAt" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "verifiedAt"`,
    );
  }
}
