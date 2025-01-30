import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CreatorAttributes } from '../../domain/creator-attributes';

export abstract class CreatorAttributesRepository {
  abstract create(
    data: Omit<CreatorAttributes, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CreatorAttributes>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CreatorAttributes[]>;

  abstract findById(
    id: CreatorAttributes['id'],
  ): Promise<NullableType<CreatorAttributes>>;

  abstract findByIds(
    ids: CreatorAttributes['id'][],
  ): Promise<CreatorAttributes[]>;

  abstract update(
    id: CreatorAttributes['id'],
    payload: DeepPartial<CreatorAttributes>,
  ): Promise<CreatorAttributes | null>;

  abstract remove(id: CreatorAttributes['id']): Promise<void>;
}
