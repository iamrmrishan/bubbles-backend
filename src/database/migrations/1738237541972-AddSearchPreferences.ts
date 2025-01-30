import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSearchPreferences1738237541972 implements MigrationInterface {
  name = 'AddSearchPreferences1738237541972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "search_preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a8c97c856d942840111c14aac6a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "search_preferences"`);
  }
}
