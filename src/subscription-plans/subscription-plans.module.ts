import { UsersModule } from '../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { RelationalSubscriptionPlansPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { StripeModule } from '../stripes/stripes.module';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => SubscriptionsModule),
    StripeModule,
    WalletsModule,

    // import modules, etc.
    RelationalSubscriptionPlansPersistenceModule,
  ],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
  exports: [
    SubscriptionPlansService,
    RelationalSubscriptionPlansPersistenceModule,
  ],
})
export class SubscriptionPlansModule {}
