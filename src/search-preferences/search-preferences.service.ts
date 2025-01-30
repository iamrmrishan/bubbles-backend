import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateSearchPreferencesDto } from './dto/create-search-preferences.dto';
import { UpdateSearchPreferencesDto } from './dto/update-search-preferences.dto';
import { SearchPreferencesRepository } from './infrastructure/persistence/search-preferences.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SearchPreferences } from './domain/search-preferences';

@Injectable()
export class SearchPreferencesService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly searchPreferencesRepository: SearchPreferencesRepository,
  ) {}

  async create(createSearchPreferencesDto: CreateSearchPreferencesDto) {
    // Do not remove comment below.
    // <creating-property />

    const userObject = await this.userService.findById(
      createSearchPreferencesDto.user.id.toString(),
    );
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.searchPreferencesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      value: createSearchPreferencesDto.value,

      key: createSearchPreferencesDto.key,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.searchPreferencesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SearchPreferences['id']) {
    return this.searchPreferencesRepository.findById(id);
  }

  findByIds(ids: SearchPreferences['id'][]) {
    return this.searchPreferencesRepository.findByIds(ids);
  }

  async update(
    id: SearchPreferences['id'],

    updateSearchPreferencesDto: UpdateSearchPreferencesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | undefined = undefined;

    if (updateSearchPreferencesDto.user) {
      const userObject = await this.userService.findById(
        updateSearchPreferencesDto.user.id.toString(),
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.searchPreferencesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      value: updateSearchPreferencesDto.value,

      key: updateSearchPreferencesDto.key,

      user,
    });
  }

  remove(id: SearchPreferences['id']) {
    return this.searchPreferencesRepository.remove(id);
  }
}
