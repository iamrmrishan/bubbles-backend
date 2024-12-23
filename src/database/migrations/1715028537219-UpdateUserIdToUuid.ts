import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserIdToUuid1715028537219 implements MigrationInterface {
  name = 'UpdateUserIdToUuid1715028537219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID extension if not already enabled
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Drop foreign key constraints from session table
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );

    // Drop foreign key constraints from user table
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_photo_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_status_id"`,
    );

    // Add UUID column
    await queryRunner.query(
      `ALTER TABLE "user" ADD "uuid_id" uuid DEFAULT uuid_generate_v4()`,
    );

    // Update the UUID column for existing records
    await queryRunner.query(
      `UPDATE "user" SET "uuid_id" = uuid_generate_v4() WHERE "uuid_id" IS NULL`,
    );

    // Add UUID column to session table
    await queryRunner.query(`ALTER TABLE "session" ADD "user_uuid" uuid`);

    // Update session table with new UUIDs
    await queryRunner.query(`
      UPDATE "session" s
      SET "user_uuid" = u.uuid_id
      FROM "user" u
      WHERE s."userId" = u.id
    `);

    // Drop old columns and rename new ones
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "session" RENAME COLUMN "user_uuid" TO "userId"`,
    );

    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "uuid_id" TO "id"`,
    );

    // Make the new id columns primary key and not null
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD PRIMARY KEY ("id")`);

    // Recreate foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_photo_id" FOREIGN KEY ("photoId") REFERENCES "file"("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_role_id" FOREIGN KEY ("roleId") REFERENCES "role"("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_status_id" FOREIGN KEY ("statusId") REFERENCES "status"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_photo_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_status_id"`,
    );

    // Add integer ID columns
    await queryRunner.query(`ALTER TABLE "user" ADD "int_id" SERIAL`);
    await queryRunner.query(`ALTER TABLE "session" ADD "user_int_id" INTEGER`);

    // Update session table with new integer IDs
    await queryRunner.query(`
      UPDATE "session" s
      SET "user_int_id" = u.int_id
      FROM "user" u
      WHERE s."userId" = u.id
    `);

    // Drop UUID columns and rename integer columns
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "session" RENAME COLUMN "user_int_id" TO "userId"`,
    );

    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "int_id" TO "id"`,
    );

    // Make the new id columns primary key
    await queryRunner.query(`ALTER TABLE "user" ADD PRIMARY KEY ("id")`);

    // Recreate foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_photo_id" FOREIGN KEY ("photoId") REFERENCES "file"("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_role_id" FOREIGN KEY ("roleId") REFERENCES "role"("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_status_id" FOREIGN KEY ("statusId") REFERENCES "status"("id")`,
    );
  }
}
