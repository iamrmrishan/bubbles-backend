import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentReportsFileToContent1738267030484
  implements MigrationInterface
{
  name = 'ContentReportsFileToContent1738267030484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // First drop the existing foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_8bdbe06ab1065c4000018993516"`,
    );
    
    // Rename the column
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "contentIdId" TO "contentId"`,
    );

    // Add the new foreign key constraint with the renamed column
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_8bdbe06ab1065c4000018993516" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // First drop the foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_8bdbe06ab1065c4000018993516"`,
    );

    // Rename the column back
    await queryRunner.query(
      `ALTER TABLE "content_report" RENAME COLUMN "contentId" TO "contentIdId"`,
    );

    // Add back the foreign key constraint still pointing to content
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD CONSTRAINT "FK_8bdbe06ab1065c4000018993516" FOREIGN KEY ("contentIdId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}