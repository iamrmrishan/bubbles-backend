import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionsEndDate1738247472716
  implements MigrationInterface
{
  name = 'AddSubscriptionsEndDate1738247472716';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "endDate" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "endDate"`,
    );
  }
}
