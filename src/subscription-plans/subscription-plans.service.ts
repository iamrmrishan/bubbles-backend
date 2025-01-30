import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlansDto } from './dto/create-subscription-plans.dto';
import { UpdateSubscriptionPlansDto } from './dto/update-subscription-plans.dto';
import { SubscriptionPlansRepository } from './infrastructure/persistence/subscription-plans.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SubscriptionPlans } from './domain/subscription-plans';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly subscriptionPlansRepository: SubscriptionPlansRepository,
  ) {}

  async create(createSubscriptionPlansDto: CreateSubscriptionPlansDto) {
    // Do not remove comment below.
    // <creating-property />

    const userObject = await this.userService.findById(
      createSubscriptionPlansDto.user.id.toString(),
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

    return this.subscriptionPlansRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      duration: createSubscriptionPlansDto.duration,

      price: createSubscriptionPlansDto.price,

      description: createSubscriptionPlansDto.description,

      name: createSubscriptionPlansDto.name,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.subscriptionPlansRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SubscriptionPlans['id']) {
    return this.subscriptionPlansRepository.findById(id);
  }

  findByIds(ids: SubscriptionPlans['id'][]) {
    return this.subscriptionPlansRepository.findByIds(ids);
  }

  async update(
    id: SubscriptionPlans['id'],

    updateSubscriptionPlansDto: UpdateSubscriptionPlansDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | undefined = undefined;

    if (updateSubscriptionPlansDto.user) {
      const userObject = await this.userService.findById(
        updateSubscriptionPlansDto.user.id.toString(),
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

    return this.subscriptionPlansRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      duration: updateSubscriptionPlansDto.duration,

      price: updateSubscriptionPlansDto.price,

      description: updateSubscriptionPlansDto.description,

      name: updateSubscriptionPlansDto.name,

      user,
    });
  }

  remove(id: SubscriptionPlans['id']) {
    return this.subscriptionPlansRepository.remove(id);
  }
}
