import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ContentAttributes } from '../../domain/content-attributes';

export abstract class ContentAttributesRepository {
  abstract create(
    data: Omit<ContentAttributes, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ContentAttributes>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ContentAttributes[]>;

  abstract findById(
    id: ContentAttributes['id'],
  ): Promise<NullableType<ContentAttributes>>;

  abstract findByIds(
    ids: ContentAttributes['id'][],
  ): Promise<ContentAttributes[]>;

  abstract update(
    id: ContentAttributes['id'],
    payload: DeepPartial<ContentAttributes>,
  ): Promise<ContentAttributes | null>;

  abstract remove(id: ContentAttributes['id']): Promise<void>;
}
