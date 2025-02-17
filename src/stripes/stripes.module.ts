import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeWebhookController } from './stripes.webhook.controller';
import { PaymentPort } from './infrastructure/ports/payment.port';
import { StripeEntity } from './infrastructure/persistence/relational/entities/stripe.entity';
import { StripeService } from './stripes.service';
import { StripeAdapter } from './infrastructure/adapters/stripe.adapter';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([StripeEntity])],
  controllers: [StripeWebhookController],
  providers: [
    StripeService,
    StripeAdapter, // Add this
    {
      provide: PaymentPort,
      useClass: StripeAdapter, // Change to useClass and point to StripeAdapter
    },
  ],
  exports: [StripeService, PaymentPort],
})
export class StripeModule {}
