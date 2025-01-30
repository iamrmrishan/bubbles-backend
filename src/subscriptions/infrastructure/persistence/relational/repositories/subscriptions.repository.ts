import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SubscriptionsEntity } from '../entities/subscriptions.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Subscriptions } from '../../../../domain/subscriptions';
import { SubscriptionsRepository } from '../../subscriptions.repository';
import { SubscriptionsMapper } from '../mappers/subscriptions.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SubscriptionsRelationalRepository
  implements SubscriptionsRepository
{
  constructor(
    @InjectRepository(SubscriptionsEntity)
    private readonly subscriptionsRepository: Repository<SubscriptionsEntity>,
  ) {}

  async create(data: Subscriptions): Promise<Subscriptions> {
    const persistenceModel = SubscriptionsMapper.toPersistence(data);
    const newEntity = await this.subscriptionsRepository.save(
      this.subscriptionsRepository.create(persistenceModel),
    );
    return SubscriptionsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Subscriptions[]> {
    const entities = await this.subscriptionsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SubscriptionsMapper.toDomain(entity));
  }

  async findById(
    id: Subscriptions['id'],
  ): Promise<NullableType<Subscriptions>> {
    const entity = await this.subscriptionsRepository.findOne({
      where: { id },
    });

    return entity ? SubscriptionsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Subscriptions['id'][]): Promise<Subscriptions[]> {
    const entities = await this.subscriptionsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SubscriptionsMapper.toDomain(entity));
  }

  async update(
    id: Subscriptions['id'],
    payload: Partial<Subscriptions>,
  ): Promise<Subscriptions> {
    const entity = await this.subscriptionsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.subscriptionsRepository.save(
      this.subscriptionsRepository.create(
        SubscriptionsMapper.toPersistence({
          ...SubscriptionsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SubscriptionsMapper.toDomain(updatedEntity);
  }

  async remove(id: Subscriptions['id']): Promise<void> {
    await this.subscriptionsRepository.delete(id);
  }
}
