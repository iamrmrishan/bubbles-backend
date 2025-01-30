import { SubscriptionPlansService } from '../subscription-plans/subscription-plans.service';
import { SubscriptionPlans } from '../subscription-plans/domain/subscription-plans';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto';
import { UpdateSubscriptionsDto } from './dto/update-subscriptions.dto';
import { SubscriptionsRepository } from './infrastructure/persistence/subscriptions.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Subscriptions } from './domain/subscriptions';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionPlansService: SubscriptionPlansService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly subscriptionsRepository: SubscriptionsRepository,
  ) {}

  async create(createSubscriptionsDto: CreateSubscriptionsDto) {
    // Do not remove comment below.
    // <creating-property />

    const planObject = await this.subscriptionPlansService.findById(
      createSubscriptionsDto.plan.id,
    );
    if (!planObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          plan: 'notExists',
        },
      });
    }
    const plan = planObject;

    const subscriberObject = await this.userService.findById(
      createSubscriptionsDto.subscriber.id.toString(),
    );
    if (!subscriberObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          subscriber: 'notExists',
        },
      });
    }
    const subscriber = subscriberObject;

    return this.subscriptionsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      endDate: createSubscriptionsDto.endDate,

      startDate: createSubscriptionsDto.startDate,

      status: createSubscriptionsDto.status,

      plan,

      subscriber,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.subscriptionsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Subscriptions['id']) {
    return this.subscriptionsRepository.findById(id);
  }

  findByIds(ids: Subscriptions['id'][]) {
    return this.subscriptionsRepository.findByIds(ids);
  }

  async update(
    id: Subscriptions['id'],

    updateSubscriptionsDto: UpdateSubscriptionsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let plan: SubscriptionPlans | undefined = undefined;

    if (updateSubscriptionsDto.plan) {
      const planObject = await this.subscriptionPlansService.findById(
        updateSubscriptionsDto.plan.id,
      );
      if (!planObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            plan: 'notExists',
          },
        });
      }
      plan = planObject;
    }

    let subscriber: User | undefined = undefined;

    if (updateSubscriptionsDto.subscriber) {
      const subscriberObject = await this.userService.findById(
        updateSubscriptionsDto.subscriber.id.toString(),
      );
      if (!subscriberObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            subscriber: 'notExists',
          },
        });
      }
      subscriber = subscriberObject;
    }

    return this.subscriptionsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      endDate: updateSubscriptionsDto.endDate,

      startDate: updateSubscriptionsDto.startDate,

      status: updateSubscriptionsDto.status,

      plan,

      subscriber,
    });
  }

  remove(id: Subscriptions['id']) {
    return this.subscriptionsRepository.remove(id);
  }
}
