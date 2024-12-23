import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentReportsFieldResolutionFeild1737705523021
  implements MigrationInterface
{
  name = 'ContentReportsFieldResolutionFeild1737705523021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "resolutionNote" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "resolutionNote"`,
    );
  }
}
