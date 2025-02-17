import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindManyOptions } from 'typeorm';
import { SubscriptionPlanEntity } from '../entities/subscription-plans.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SubscriptionPlan } from '../../../../domain/subscription-plans';
import { SubscriptionPlansRepository } from '../../subscription-plans.repository';
import { SubscriptionPlanMapper } from '../mappers/subscription-plans.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SubscriptionPlansRelationalRepository
  implements SubscriptionPlansRepository
{
  constructor(
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionPlansRepository: Repository<SubscriptionPlanEntity>,
  ) {}

  async create(data: SubscriptionPlan): Promise<SubscriptionPlan> {
    const persistenceModel = SubscriptionPlanMapper.toPersistence(data);

    const newEntity = await this.subscriptionPlansRepository.save(
      this.subscriptionPlansRepository.create({
        name: persistenceModel.name,
        description: persistenceModel.description,
        price: persistenceModel.price,
        duration: persistenceModel.duration,
        stripeProductId: persistenceModel.stripeProductId,
        stripePriceId: persistenceModel.stripePriceId,
        creatorId: persistenceModel.creatorId,
      }),
    );

    return SubscriptionPlanMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SubscriptionPlan[]> {
    const entities = await this.subscriptionPlansRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SubscriptionPlanMapper.toDomain(entity));
  }

  async find(options: FindManyOptions): Promise<SubscriptionPlan[]> {
    const entities = await this.subscriptionPlansRepository.find({
      where: options.where,
      order: options.order,
      take: options.take,
      skip: options.skip,
    });

    return entities.map((entity) => SubscriptionPlanMapper.toDomain(entity));
  }

  async findById(
    id: SubscriptionPlan['id'],
  ): Promise<NullableType<SubscriptionPlan>> {
    const entity = await this.subscriptionPlansRepository.findOne({
      where: { id },
    });

    return entity ? SubscriptionPlanMapper.toDomain(entity) : null;
  }

  async findByIds(ids: SubscriptionPlan['id'][]): Promise<SubscriptionPlan[]> {
    const entities = await this.subscriptionPlansRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SubscriptionPlanMapper.toDomain(entity));
  }

  async update(
    id: SubscriptionPlan['id'],
    payload: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan> {
    const entity = await this.subscriptionPlansRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.subscriptionPlansRepository.save(
      this.subscriptionPlansRepository.create(
        SubscriptionPlanMapper.toPersistence({
          ...SubscriptionPlanMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SubscriptionPlanMapper.toDomain(updatedEntity);
  }

  async remove(id: SubscriptionPlan['id']): Promise<void> {
    await this.subscriptionPlansRepository.delete(id);
  }
}
