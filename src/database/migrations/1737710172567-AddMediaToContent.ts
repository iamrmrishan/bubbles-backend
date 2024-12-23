import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMediaToContent1737710172567 implements MigrationInterface {
  name = 'AddMediaToContent1737710172567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "content_media" ("contentId" uuid NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_1bdf99fdd59e4d934010865b010" PRIMARY KEY ("contentId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2591acad39b42fc53b2e92fedd" ON "content_media" ("contentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f95eddbd0556c85319e6ed2e28" ON "content_media" ("fileId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "content_media" ADD CONSTRAINT "FK_2591acad39b42fc53b2e92fedd9" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_media" ADD CONSTRAINT "FK_f95eddbd0556c85319e6ed2e28e" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_media" DROP CONSTRAINT "FK_f95eddbd0556c85319e6ed2e28e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_media" DROP CONSTRAINT "FK_2591acad39b42fc53b2e92fedd9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f95eddbd0556c85319e6ed2e28"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2591acad39b42fc53b2e92fedd"`,
    );
    await queryRunner.query(`DROP TABLE "content_media"`);
  }
}
