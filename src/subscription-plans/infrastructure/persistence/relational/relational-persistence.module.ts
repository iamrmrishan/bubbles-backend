import { Module } from '@nestjs/common';
import { SubscriptionPlansRepository } from '../subscription-plans.repository';
import { SubscriptionPlansRelationalRepository } from './repositories/subscription-plans.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlanEntity } from './entities/subscription-plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlanEntity])],
  providers: [
    {
      provide: SubscriptionPlansRepository,
      useClass: SubscriptionPlansRelationalRepository,
    },
  ],
  exports: [SubscriptionPlansRepository],
})
export class RelationalSubscriptionPlansPersistenceModule {}
