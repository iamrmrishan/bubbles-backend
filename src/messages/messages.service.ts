import { SubscriptionPlansService } from '../subscription-plans/subscription-plans.service';
import { SubscriptionPlan } from '../subscription-plans/domain/subscription-plans';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { MessagesRepository } from './infrastructure/persistence/messages.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Messages } from './domain/messages';

@Injectable()
export class MessagesService {
  constructor(
    private readonly subscriptionPlansService: SubscriptionPlansService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly messagesRepository: MessagesRepository,
  ) {}

  async create(createMessagesDto: CreateMessagesDto) {
    // Do not remove comment below.
    // <creating-property />

    const planObject = await this.subscriptionPlansService.findById(
      createMessagesDto.plan.id,
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

    const receiverObject = await this.userService.findById(
      createMessagesDto.receiver.id.toString(),
    );
    if (!receiverObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          receiver: 'notExists',
        },
      });
    }
    const receiver = receiverObject;

    const senderObject = await this.userService.findById(
      createMessagesDto.sender.id.toString(),
    );
    if (!senderObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          sender: 'notExists',
        },
      });
    }
    const sender = senderObject;

    return this.messagesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      sentAt: createMessagesDto.sentAt,

      plan,

      MessageContent: createMessagesDto.MessageContent,

      receiver,

      sender,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.messagesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Messages['id']) {
    return this.messagesRepository.findById(id);
  }

  findByIds(ids: Messages['id'][]) {
    return this.messagesRepository.findByIds(ids);
  }

  async update(
    id: Messages['id'],

    updateMessagesDto: UpdateMessagesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let plan: SubscriptionPlan | undefined = undefined;

    if (updateMessagesDto.plan) {
      const planObject = await this.subscriptionPlansService.findById(
        updateMessagesDto.plan.id,
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

    let receiver: User | undefined = undefined;

    if (updateMessagesDto.receiver) {
      const receiverObject = await this.userService.findById(
        updateMessagesDto.receiver.id.toString(),
      );
      if (!receiverObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            receiver: 'notExists',
          },
        });
      }
      receiver = receiverObject;
    }

    let sender: User | undefined = undefined;

    if (updateMessagesDto.sender) {
      const senderObject = await this.userService.findById(
        updateMessagesDto.sender.id.toString(),
      );
      if (!senderObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            sender: 'notExists',
          },
        });
      }
      sender = senderObject;
    }

    return this.messagesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      sentAt: updateMessagesDto.sentAt,

      plan,

      MessageContent: updateMessagesDto.MessageContent,

      receiver,

      sender,
    });
  }

  remove(id: Messages['id']) {
    return this.messagesRepository.remove(id);
  }
}
