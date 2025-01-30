import { SubscriptionPlans } from '../../../../domain/subscription-plans';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SubscriptionPlansEntity } from '../entities/subscription-plans.entity';

export class SubscriptionPlansMapper {
  static toDomain(raw: SubscriptionPlansEntity): SubscriptionPlans {
    const domainEntity = new SubscriptionPlans();
    domainEntity.duration = raw.duration;

    domainEntity.price = raw.price;

    domainEntity.description = raw.description;

    domainEntity.name = raw.name;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SubscriptionPlans,
  ): SubscriptionPlansEntity {
    const persistenceEntity = new SubscriptionPlansEntity();
    persistenceEntity.duration = domainEntity.duration;

    persistenceEntity.price = domainEntity.price;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
