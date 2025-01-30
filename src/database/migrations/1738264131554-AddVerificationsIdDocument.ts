import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsIdDocument1738264131554
  implements MigrationInterface
{
  name = 'AddVerificationsIdDocument1738264131554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "idDocumentId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD CONSTRAINT "UQ_d986cd4975530c564f294ea4967" UNIQUE ("idDocumentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD CONSTRAINT "FK_d986cd4975530c564f294ea4967" FOREIGN KEY ("idDocumentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "FK_d986cd4975530c564f294ea4967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "UQ_d986cd4975530c564f294ea4967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "idDocumentId"`,
    );
  }
}
