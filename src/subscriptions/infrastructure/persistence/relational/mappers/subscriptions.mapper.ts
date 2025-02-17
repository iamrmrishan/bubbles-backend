import { Subscription } from '../../../../domain/subscriptions';
import { SubscriptionEntity } from '../entities/subscriptions.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { SubscriptionPlanMapper } from '../../../../../subscription-plans/infrastructure/persistence/relational/mappers/subscription-plans.mapper';

export class SubscriptionMapper {
  static toDomain(raw: SubscriptionEntity): Subscription {
    const subscription = new Subscription();
    subscription.id = raw.id;
    if (raw.subscriber) {
      subscription.subscriber = UserMapper.toDomain(raw.subscriber);
    }
    if (raw.plan) {
      subscription.plan = SubscriptionPlanMapper.toDomain(raw.plan);
    }
    subscription.stripeSubscriptionId = raw.stripeSubscriptionId;
    subscription.startDate = raw.startDate;
    subscription.endDate = raw.endDate;
    subscription.status = raw.status;
    subscription.createdAt = raw.createdAt;
    subscription.updatedAt = raw.updatedAt;
    return subscription;
  }

  static toPersistence(domain: Subscription): SubscriptionEntity {
    const entity = new SubscriptionEntity();
    if (domain.id) {
      entity.id = domain.id;
    }
    if (domain.subscriber) {
      entity.subscriber = UserMapper.toPersistence(domain.subscriber);
    }
    if (domain.plan) {
      entity.plan = SubscriptionPlanMapper.toPersistence(domain.plan);
    }
    entity.stripeSubscriptionId = domain.stripeSubscriptionId;
    entity.startDate = domain.startDate;
    entity.endDate = domain.endDate;
    entity.status = domain.status;
    if (domain.createdAt) {
      entity.createdAt = domain.createdAt;
    }
    if (domain.updatedAt) {
      entity.updatedAt = domain.updatedAt;
    }
    return entity;
  }
}
