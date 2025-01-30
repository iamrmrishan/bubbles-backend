import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionsPlanType1738246461757
  implements MigrationInterface
{
  name = 'AddSubscriptionsPlanType1738246461757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "planId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_7536cba909dd7584a4640cad7d5" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_7536cba909dd7584a4640cad7d5"`,
    );
    await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "planId"`);
  }
}
