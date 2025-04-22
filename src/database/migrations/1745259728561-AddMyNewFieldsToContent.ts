import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMyNewFieldsToContent1745259728561
  implements MigrationInterface
{
  name = 'AddMyNewFieldsToContent1745259728561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" ADD "visibility" text`);
    await queryRunner.query(`ALTER TABLE "content" ADD "ppvPrice" numeric`);
    await queryRunner.query(`ALTER TABLE "content" ADD "tags" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "ppvPrice"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "visibility"`);
  }
}
