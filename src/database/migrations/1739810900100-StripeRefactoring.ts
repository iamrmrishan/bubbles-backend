import { MigrationInterface, QueryRunner } from 'typeorm';

export class StripeRefactoring1739810900100 implements MigrationInterface {
  name = 'StripeRefactoring1739810900100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP CONSTRAINT "FK_3d96376a1a47cd97dc005f7e86b"`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric(10,2) NOT NULL DEFAULT '0', "stripeAccountId" character varying, "stripeCustomerId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "REL_9bf56f7989a7e5717c92221cce" UNIQUE ("ownerId"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."subscription_status_enum" AS ENUM('active', 'canceled', 'expired', 'payment_failed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stripeSubscriptionId" character varying NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying NOT NULL, "status" "public"."subscription_status_enum" NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "subscriberId" uuid, "planId" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stripe_payment_status_enum" AS ENUM('pending', 'succeeded', 'failed', 'refunded')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stripe_payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paymentIntentId" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "currency" character varying NOT NULL, "status" "public"."stripe_payment_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fce134b494615a5552990a5185a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_type_enum" AS ENUM('subscription', 'tip', 'payout', 'refund')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'completed', 'failed', 'refunded')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."payment_type_enum" NOT NULL, "amount" numeric(10,2) NOT NULL, "platformFee" numeric(10,2) NOT NULL, "creatorAmount" numeric(10,2) NOT NULL, "stripePaymentId" character varying NOT NULL, "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromWalletId" uuid, "toWalletId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "userId"`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "walletId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_922e8c1d396025973ec81e2a402" UNIQUE ("walletId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "stripeProductId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "stripePriceId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "creatorId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "price" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallet" ADD CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD CONSTRAINT "FK_fd0126fe23a033b34ade00ec3fc" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_95a175097e883d7d1deb5780c62" FOREIGN KEY ("subscriberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_6b6d0e4dc88105a4a11103dd2cd" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_a6ca443aaed6a96311aa6733686" FOREIGN KEY ("fromWalletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_0bab96994465622d5def55c1663" FOREIGN KEY ("toWalletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_0bab96994465622d5def55c1663"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_a6ca443aaed6a96311aa6733686"`,
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
      `ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "creatorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "stripePriceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" DROP COLUMN "stripeProductId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_922e8c1d396025973ec81e2a402"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "walletId"`);
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_type_enum"`);
    await queryRunner.query(`DROP TABLE "stripe_payment"`);
    await queryRunner.query(`DROP TYPE "public"."stripe_payment_status_enum"`);
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(
      `ALTER TABLE "subscription_plans" ADD CONSTRAINT "FK_3d96376a1a47cd97dc005f7e86b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
