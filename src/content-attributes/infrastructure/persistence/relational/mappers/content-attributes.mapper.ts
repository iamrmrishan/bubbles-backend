import { ContentAttributes } from '../../../../domain/content-attributes';

import { ContentMapper } from '../../../../../contents/infrastructure/persistence/relational/mappers/content.mapper';

import { ContentAttributesEntity } from '../entities/content-attributes.entity';

export class ContentAttributesMapper {
  static toDomain(raw: ContentAttributesEntity): ContentAttributes {
    const domainEntity = new ContentAttributes();
    domainEntity.value = raw.value;

    domainEntity.key = raw.key;

    if (raw.content) {
      domainEntity.content = ContentMapper.toDomain(raw.content);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: ContentAttributes,
  ): ContentAttributesEntity {
    const persistenceEntity = new ContentAttributesEntity();
    persistenceEntity.value = domainEntity.value;

    persistenceEntity.key = domainEntity.key;

    if (domainEntity.content) {
      persistenceEntity.content = ContentMapper.toPersistence(
        domainEntity.content,
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
