import { UserBlocks } from '../../../../domain/user-blocks';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { UserBlocksEntity } from '../entities/user-blocks.entity';

export class UserBlocksMapper {
  static toDomain(raw: UserBlocksEntity): UserBlocks {
    const domainEntity = new UserBlocks();
    if (raw.blocker) {
      domainEntity.blocker = UserMapper.toDomain(raw.blocker);
    } else if (raw.blocker === null) {
      domainEntity.blocker = null;
    }

    if (raw.blockedId) {
      domainEntity.blockedId = UserMapper.toDomain(raw.blockedId);
    } else if (raw.blockedId === null) {
      domainEntity.blockedId = null;
    }

    if (raw.blockerId) {
      domainEntity.blockerId = raw.blockerId.map((item) =>
        UserMapper.toDomain(item),
      );
    } else if (raw.blockerId === null) {
      domainEntity.blockerId = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: UserBlocks): UserBlocksEntity {
    const persistenceEntity = new UserBlocksEntity();
    if (domainEntity.blocker) {
      persistenceEntity.blocker = UserMapper.toPersistence(
        domainEntity.blocker,
      );
    } else if (domainEntity.blocker === null) {
      persistenceEntity.blocker = null;
    }

    if (domainEntity.blockedId) {
      persistenceEntity.blockedId = UserMapper.toPersistence(
        domainEntity.blockedId,
      );
    } else if (domainEntity.blockedId === null) {
      persistenceEntity.blockedId = null;
    }

    if (domainEntity.blockerId) {
      persistenceEntity.blockerId = domainEntity.blockerId.map((item) =>
        UserMapper.toPersistence(item),
      );
    } else if (domainEntity.blockerId === null) {
      persistenceEntity.blockerId = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
