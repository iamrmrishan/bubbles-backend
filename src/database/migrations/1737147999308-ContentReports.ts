import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentReports1737147999308 implements MigrationInterface {
  name = 'ContentReports1737147999308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_blocked_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_blocker_user"`,
    );
    await queryRunner.query(
      `CREATE TABLE "content_report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1effd709157e94e02959826f51e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP COLUMN "blockedId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP COLUMN "blockerId"`,
    );
    await queryRunner.query(`ALTER TABLE "user_blocks" ADD "blockedIdId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_2ee6fdd901da9c526882ad3f8fd" FOREIGN KEY ("blockedIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_2ee6fdd901da9c526882ad3f8fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP COLUMN "blockedIdId"`,
    );
    await queryRunner.query(`ALTER TABLE "user_blocks" ADD "blockerId" uuid`);
    await queryRunner.query(`ALTER TABLE "user_blocks" ADD "blockedId" uuid`);
    await queryRunner.query(`DROP TABLE "content_report"`);
    await queryRunner.query(
      `ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_blocker_user" FOREIGN KEY ("blockerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_blocked_user" FOREIGN KEY ("blockedId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
