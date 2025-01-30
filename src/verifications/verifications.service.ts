import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateVerificationsDto } from './dto/create-verifications.dto';
import { UpdateVerificationsDto } from './dto/update-verifications.dto';
import { VerificationsRepository } from './infrastructure/persistence/verifications.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Verifications } from './domain/verifications';

@Injectable()
export class VerificationsService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly verificationsRepository: VerificationsRepository,
  ) {}

  async create(createVerificationsDto: CreateVerificationsDto) {
    // Do not remove comment below.
    // <creating-property />
    const userObject = await this.userService.findById(
      createVerificationsDto.user.id.toString(),
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

    return this.verificationsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.verificationsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Verifications['id']) {
    return this.verificationsRepository.findById(id);
  }

  findByIds(ids: Verifications['id'][]) {
    return this.verificationsRepository.findByIds(ids);
  }

  async update(
    id: Verifications['id'],

    updateVerificationsDto: UpdateVerificationsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let user: User | undefined = undefined;

    if (updateVerificationsDto.user) {
      const userObject = await this.userService.findById(
        updateVerificationsDto.user.id.toString(),
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

    return this.verificationsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      user,
    });
  }

  remove(id: Verifications['id']) {
    return this.verificationsRepository.remove(id);
  }
}
