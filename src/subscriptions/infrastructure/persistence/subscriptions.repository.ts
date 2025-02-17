import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Subscription } from '../../domain/subscriptions';

export interface FindOneConditions {
  where: Record<string, any>;
}

export abstract class SubscriptionsRepository {
  abstract create(
    data: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Subscription>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Subscription[]>;

  abstract findById(
    id: Subscription['id'],
  ): Promise<NullableType<Subscription>>;

  abstract findByIds(ids: Subscription['id'][]): Promise<Subscription[]>;

  abstract update(
    id: Subscription['id'],
    payload: DeepPartial<Subscription>,
  ): Promise<Subscription | null>;

  abstract findByPlanAndSubscriber(
    planId: string,
    subscriberId: string,
  ): Promise<NullableType<Subscription>>;

  abstract findOne(
    conditions: FindOneConditions,
  ): Promise<NullableType<Subscription>>;

  abstract remove(id: Subscription['id']): Promise<void>;
}
