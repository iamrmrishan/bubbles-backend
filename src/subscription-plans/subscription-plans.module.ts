import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { RelationalSubscriptionPlansPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

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
