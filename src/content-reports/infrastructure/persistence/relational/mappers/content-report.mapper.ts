import { ContentReport } from '../../../../domain/content-report';


import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { ContentReportEntity } from '../entities/content-report.entity';
import { ContentMapper } from '../../../../../contents/infrastructure/persistence/relational/mappers/content.mapper';

export class ContentReportMapper {
  static toDomain(raw: ContentReportEntity): ContentReport {
    const domainEntity = new ContentReport();
    domainEntity.resolutionNote = raw.resolutionNote;

    domainEntity.status = raw.status;

    domainEntity.reason = raw.reason;

    if (raw.contentId) {
      domainEntity.contentId = ContentMapper.toDomain(raw.contentId);
    }

    if (raw.reporterId) {
      domainEntity.reporterId = UserMapper.toDomain(raw.reporterId);
    } else if (raw.reporterId === null) {
      domainEntity.reporterId = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ContentReport): ContentReportEntity {
    const persistenceEntity = new ContentReportEntity();
    persistenceEntity.resolutionNote = domainEntity.resolutionNote;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.reason = domainEntity.reason;

    if (domainEntity.contentId) {
      persistenceEntity.contentId = ContentMapper.toPersistence(
        domainEntity.contentId,
      );
    }

    if (domainEntity.reporterId) {
      persistenceEntity.reporterId = UserMapper.toPersistence(
        domainEntity.reporterId,
      );
    } else if (domainEntity.reporterId === null) {
      persistenceEntity.reporterId = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
