import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentReportsFieldContentId1737704694717
  implements MigrationInterface
{
  name = 'ContentReportsFieldContentId1737704694717';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_reporter_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "reporterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "contentIdId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "reporterIdId" uuid`,
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
      `ALTER TABLE "content_report" DROP COLUMN "reporterIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "contentIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "reporterId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_reporter_user" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
