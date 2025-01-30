import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SearchPreferences } from '../../domain/search-preferences';

export abstract class SearchPreferencesRepository {
  abstract create(
    data: Omit<SearchPreferences, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SearchPreferences>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SearchPreferences[]>;

  abstract findById(
    id: SearchPreferences['id'],
  ): Promise<NullableType<SearchPreferences>>;

  abstract findByIds(
    ids: SearchPreferences['id'][],
  ): Promise<SearchPreferences[]>;

  abstract update(
    id: SearchPreferences['id'],
    payload: DeepPartial<SearchPreferences>,
  ): Promise<SearchPreferences | null>;

  abstract remove(id: SearchPreferences['id']): Promise<void>;
}
