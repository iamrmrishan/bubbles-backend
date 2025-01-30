import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Verifications } from '../../domain/verifications';

export abstract class VerificationsRepository {
  abstract create(
    data: Omit<Verifications, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Verifications>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Verifications[]>;

  abstract findById(
    id: Verifications['id'],
  ): Promise<NullableType<Verifications>>;

  abstract findByIds(ids: Verifications['id'][]): Promise<Verifications[]>;

  abstract update(
    id: Verifications['id'],
    payload: DeepPartial<Verifications>,
  ): Promise<Verifications | null>;

  abstract remove(id: Verifications['id']): Promise<void>;
}
