import { CreatorAttributes } from '../../../../domain/creator-attributes';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { CreatorAttributesEntity } from '../entities/creator-attributes.entity';

export class CreatorAttributesMapper {
  static toDomain(raw: CreatorAttributesEntity): CreatorAttributes {
    const domainEntity = new CreatorAttributes();
    domainEntity.value = raw.value;

    domainEntity.key = raw.key;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: CreatorAttributes,
  ): CreatorAttributesEntity {
    const persistenceEntity = new CreatorAttributesEntity();
    persistenceEntity.value = domainEntity.value;

    persistenceEntity.key = domainEntity.key;

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
