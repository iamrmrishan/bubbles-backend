import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCoverPhotoToUser1737712026034 implements MigrationInterface {
  name = 'AddCoverPhotoToUser1737712026034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "coverPhotoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_8e4c68d39dfae2d6887a46c8dac" UNIQUE ("coverPhotoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_8e4c68d39dfae2d6887a46c8dac" FOREIGN KEY ("coverPhotoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_8e4c68d39dfae2d6887a46c8dac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_8e4c68d39dfae2d6887a46c8dac"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "coverPhotoId"`);
  }
}
