import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContentAttributes1738236608735 implements MigrationInterface {
  name = 'AddContentAttributes1738236608735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "content_attributes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b70be7fa5c49f0d54eb4ef80ff9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "content_attributes"`);
  }
}
