import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConsolidatedMigration1710000000000 implements MigrationInterface {
  name = 'ConsolidatedMigration1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create role table
    await queryRunner.query(`
      CREATE TABLE "role" (
        "id" integer NOT NULL, 
        "name" character varying NOT NULL, 
        CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
      )
    `);

    // Create status table
    await queryRunner.query(`
      CREATE TABLE "status" (
        "id" integer NOT NULL, 
        "name" character varying NOT NULL, 
        CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")
      )
    `);

    // Create file table
    await queryRunner.query(`
      CREATE TABLE "file" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "path" character varying NOT NULL, 
        CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")
      )
    `);

    // Create wallet table
    await queryRunner.query(`
      CREATE TABLE "wallet" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "balance" numeric(10,2) NOT NULL DEFAULT '0', 
        "stripeAccountId" character varying, 
        "stripeCustomerId" character varying, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "ownerId" uuid, 
        CONSTRAINT "REL_9bf56f7989a7e5717c92221cce" UNIQUE ("ownerId"), 
        CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id")
      )
    `);

    // Create user table
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "email" character varying, 
        "password" character varying, 
        "provider" character varying NOT NULL DEFAULT 'email', 
        "socialId" character varying, 
        "userName" character varying, 
        "isCreator" boolean NOT NULL DEFAULT false, 
        "bio" character varying, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP, 
        "photoId" uuid, 
        "coverPhotoId" uuid, 
        "walletId" uuid, 
        "roleId" integer, 
        "statusId" integer, 
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
        CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId"), 
        CONSTRAINT "UQ_8e4c68d39dfae2d6887a46c8dac" UNIQUE ("coverPhotoId"), 
        CONSTRAINT "UQ_922e8c1d396025973ec81e2a402" UNIQUE ("walletId"), 
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )
    `);

    // Create index on socialId
    await queryRunner.query(`
      CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId")
    `);

    // Create session table
    await queryRunner.query(`
      CREATE TABLE "session" (
        "id" SERIAL NOT NULL, 
        "hash" character varying NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP, 
        "userId" uuid, 
        CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
      )
    `);

    // Create index on session userId
    await queryRunner.query(`
      CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId")
    `);

    // Create user_blocks table
    await queryRunner.query(`
      CREATE TABLE "user_blocks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "blockedIdId" uuid, 
        CONSTRAINT "PK_0bae5f5cab7574a84889462187c" PRIMARY KEY ("id")
      )
    `);

    // Create content_report table
    await queryRunner.query(`
      CREATE TABLE "content_report" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "reason" character varying, 
        "status" character varying, 
        "resolutionNote" character varying, 
        "contentId" uuid NOT NULL, 
        "reporterIdId" uuid, 
        CONSTRAINT "PK_1effd709157e94e02959826f51e" PRIMARY KEY ("id")
      )
    `);

    // Create content table
    await queryRunner.query(`
      CREATE TABLE "content" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "creatorId" uuid NOT NULL, 
        "title" character varying NOT NULL, 
        "description" character varying, 
        CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id")
      )
    `);

    // Create content_media table
    await queryRunner.query(`
      CREATE TABLE "content_media" (
        "contentId" uuid NOT NULL, 
        "fileId" uuid NOT NULL, 
        CONSTRAINT "PK_1bdf99fdd59e4d934010865b010" PRIMARY KEY ("contentId", "fileId")
      )
    `);

    // Create indexes for content_media
    await queryRunner.query(`
      CREATE INDEX "IDX_2591acad39b42fc53b2e92fedd" ON "content_media" ("contentId")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_f95eddbd0556c85319e6ed2e28" ON "content_media" ("fileId")
    `);

    // Create creator_attributes table
    await queryRunner.query(`
      CREATE TABLE "creator_attributes" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "userId" uuid NOT NULL, 
        "key" character varying NOT NULL, 
        "value" character varying NOT NULL, 
        CONSTRAINT "PK_78dfdf8534f8a9b819db122e842" PRIMARY KEY ("id")
      )
    `);

    // Create content_attributes table
    await queryRunner.query(`
      CREATE TABLE "content_attributes" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "contentId" uuid NOT NULL, 
        "key" character varying NOT NULL, 
        "value" character varying NOT NULL, 
        CONSTRAINT "PK_b70be7fa5c49f0d54eb4ef80ff9" PRIMARY KEY ("id")
      )
    `);

    // Create search_preferences table
    await queryRunner.query(`
      CREATE TABLE "search_preferences" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "userId" uuid NOT NULL, 
        "key" character varying NOT NULL, 
        "value" character varying NOT NULL, 
        CONSTRAINT "PK_a8c97c856d942840111c14aac6a" PRIMARY KEY ("id")
      )
    `);

    // Create subscription_plans table
    await queryRunner.query(`
      CREATE TABLE "subscription_plans" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "name" character varying NOT NULL, 
        "description" text NOT NULL, 
        "price" numeric(10,2) NOT NULL, 
        "duration" integer NOT NULL, 
        "stripeProductId" character varying NOT NULL, 
        "stripePriceId" character varying NOT NULL, 
        "creatorId" uuid NOT NULL, 
        CONSTRAINT "PK_9ab8fe6918451ab3d0a4fb6bb0c" PRIMARY KEY ("id")
      )
    `);

    // Create subscription status enum
    await queryRunner.query(`
      CREATE TYPE "public"."subscription_status_enum" AS ENUM('active', 'canceled', 'expired', 'payment_failed')
    `);

    // Create subscription table
    await queryRunner.query(`
      CREATE TABLE "subscription" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "stripeSubscriptionId" character varying NOT NULL, 
        "startDate" character varying NOT NULL, 
        "endDate" character varying NOT NULL, 
        "status" "public"."subscription_status_enum" NOT NULL DEFAULT 'active', 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "subscriberId" uuid, 
        "planId" uuid, 
        CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id")
      )
    `);

    // Create messages table
    await queryRunner.query(`
      CREATE TABLE "messages" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "senderId" uuid NOT NULL, 
        "receiverId" uuid NOT NULL, 
        "MessageContent" character varying NOT NULL, 
        "planId" uuid NOT NULL, 
        "sentAt" character varying NOT NULL, 
        CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
      )
    `);

    // Create verifications table
    await queryRunner.query(`
      CREATE TABLE "verifications" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "userId" uuid NOT NULL, 
        "fullName" character varying NOT NULL, 
        "dateOfBirth" character varying NOT NULL, 
        "country" character varying NOT NULL, 
        "state" character varying NOT NULL, 
        "address" character varying NOT NULL, 
        "idDocumentId" uuid NOT NULL, 
        "selfieWithIdId" uuid NOT NULL, 
        "status" character varying NOT NULL, 
        "rejectionReason" character varying, 
        "isVerified" boolean NOT NULL DEFAULT false, 
        "verifiedAt" character varying, 
        "verifiedBy" character varying, 
        CONSTRAINT "UQ_e6a542673f9abc1f67e5f32abaf" UNIQUE ("userId"), 
        CONSTRAINT "UQ_d986cd4975530c564f294ea4967" UNIQUE ("idDocumentId"), 
        CONSTRAINT "UQ_49ce4f918d9238674f0edd15cd6" UNIQUE ("selfieWithIdId"), 
        CONSTRAINT "PK_2127ad1b143cf012280390b01d1" PRIMARY KEY ("id")
      )
    `);

    // Create stripe payment status enum
    await queryRunner.query(`
      CREATE TYPE "public"."stripe_payment_status_enum" AS ENUM('pending', 'succeeded', 'failed', 'refunded')
    `);

    // Create stripe payment table
    await queryRunner.query(`
      CREATE TABLE "stripe_payment" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "paymentIntentId" character varying NOT NULL, 
        "amount" numeric(10,2) NOT NULL, 
        "currency" character varying NOT NULL, 
        "status" "public"."stripe_payment_status_enum" NOT NULL DEFAULT 'pending', 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_fce134b494615a5552990a5185a" PRIMARY KEY ("id")
      )
    `);

    // Create payment type enum
    await queryRunner.query(`
      CREATE TYPE "public"."payment_type_enum" AS ENUM('subscription', 'tip', 'payout', 'refund')
    `);

    // Create payment status enum
    await queryRunner.query(`
      CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'completed', 'failed', 'refunded')
    `);

    // Create payment table
    await queryRunner.query(`
      CREATE TABLE "payment" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "type" "public"."payment_type_enum" NOT NULL, 
        "amount" numeric(10,2) NOT NULL, 
        "platformFee" numeric(10,2) NOT NULL, 
        "creatorAmount" numeric(10,2) NOT NULL, 
        "stripePaymentId" character varying NOT NULL, 
        "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', 
        "metadata" jsonb, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "fromWalletId" uuid, 
        "toWalletId" uuid, 
        CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
      )
    `);

    // Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD CONSTRAINT "FK_8e4c68d39dfae2d6887a46c8dac" FOREIGN KEY ("coverPhotoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "wallet" ADD CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user_blocks" ADD CONSTRAINT "FK_2ee6fdd901da9c526882ad3f8fd" FOREIGN KEY ("blockedIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "content_report" ADD CONSTRAINT "FK_8bdbe06ab1065c4000018993516" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "content_report" ADD CONSTRAINT "FK_34909b594415ba1f2058106f4a0" FOREIGN KEY ("reporterIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "content" ADD CONSTRAINT "FK_76caa597a1826e1dc0286a88b52" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "content_media" ADD CONSTRAINT "FK_2591acad39b42fc53b2e92fedd9" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "content_media" ADD CONSTRAINT "FK_f95eddbd0556c85319e6ed2e28e" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "creator_attributes" ADD CONSTRAINT "FK_79a9a1ba19fe0c975df8ce1fd20" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "content_attributes" ADD CONSTRAINT "FK_4a7b24e2ba67022c4d38b3e6880" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "search_preferences" ADD CONSTRAINT "FK_b16dbb77851fe21bd7461e04e29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "subscription_plans" ADD CONSTRAINT "FK_fd0126fe23a033b34ade00ec3fc" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "subscription" ADD CONSTRAINT "FK_95a175097e883d7d1deb5780c62" FOREIGN KEY ("subscriberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "subscription" ADD CONSTRAINT "FK_6b6d0e4dc88105a4a11103dd2cd" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "messages" ADD CONSTRAINT "FK_921ea1e6f24a8ca5661f5ed6d52" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "verifications" ADD CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "verifications" ADD CONSTRAINT "FK_d986cd4975530c564f294ea4967" FOREIGN KEY ("idDocumentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "verifications" ADD CONSTRAINT "FK_49ce4f918d9238674f0edd15cd6" FOREIGN KEY ("selfieWithIdId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "payment" ADD CONSTRAINT "FK_a6ca443aaed6a96311aa6733686" FOREIGN KEY ("fromWalletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "payment" ADD CONSTRAINT "FK_0bab96994465622d5def55c1663" FOREIGN KEY ("toWalletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop all foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_0bab96994465622d5def55c1663"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_a6ca443aaed6a96311aa6733686"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "FK_49ce4f918d9238674f0edd15cd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "FK_d986cd4975530c564f294ea4967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verifications" DROP CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_921ea1e6f24a8ca5661f5ed6d52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_6b6d0e4dc88105a4a11103dd2cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_95a175097e883d7d1deb5780c62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP CONSTRAINT "FK_fd0126fe23a033b34ade00ec3fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "search_preferences" DROP CONSTRAINT "FK_b16dbb77851fe21bd7461e04e29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_attributes" DROP CONSTRAINT "FK_4a7b24e2ba67022c4d38b3e6880"`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator_attributes" DROP CONSTRAINT "FK_79a9a1ba19fe0c975df8ce1fd20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_media" DROP CONSTRAINT "FK_f95eddbd0556c85319e6ed2e28e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_media" DROP CONSTRAINT "FK_2591acad39b42fc53b2e92fedd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_76caa597a1826e1dc0286a88b52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_34909b594415ba1f2058106f4a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_report" DROP CONSTRAINT "FK_8bdbe06ab1065c4000018993516"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_blocks" DROP CONSTRAINT "FK_2ee6fdd901da9c526882ad3f8fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_8e4c68d39dfae2d6887a46c8dac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );

    // Drop all tables
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_type_enum"`);
    await queryRunner.query(`DROP TABLE "stripe_payment"`);
    await queryRunner.query(`DROP TYPE "public"."stripe_payment_status_enum"`);
    await queryRunner.query(`DROP TABLE "verifications"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
    await queryRunner.query(`DROP TABLE "subscription_plans"`);
    await queryRunner.query(`DROP TABLE "search_preferences"`);
    await queryRunner.query(`DROP TABLE "content_attributes"`);
    await queryRunner.query(`DROP TABLE "creator_attributes"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f95eddbd0556c85319e6ed2e28"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2591acad39b42fc53b2e92fedd"`,
    );
    await queryRunner.query(`DROP TABLE "content_media"`);
    await queryRunner.query(`DROP TABLE "content"`);
    await queryRunner.query(`DROP TABLE "content_report"`);
    await queryRunner.query(`DROP TABLE "user_blocks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
