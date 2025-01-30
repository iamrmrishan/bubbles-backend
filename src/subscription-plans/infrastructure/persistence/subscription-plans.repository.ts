import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SubscriptionPlans } from '../../domain/subscription-plans';

export abstract class SubscriptionPlansRepository {
  abstract create(
    data: Omit<SubscriptionPlans, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SubscriptionPlans>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SubscriptionPlans[]>;

  abstract findById(
    id: SubscriptionPlans['id'],
  ): Promise<NullableType<SubscriptionPlans>>;

  abstract findByIds(
    ids: SubscriptionPlans['id'][],
  ): Promise<SubscriptionPlans[]>;

  abstract update(
    id: SubscriptionPlans['id'],
    payload: DeepPartial<SubscriptionPlans>,
  ): Promise<SubscriptionPlans | null>;

  abstract remove(id: SubscriptionPlans['id']): Promise<void>;
}
