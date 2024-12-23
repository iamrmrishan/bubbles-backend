import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddisCreatorToUser1737711803158 implements MigrationInterface {
  name = 'AddisCreatorToUser1737711803158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isCreator" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isCreator"`);
  }
}
