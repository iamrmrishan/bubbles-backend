import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContentAttributesKey1738237308479
  implements MigrationInterface
{
  name = 'AddContentAttributesKey1738237308479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_attributes" ADD "key" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_attributes" DROP COLUMN "key"`,
    );
  }
}
