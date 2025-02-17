import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Stripe } from '../../domain/stripe';

export abstract class StripeRepository {
  abstract create(
    data: Omit<Stripe, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Stripe>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Stripe[]>;

  abstract findById(id: Stripe['id']): Promise<NullableType<Stripe>>;

  abstract findByIds(ids: Stripe['id'][]): Promise<Stripe[]>;

  abstract update(
    id: Stripe['id'],
    payload: DeepPartial<Stripe>,
  ): Promise<Stripe | null>;

  abstract remove(id: Stripe['id']): Promise<void>;
}
