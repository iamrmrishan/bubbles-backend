import { Module } from '@nestjs/common';
import { SubscriptionsRepository } from '../subscriptions.repository';
import { SubscriptionsRelationalRepository } from './repositories/subscriptions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [
    {
      provide: SubscriptionsRepository,
      useClass: SubscriptionsRelationalRepository,
    },
  ],
  exports: [SubscriptionsRepository],
})
export class RelationalSubscriptionsPersistenceModule {}
