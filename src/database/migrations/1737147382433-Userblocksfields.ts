import { MigrationInterface, QueryRunner } from 'typeorm';

export class Userblocksfields1737147382433 implements MigrationInterface {
  name = 'Userblocksfields1737147382433';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
