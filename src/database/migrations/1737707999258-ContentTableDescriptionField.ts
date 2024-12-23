import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentTableDescriptionField1737707999258
  implements MigrationInterface
{
  name = 'ContentTableDescriptionField1737707999258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "description"`);
  }
}
