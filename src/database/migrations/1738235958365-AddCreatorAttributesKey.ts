import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatorAttributesKey1738235958365
  implements MigrationInterface
{
  name = 'AddCreatorAttributesKey1738235958365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" ADD "key" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" DROP COLUMN "key"`,
    );
  }
}
