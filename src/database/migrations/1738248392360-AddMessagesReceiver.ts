import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessagesReceiver1738248392360 implements MigrationInterface {
  name = 'AddMessagesReceiver1738248392360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "receiverId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "receiverId"`);
  }
}
