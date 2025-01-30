import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSearchPreferencesValue1738243487304
  implements MigrationInterface
{
  name = 'AddSearchPreferencesValue1738243487304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "search_preferences" ADD "value" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "search_preferences" DROP COLUMN "value"`,
    );
  }
}
