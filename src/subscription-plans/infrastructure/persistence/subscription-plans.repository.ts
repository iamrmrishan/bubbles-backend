import { FindManyOptions } from 'typeorm';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SubscriptionPlan } from '../../domain/subscription-plans';

export abstract class SubscriptionPlansRepository {
  abstract create(
    data: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SubscriptionPlan>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SubscriptionPlan[]>;

  abstract find(options: FindManyOptions): Promise<SubscriptionPlan[]>;

  abstract findById(
    id: SubscriptionPlan['id'],
  ): Promise<NullableType<SubscriptionPlan>>;

  abstract findByIds(
    ids: SubscriptionPlan['id'][],
  ): Promise<SubscriptionPlan[]>;

  abstract update(
    id: SubscriptionPlan['id'],
    payload: DeepPartial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan | null>;

  abstract remove(id: SubscriptionPlan['id']): Promise<void>;
}
