import { Content } from '../../../../domain/content';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { ContentEntity } from '../entities/content.entity';

export class ContentMapper {
  static toDomain(raw: ContentEntity): Content {
    const domainEntity = new Content();
    domainEntity.description = raw.description;
    domainEntity.title = raw.title;

    if (raw.creator) {
      domainEntity.creator = UserMapper.toDomain(raw.creator);
    }

    if (raw.media) {
      domainEntity.media = raw.media.map((file) => FileMapper.toDomain(file));
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Content): ContentEntity {
    const persistenceEntity = new ContentEntity();
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;

    if (domainEntity.creator) {
      persistenceEntity.creator = UserMapper.toPersistence(
        domainEntity.creator,
      );
    }

    if (domainEntity.media) {
      persistenceEntity.media = domainEntity.media.map((file) =>
        FileMapper.toPersistence(file),
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
