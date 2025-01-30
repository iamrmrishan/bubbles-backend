import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { RelationalSubscriptionsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SubscriptionPlansModule,

    UsersModule,

    // import modules, etc.
    RelationalSubscriptionsPersistenceModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService, RelationalSubscriptionsPersistenceModule],
})
export class SubscriptionsModule {}
