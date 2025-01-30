import { Module } from '@nestjs/common';
import { SubscriptionPlansRepository } from '../subscription-plans.repository';
import { SubscriptionPlansRelationalRepository } from './repositories/subscription-plans.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlansEntity } from './entities/subscription-plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlansEntity])],
  providers: [
    {
      provide: SubscriptionPlansRepository,
      useClass: SubscriptionPlansRelationalRepository,
    },
  ],
  exports: [SubscriptionPlansRepository],
})
export class RelationalSubscriptionPlansPersistenceModule {}
