import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsRejectionReason1738265199131
  implements MigrationInterface
{
  name = 'AddVerificationsRejectionReason1738265199131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "rejectionReason" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "rejectionReason"`,
    );
  }
}
