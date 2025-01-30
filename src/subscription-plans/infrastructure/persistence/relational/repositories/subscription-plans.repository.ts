import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SubscriptionPlansEntity } from '../entities/subscription-plans.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SubscriptionPlans } from '../../../../domain/subscription-plans';
import { SubscriptionPlansRepository } from '../../subscription-plans.repository';
import { SubscriptionPlansMapper } from '../mappers/subscription-plans.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SubscriptionPlansRelationalRepository
  implements SubscriptionPlansRepository
{
  constructor(
    @InjectRepository(SubscriptionPlansEntity)
    private readonly subscriptionPlansRepository: Repository<SubscriptionPlansEntity>,
  ) {}

  async create(data: SubscriptionPlans): Promise<SubscriptionPlans> {
    const persistenceModel = SubscriptionPlansMapper.toPersistence(data);
    const newEntity = await this.subscriptionPlansRepository.save(
      this.subscriptionPlansRepository.create(persistenceModel),
    );
    return SubscriptionPlansMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SubscriptionPlans[]> {
    const entities = await this.subscriptionPlansRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SubscriptionPlansMapper.toDomain(entity));
  }

  async findById(
    id: SubscriptionPlans['id'],
  ): Promise<NullableType<SubscriptionPlans>> {
    const entity = await this.subscriptionPlansRepository.findOne({
      where: { id },
    });

    return entity ? SubscriptionPlansMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SubscriptionPlans['id'][],
  ): Promise<SubscriptionPlans[]> {
    const entities = await this.subscriptionPlansRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SubscriptionPlansMapper.toDomain(entity));
  }

  async update(
    id: SubscriptionPlans['id'],
    payload: Partial<SubscriptionPlans>,
  ): Promise<SubscriptionPlans> {
    const entity = await this.subscriptionPlansRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.subscriptionPlansRepository.save(
      this.subscriptionPlansRepository.create(
        SubscriptionPlansMapper.toPersistence({
          ...SubscriptionPlansMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SubscriptionPlansMapper.toDomain(updatedEntity);
  }

  async remove(id: SubscriptionPlans['id']): Promise<void> {
    await this.subscriptionPlansRepository.delete(id);
  }
}
