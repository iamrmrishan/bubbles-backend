import { Verifications } from '../../../../domain/verifications';

import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { VerificationsEntity } from '../entities/verifications.entity';

export class VerificationsMapper {
  static toDomain(raw: VerificationsEntity): Verifications {
    const domainEntity = new Verifications();
    domainEntity.verifiedBy = raw.verifiedBy;

    domainEntity.verifiedAt = raw.verifiedAt;

    domainEntity.isVerified = raw.isVerified;

    domainEntity.rejectionReason = raw.rejectionReason;

    domainEntity.status = raw.status;

    if (raw.selfieWithId) {
      domainEntity.selfieWithId = FileMapper.toDomain(raw.selfieWithId);
    }

    if (raw.idDocument) {
      domainEntity.idDocument = FileMapper.toDomain(raw.idDocument);
    }

    domainEntity.address = raw.address;

    domainEntity.state = raw.state;

    domainEntity.country = raw.country;

    domainEntity.dateOfBirth = raw.dateOfBirth;

    domainEntity.fullName = raw.fullName;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Verifications): VerificationsEntity {
    const persistenceEntity = new VerificationsEntity();
    persistenceEntity.verifiedBy = domainEntity.verifiedBy;

    persistenceEntity.verifiedAt = domainEntity.verifiedAt;

    persistenceEntity.isVerified = domainEntity.isVerified;

    persistenceEntity.rejectionReason = domainEntity.rejectionReason;

    persistenceEntity.status = domainEntity.status;

    if (domainEntity.selfieWithId) {
      persistenceEntity.selfieWithId = FileMapper.toPersistence(
        domainEntity.selfieWithId,
      );
    }

    if (domainEntity.idDocument) {
      persistenceEntity.idDocument = FileMapper.toPersistence(
        domainEntity.idDocument,
      );
    }

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.state = domainEntity.state;

    persistenceEntity.country = domainEntity.country;

    persistenceEntity.dateOfBirth = domainEntity.dateOfBirth;

    persistenceEntity.fullName = domainEntity.fullName;

    if (domainEntity.user) {
      console.log(persistenceEntity.user, 'this is entity user');
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
      console.log(persistenceEntity.user, 'this is entity new user');
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
