import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentReportsFields1737148875309 implements MigrationInterface {
  name = 'ContentReportsFields1737148875309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_report" ADD "reporterIdId" uuid`,
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
      `ALTER TABLE "content_report" DROP COLUMN "reporterIdId"`,
    );
  }
}
