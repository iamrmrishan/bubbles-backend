import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContentAttributesContentId1738237189004
  implements MigrationInterface
{
  name = 'AddContentAttributesContentId1738237189004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_attributes" ADD "contentId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_attributes" ADD CONSTRAINT "FK_4a7b24e2ba67022c4d38b3e6880" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_attributes" DROP CONSTRAINT "FK_4a7b24e2ba67022c4d38b3e6880"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_attributes" DROP COLUMN "contentId"`,
    );
  }
}
