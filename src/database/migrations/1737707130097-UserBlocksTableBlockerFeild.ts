import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserBlocksTableBlockerFeild1737707130097
  implements MigrationInterface
{
  name = 'UserBlocksTableBlockerFeild1737707130097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_content_file"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_reporter_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "contentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "reporterId"`,
    );
    await queryRunner.query(`ALTER TABLE "user_blocks" ADD "blockerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "contentIdId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "reporterIdId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_eae09d4f95afa5ae30c28384607" FOREIGN KEY ("blockerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_8bdbe06ab1065c4000018993516" FOREIGN KEY ("contentIdId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_34909b594415ba1f2058106f4a0" FOREIGN KEY ("reporterIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_34909b594415ba1f2058106f4a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_8bdbe06ab1065c4000018993516"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_eae09d4f95afa5ae30c28384607"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "reporterIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "contentIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP COLUMN "blockerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "reporterId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "contentId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_reporter_user" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_content_file" FOREIGN KEY ("contentId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
