import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionPlansDuration1738245676063
  implements MigrationInterface
{
  name = 'AddSubscriptionPlansDuration1738245676063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "duration" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "duration"`,
    );
  }
}
