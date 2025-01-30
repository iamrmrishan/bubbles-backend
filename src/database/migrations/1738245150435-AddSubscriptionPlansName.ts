import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionPlansName1738245150435
  implements MigrationInterface
{
  name = 'AddSubscriptionPlansName1738245150435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "name"`,
    );
  }
}
