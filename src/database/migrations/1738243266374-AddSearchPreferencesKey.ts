import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSearchPreferencesKey1738243266374
  implements MigrationInterface
{
  name = 'AddSearchPreferencesKey1738243266374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "search_preferences" ADD "key" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "search_preferences" DROP COLUMN "key"`,
    );
  }
}
