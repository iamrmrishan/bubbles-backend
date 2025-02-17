import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';
import { UsersModule } from '../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { RelationalSubscriptionsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PaymentsModule } from '../payments/payments.module';
import { StripeModule } from '../stripes/stripes.module';

@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    forwardRef(() => SubscriptionPlansModule),

    UsersModule,
    StripeModule,
    // import modules, etc.
    RelationalSubscriptionsPersistenceModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService, RelationalSubscriptionsPersistenceModule],
})
export class SubscriptionsModule {}
