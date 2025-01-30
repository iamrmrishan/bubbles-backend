import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionPlansDescription1738245314170
  implements MigrationInterface
{
  name = 'AddSubscriptionPlansDescription1738245314170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "description"`,
    );
  }
}
