import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateContentReportFields1737705523022
  implements MigrationInterface
{
  name = 'UpdateContentReportFields1737705523022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT IF EXISTS "FK_8bdbe06ab1065c4000018993516"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT IF EXISTS "FK_34909b594415ba1f2058106f4a0"`,
    );

    // Rename foreign key columns
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "contentIdId" TO "contentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "reporterIdId" TO "reporterId"`,
    );

    // Add back foreign key constraints with new column names
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_content_file" FOREIGN KEY ("contentId") REFERENCES "file"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_reporter_user" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop new foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_content_file"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_reporter_user"`,
    );

    // Rename columns back
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "contentId" TO "contentIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "reporterId" TO "reporterIdId"`,
    );

    // Add back original foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_8bdbe06ab1065c4000018993516" FOREIGN KEY ("contentIdId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_34909b594415ba1f2058106f4a0" FOREIGN KEY ("reporterIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
