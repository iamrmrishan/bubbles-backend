import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { SubscriptionPlan } from '../../../../domain/subscription-plans';
import { SubscriptionPlanEntity } from '../entities/subscription-plans.entity';

export class SubscriptionPlanMapper {
  static toDomain(raw: SubscriptionPlanEntity): SubscriptionPlan {
    const plan = new SubscriptionPlan();
    plan.id = raw.id;
    plan.name = raw.name;
    plan.description = raw.description;
    plan.price = Number(raw.price);
    plan.duration = raw.duration;
    plan.creatorId = raw.creatorId;
    if (raw.creator) {
      plan.creator = UserMapper.toDomain(raw.creator);
    }
    plan.stripeProductId = raw.stripeProductId;
    plan.stripePriceId = raw.stripePriceId;
    plan.createdAt = raw.createdAt;
    plan.updatedAt = raw.updatedAt;
    return plan;
  }

  static toPersistence(domain: SubscriptionPlan): SubscriptionPlanEntity {
    const entity = new SubscriptionPlanEntity();
    if (domain.id) {
      entity.id = domain.id;
    }
    entity.name = domain.name;
    entity.description = domain.description;
    entity.price = domain.price;
    entity.duration = domain.duration;
    entity.creatorId = domain.creator.id;
    if (domain.creator) {
      const persistedCreator = UserMapper.toPersistence(domain.creator);
      entity.creator = persistedCreator;
    }
    entity.stripeProductId = domain.stripeProductId;
    entity.stripePriceId = domain.stripePriceId;
    if (domain.createdAt) {
      entity.createdAt = domain.createdAt;
    }
    if (domain.updatedAt) {
      entity.updatedAt = domain.updatedAt;
    }
    return entity;
  }
}
