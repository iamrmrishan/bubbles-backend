import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatorAttributesUser1738235834535
  implements MigrationInterface
{
  name = 'AddCreatorAttributesUser1738235834535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" ADD CONSTRAINT "FK_79a9a1ba19fe0c975df8ce1fd20" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" DROP CONSTRAINT "FK_79a9a1ba19fe0c975df8ce1fd20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" DROP COLUMN "userId"`,
    );
  }
}
