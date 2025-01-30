import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessagesSubscriptionPlan1738248950870
  implements MigrationInterface
{
  name = 'AddMessagesSubscriptionPlan1738248950870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "planId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_921ea1e6f24a8ca5661f5ed6d52" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_921ea1e6f24a8ca5661f5ed6d52"`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "planId"`);
  }
}
