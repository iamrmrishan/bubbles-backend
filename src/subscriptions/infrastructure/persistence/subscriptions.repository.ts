import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Subscriptions } from '../../domain/subscriptions';

export abstract class SubscriptionsRepository {
  abstract create(
    data: Omit<Subscriptions, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Subscriptions>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Subscriptions[]>;

  abstract findById(
    id: Subscriptions['id'],
  ): Promise<NullableType<Subscriptions>>;

  abstract findByIds(ids: Subscriptions['id'][]): Promise<Subscriptions[]>;

  abstract update(
    id: Subscriptions['id'],
    payload: DeepPartial<Subscriptions>,
  ): Promise<Subscriptions | null>;

  abstract remove(id: Subscriptions['id']): Promise<void>;
}
