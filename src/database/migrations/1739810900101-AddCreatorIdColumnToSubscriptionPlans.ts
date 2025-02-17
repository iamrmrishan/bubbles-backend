import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatorIdColumnToSubscriptionPlans1739810900101
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "subscription_plans" 
            ADD COLUMN IF NOT EXISTS "creatorId" uuid REFERENCES "user"(id)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "subscription_plans" 
            DROP COLUMN IF EXISTS "creatorId"
        `);
  }
}
