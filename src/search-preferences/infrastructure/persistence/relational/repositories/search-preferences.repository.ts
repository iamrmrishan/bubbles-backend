import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SearchPreferencesEntity } from '../entities/search-preferences.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SearchPreferences } from '../../../../domain/search-preferences';
import { SearchPreferencesRepository } from '../../search-preferences.repository';
import { SearchPreferencesMapper } from '../mappers/search-preferences.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SearchPreferencesRelationalRepository
  implements SearchPreferencesRepository
{
  constructor(
    @InjectRepository(SearchPreferencesEntity)
    private readonly searchPreferencesRepository: Repository<SearchPreferencesEntity>,
  ) {}

  async create(data: SearchPreferences): Promise<SearchPreferences> {
    const persistenceModel = SearchPreferencesMapper.toPersistence(data);
    const newEntity = await this.searchPreferencesRepository.save(
      this.searchPreferencesRepository.create(persistenceModel),
    );
    return SearchPreferencesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SearchPreferences[]> {
    const entities = await this.searchPreferencesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SearchPreferencesMapper.toDomain(entity));
  }

  async findById(
    id: SearchPreferences['id'],
  ): Promise<NullableType<SearchPreferences>> {
    const entity = await this.searchPreferencesRepository.findOne({
      where: { id },
    });

    return entity ? SearchPreferencesMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SearchPreferences['id'][],
  ): Promise<SearchPreferences[]> {
    const entities = await this.searchPreferencesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SearchPreferencesMapper.toDomain(entity));
  }

  async update(
    id: SearchPreferences['id'],
    payload: Partial<SearchPreferences>,
  ): Promise<SearchPreferences> {
    const entity = await this.searchPreferencesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.searchPreferencesRepository.save(
      this.searchPreferencesRepository.create(
        SearchPreferencesMapper.toPersistence({
          ...SearchPreferencesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SearchPreferencesMapper.toDomain(updatedEntity);
  }

  async remove(id: SearchPreferences['id']): Promise<void> {
    await this.searchPreferencesRepository.delete(id);
  }
}
