import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessagesMessageContent1738248735109
  implements MigrationInterface
{
  name = 'AddMessagesMessageContent1738248735109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "MessageContent" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP COLUMN "MessageContent"`,
    );
  }
}
