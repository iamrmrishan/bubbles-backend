import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatorAttributes1738235656230 implements MigrationInterface {
  name = 'AddCreatorAttributes1738235656230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "creator_attributes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_78dfdf8534f8a9b819db122e842" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "creator_attributes"`);
  }
}
