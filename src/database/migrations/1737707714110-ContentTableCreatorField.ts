import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContentTableCreatorField1737707714110
  implements MigrationInterface
{
  name = 'ContentTableCreatorField1737707714110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" ADD "creatorId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD CONSTRAINT "FK_76caa597a1826e1dc0286a88b52" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_76caa597a1826e1dc0286a88b52"`,
    );
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "creatorId"`);
  }
}
