import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentTableTitleField1737707902059 implements MigrationInterface {
  name = 'ContentTableTitleField1737707902059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" ADD "title" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "title"`);
  }
}
