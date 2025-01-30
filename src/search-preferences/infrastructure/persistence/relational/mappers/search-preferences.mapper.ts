import { SearchPreferences } from '../../../../domain/search-preferences';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SearchPreferencesEntity } from '../entities/search-preferences.entity';

export class SearchPreferencesMapper {
  static toDomain(raw: SearchPreferencesEntity): SearchPreferences {
    const domainEntity = new SearchPreferences();
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
    domainEntity: SearchPreferences,
  ): SearchPreferencesEntity {
    const persistenceEntity = new SearchPreferencesEntity();
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
