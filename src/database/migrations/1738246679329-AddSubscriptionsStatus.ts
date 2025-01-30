import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionsStatus1738246679329 implements MigrationInterface {
  name = 'AddSubscriptionsStatus1738246679329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "status" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "status"`);
  }
}
