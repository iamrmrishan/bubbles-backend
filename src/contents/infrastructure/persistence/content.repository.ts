import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Content } from '../../domain/content';

export abstract class ContentRepository {
  abstract create(
    data: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Content>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Content[]>;

  abstract findById(id: Content['id']): Promise<NullableType<Content>>;

  abstract findByIds(ids: Content['id'][]): Promise<Content[]>;

  abstract update(
    id: Content['id'],
    payload: DeepPartial<Content>,
  ): Promise<Content | null>;

  abstract remove(id: Content['id']): Promise<void>;
}
