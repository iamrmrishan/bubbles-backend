import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContentAttributesValue1738237394741
  implements MigrationInterface
{
  name = 'AddContentAttributesValue1738237394741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_attributes" ADD "value" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_attributes" DROP COLUMN "value"`,
    );
  }
}
