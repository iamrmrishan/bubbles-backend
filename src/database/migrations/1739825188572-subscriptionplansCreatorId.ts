import { MigrationInterface, QueryRunner } from 'typeorm';

export class SubscriptionplansCreatorId1739825188572
  implements MigrationInterface
{
  name = 'SubscriptionplansCreatorId1739825188572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP CONSTRAINT "FK_fd0126fe23a033b34ade00ec3fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ALTER COLUMN "creatorId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD CONSTRAINT "FK_fd0126fe23a033b34ade00ec3fc" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP CONSTRAINT "FK_fd0126fe23a033b34ade00ec3fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ALTER COLUMN "creatorId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD CONSTRAINT "FK_fd0126fe23a033b34ade00ec3fc" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
