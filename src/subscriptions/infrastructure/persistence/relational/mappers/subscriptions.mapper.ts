import { Subscriptions } from '../../../../domain/subscriptions';

import { SubscriptionPlansMapper } from '../../../../../subscription-plans/infrastructure/persistence/relational/mappers/subscription-plans.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SubscriptionsEntity } from '../entities/subscriptions.entity';

export class SubscriptionsMapper {
  static toDomain(raw: SubscriptionsEntity): Subscriptions {
    const domainEntity = new Subscriptions();
    domainEntity.endDate = raw.endDate;

    domainEntity.startDate = raw.startDate;

    domainEntity.status = raw.status;

    if (raw.plan) {
      domainEntity.plan = SubscriptionPlansMapper.toDomain(raw.plan);
    }

    if (raw.subscriber) {
      domainEntity.subscriber = UserMapper.toDomain(raw.subscriber);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Subscriptions): SubscriptionsEntity {
    const persistenceEntity = new SubscriptionsEntity();
    persistenceEntity.endDate = domainEntity.endDate;

    persistenceEntity.startDate = domainEntity.startDate;

    persistenceEntity.status = domainEntity.status;

    if (domainEntity.plan) {
      persistenceEntity.plan = SubscriptionPlansMapper.toPersistence(
        domainEntity.plan,
      );
    }

    if (domainEntity.subscriber) {
      persistenceEntity.subscriber = UserMapper.toPersistence(
        domainEntity.subscriber,
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
