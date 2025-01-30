import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionsSubscriber1738246144737
  implements MigrationInterface
{
  name = 'AddSubscriptionsSubscriber1738246144737';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "subscriberId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_61d51ff73ec5afd7dc7c6c84309" FOREIGN KEY ("subscriberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_61d51ff73ec5afd7dc7c6c84309"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "subscriberId"`,
    );
  }
}
