import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserBlocks } from '../../domain/user-blocks';

export abstract class UserBlocksRepository {
  abstract create(
    data: Omit<UserBlocks, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserBlocks>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserBlocks[]>;

  abstract findById(id: UserBlocks['id']): Promise<NullableType<UserBlocks>>;

  abstract findByIds(ids: UserBlocks['id'][]): Promise<UserBlocks[]>;

  abstract update(
    id: UserBlocks['id'],
    payload: DeepPartial<UserBlocks>,
  ): Promise<UserBlocks | null>;

  abstract remove(id: UserBlocks['id']): Promise<void>;
}
