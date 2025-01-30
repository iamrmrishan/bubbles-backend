import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionPlansPrice1738245545553
  implements MigrationInterface
{
  name = 'AddSubscriptionPlansPrice1738245545553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "price" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "price"`,
    );
  }
}
