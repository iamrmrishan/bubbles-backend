import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessagesSentAt1738249332218 implements MigrationInterface {
  name = 'AddMessagesSentAt1738249332218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "sentAt" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sentAt"`);
  }
}
