import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ContentReport } from '../../domain/content-report';

export abstract class ContentReportRepository {
  abstract create(
    data: Omit<ContentReport, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ContentReport>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ContentReport[]>;

  abstract findById(
    id: ContentReport['id'],
  ): Promise<NullableType<ContentReport>>;

  abstract findByIds(ids: ContentReport['id'][]): Promise<ContentReport[]>;

  abstract update(
    id: ContentReport['id'],
    payload: DeepPartial<ContentReport>,
  ): Promise<ContentReport | null>;

  abstract remove(id: ContentReport['id']): Promise<void>;
}
