import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionsStartDate1738246865419
  implements MigrationInterface
{
  name = 'AddSubscriptionsStartDate1738246865419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "startDate" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "startDate"`,
    );
  }
}
