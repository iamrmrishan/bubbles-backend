import { Stripe } from '../../../../domain/stripe';
import { StripeEntity } from '../entities/stripe.entity';

export class StripeMapper {
  static toDomain(raw: StripeEntity): Stripe {
    const domainEntity = new Stripe();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Stripe): StripeEntity {
    const persistenceEntity = new StripeEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
