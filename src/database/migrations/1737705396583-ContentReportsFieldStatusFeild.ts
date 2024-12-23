import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentReportsFieldStatusFeild1737705396583
  implements MigrationInterface
{
  name = 'ContentReportsFieldStatusFeild1737705396583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "status" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP COLUMN "status"`,
    );
  }
}
