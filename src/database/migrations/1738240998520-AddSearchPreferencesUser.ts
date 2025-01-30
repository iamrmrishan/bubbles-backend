import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSearchPreferencesUser1738240998520
  implements MigrationInterface
{
  name = 'AddSearchPreferencesUser1738240998520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "search_preferences" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "search_preferences" ADD CONSTRAINT "FK_b16dbb77851fe21bd7461e04e29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "search_preferences" DROP CONSTRAINT "FK_b16dbb77851fe21bd7461e04e29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "search_preferences" DROP COLUMN "userId"`,
    );
  }
}
