import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationsSelfieWithId1738264365586
  implements MigrationInterface
{
  name = 'AddVerificationsSelfieWithId1738264365586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD "selfieWithIdId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD CONSTRAINT "UQ_49ce4f918d9238674f0edd15cd6" UNIQUE ("selfieWithIdId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" ADD CONSTRAINT "FK_49ce4f918d9238674f0edd15cd6" FOREIGN KEY ("selfieWithIdId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "FK_49ce4f918d9238674f0edd15cd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "UQ_49ce4f918d9238674f0edd15cd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP COLUMN "selfieWithIdId"`,
    );
  }
}
