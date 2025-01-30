import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatorAttributesValue1738236469097
  implements MigrationInterface
{
  name = 'AddCreatorAttributesValue1738236469097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" ADD "value" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" DROP COLUMN "value"`,
    );
  }
}
