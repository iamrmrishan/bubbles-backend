import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersRemoveFirstandLastName1739397052824
  implements MigrationInterface
{
  name = 'UsersRemoveFirstandLastName1739397052824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if firstName column exists before adding
    const hasFirstNameColumn = await queryRunner.hasColumn("user", "firstName");
    if (!hasFirstNameColumn) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD "firstName" character varying`,
      );
    }

    // Check if lastName column exists before adding
    const hasLastNameColumn = await queryRunner.hasColumn("user", "lastName");
    if (!hasLastNameColumn) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD "lastName" character varying`,
      );
    }

    // Check if index exists before creating (this might need a different approach)
    try {
      await queryRunner.query(
        `CREATE INDEX IF NOT EXISTS "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
      );
      await queryRunner.query(
        `CREATE INDEX IF NOT EXISTS "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
      );
    } catch (error) {
      // Index might already exist, continue
      console.log('Index creation failed, might already exist: ', error.message);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No change needed for the down method, as it properly drops columns
    try {
      await queryRunner.query(
        `DROP INDEX IF EXISTS "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
      );
    } catch (error) {
      console.log('Drop index failed: ', error.message);
    }
    
    try {
      await queryRunner.query(
        `DROP INDEX IF EXISTS "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
      );
    } catch (error) {
      console.log('Drop index failed: ', error.message);
    }
    
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "firstName"`);
  }
}
