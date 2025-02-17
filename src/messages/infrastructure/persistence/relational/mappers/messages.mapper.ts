import { Messages } from '../../../../domain/messages';

import { SubscriptionPlanMapper } from '../../../../../subscription-plans/infrastructure/persistence/relational/mappers/subscription-plans.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { MessagesEntity } from '../entities/messages.entity';

export class MessagesMapper {
  static toDomain(raw: MessagesEntity): Messages {
    const domainEntity = new Messages();
    domainEntity.sentAt = raw.sentAt;

    if (raw.plan) {
      domainEntity.plan = SubscriptionPlanMapper.toDomain(raw.plan);
    }

    domainEntity.MessageContent = raw.MessageContent;

    if (raw.receiver) {
      domainEntity.receiver = UserMapper.toDomain(raw.receiver);
    }

    if (raw.sender) {
      domainEntity.sender = UserMapper.toDomain(raw.sender);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Messages): MessagesEntity {
    const persistenceEntity = new MessagesEntity();
    persistenceEntity.sentAt = domainEntity.sentAt;

    if (domainEntity.plan) {
      persistenceEntity.plan = SubscriptionPlanMapper.toPersistence(
        domainEntity.plan,
      );
    }

    persistenceEntity.MessageContent = domainEntity.MessageContent;

    if (domainEntity.receiver) {
      persistenceEntity.receiver = UserMapper.toPersistence(
        domainEntity.receiver,
      );
    }

    if (domainEntity.sender) {
      persistenceEntity.sender = UserMapper.toPersistence(domainEntity.sender);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
