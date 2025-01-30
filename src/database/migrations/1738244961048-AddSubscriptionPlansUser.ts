import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionPlansUser1738244961048
  implements MigrationInterface
{
  name = 'AddSubscriptionPlansUser1738244961048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD CONSTRAINT "FK_3d96376a1a47cd97dc005f7e86b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP CONSTRAINT "FK_3d96376a1a47cd97dc005f7e86b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "userId"`,
    );
  }
}
