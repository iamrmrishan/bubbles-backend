import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserBlocksFields1737147382434 implements MigrationInterface {
  name = 'UpdateUserBlocksFields1737147382434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_2ee6fdd901da9c526882ad3f8fd"`,
    );

    // Rename blockedIdId to blockedId
    await queryRunner.query(
      `ALTER TABLE "user_blocks" RENAME COLUMN "blockedIdId" TO "blockedId"`,
    );

    // Add blockerId column
    await queryRunner.query(`ALTER TABLE "user_blocks" ADD "blockerId" uuid`);

    // Add foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_blocked_user" FOREIGN KEY ("blockedId") REFERENCES "user"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_blocker_user" FOREIGN KEY ("blockerId") REFERENCES "user"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop new foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_blocker_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_blocked_user"`,
    );

    // Drop blockerId column
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP COLUMN "blockerId"`,
    );

    // Rename blockedId back to blockedIdId
    await queryRunner.query(
      `ALTER TABLE "user_blocks" RENAME COLUMN "blockedId" TO "blockedIdId"`,
    );

    // Recreate original foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_2ee6fdd901da9c526882ad3f8fd" FOREIGN KEY ("blockedIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
