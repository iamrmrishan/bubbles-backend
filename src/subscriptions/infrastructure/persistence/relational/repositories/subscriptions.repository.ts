import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SubscriptionEntity } from '../entities/subscriptions.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Subscription } from '../../../../domain/subscriptions';
import {
  FindOneConditions,
  SubscriptionsRepository,
} from '../../subscriptions.repository';
import { SubscriptionMapper } from '../mappers/subscriptions.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SubscriptionsRelationalRepository
  implements SubscriptionsRepository
{
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionsRepository: Repository<SubscriptionEntity>,
  ) {}

  async create(data: Subscription): Promise<Subscription> {
    const persistenceModel = SubscriptionMapper.toPersistence(data);
    const newEntity = await this.subscriptionsRepository.save(
      this.subscriptionsRepository.create(persistenceModel),
    );
    return SubscriptionMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Subscription[]> {
    const entities = await this.subscriptionsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SubscriptionMapper.toDomain(entity));
  }

  async findOne(
    conditions: FindOneConditions,
  ): Promise<NullableType<Subscription>> {
    const entity = await this.subscriptionsRepository.findOne(conditions);

    return entity ? SubscriptionMapper.toDomain(entity) : null;
  }

  async findById(id: Subscription['id']): Promise<NullableType<Subscription>> {
    const entity = await this.subscriptionsRepository.findOne({
      where: { id },
    });

    return entity ? SubscriptionMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Subscription['id'][]): Promise<Subscription[]> {
    const entities = await this.subscriptionsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SubscriptionMapper.toDomain(entity));
  }

  async update(
    id: Subscription['id'],
    payload: Partial<Subscription>,
  ): Promise<Subscription> {
    const entity = await this.subscriptionsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.subscriptionsRepository.save(
      this.subscriptionsRepository.create(
        SubscriptionMapper.toPersistence({
          ...SubscriptionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SubscriptionMapper.toDomain(updatedEntity);
  }

  async remove(id: Subscription['id']): Promise<void> {
    await this.subscriptionsRepository.delete(id);
  }

  async findByPlanAndSubscriber(
    planId: string,
    subscriberId: string,
  ): Promise<NullableType<Subscription>> {
    const entity = await this.subscriptionsRepository.findOne({
      where: {
        plan: { id: planId },
        subscriber: { id: subscriberId },
      },
      order: {
        createdAt: 'DESC', // Get the most recent subscription
      },
    });

    return entity ? SubscriptionMapper.toDomain(entity) : null;
  }
}
