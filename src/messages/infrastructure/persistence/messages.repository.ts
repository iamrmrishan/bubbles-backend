import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Messages } from '../../domain/messages';

export abstract class MessagesRepository {
  abstract create(
    data: Omit<Messages, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Messages>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Messages[]>;

  abstract findById(id: Messages['id']): Promise<NullableType<Messages>>;

  abstract findByIds(ids: Messages['id'][]): Promise<Messages[]>;

  abstract update(
    id: Messages['id'],
    payload: DeepPartial<Messages>,
  ): Promise<Messages | null>;

  abstract remove(id: Messages['id']): Promise<void>;
}
