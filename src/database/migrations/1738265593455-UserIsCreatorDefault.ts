import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserIsCreatorDefault1738265593455 implements MigrationInterface {
  name = 'UserIsCreatorDefault1738265593455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isCreator" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isCreator" DROP DEFAULT`,
    );
  }
}
