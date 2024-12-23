import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameContentReportColumn1737148875310
  implements MigrationInterface
{
  name = 'RenameContentReportColumn1737148875310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // First drop the existing foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_34909b594415ba1f2058106f4a0"`,
    );

    // Rename the column
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "reporterIdId" TO "reporterId"`,
    );

    // Add back the foreign key constraint with the new column name
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_reporter_user" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the new foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_reporter_user"`,
    );

    // Rename the column back
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "reporterId" TO "reporterIdId"`,
    );

    // Add back the original foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_34909b594415ba1f2058106f4a0" FOREIGN KEY ("reporterIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
