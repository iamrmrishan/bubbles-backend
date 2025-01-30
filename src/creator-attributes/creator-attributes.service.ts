import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateCreatorAttributesDto } from './dto/create-creator-attributes.dto';
import { UpdateCreatorAttributesDto } from './dto/update-creator-attributes.dto';
import { CreatorAttributesRepository } from './infrastructure/persistence/creator-attributes.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CreatorAttributes } from './domain/creator-attributes';

@Injectable()
export class CreatorAttributesService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly creatorAttributesRepository: CreatorAttributesRepository,
  ) {}

  async create(createCreatorAttributesDto: CreateCreatorAttributesDto) {
    // Do not remove comment below.
    // <creating-property />

    const userObject = await this.userService.findById(
      createCreatorAttributesDto.user.id.toString(),
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

    return this.creatorAttributesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      value: createCreatorAttributesDto.value,

      key: createCreatorAttributesDto.key,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.creatorAttributesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: CreatorAttributes['id']) {
    return this.creatorAttributesRepository.findById(id);
  }

  findByIds(ids: CreatorAttributes['id'][]) {
    return this.creatorAttributesRepository.findByIds(ids);
  }

  async update(
    id: CreatorAttributes['id'],

    updateCreatorAttributesDto: UpdateCreatorAttributesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | undefined = undefined;

    if (updateCreatorAttributesDto.user) {
      const userObject = await this.userService.findById(
        updateCreatorAttributesDto.user.id.toString(),
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

    return this.creatorAttributesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      value: updateCreatorAttributesDto.value,

      key: updateCreatorAttributesDto.key,

      user,
    });
  }

  remove(id: CreatorAttributes['id']) {
    return this.creatorAttributesRepository.remove(id);
  }
}
