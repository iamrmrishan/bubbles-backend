import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { StripeEntity } from '../entities/stripe.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Stripe } from '../../../../domain/stripe';
import { StripeRepository } from '../../stripe.repository';
import { StripeMapper } from '../mappers/stripe.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class StripeRelationalRepository implements StripeRepository {
  constructor(
    @InjectRepository(StripeEntity)
    private readonly stripeRepository: Repository<StripeEntity>,
  ) {}

  async create(data: Stripe): Promise<Stripe> {
    const persistenceModel = StripeMapper.toPersistence(data);
    const newEntity = await this.stripeRepository.save(
      this.stripeRepository.create(persistenceModel),
    );
    return StripeMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Stripe[]> {
    const entities = await this.stripeRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => StripeMapper.toDomain(entity));
  }

  async findById(id: Stripe['id']): Promise<NullableType<Stripe>> {
    const entity = await this.stripeRepository.findOne({
      where: { id },
    });

    return entity ? StripeMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Stripe['id'][]): Promise<Stripe[]> {
    const entities = await this.stripeRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => StripeMapper.toDomain(entity));
  }

  async update(id: Stripe['id'], payload: Partial<Stripe>): Promise<Stripe> {
    const entity = await this.stripeRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.stripeRepository.save(
      this.stripeRepository.create(
        StripeMapper.toPersistence({
          ...StripeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return StripeMapper.toDomain(updatedEntity);
  }

  async remove(id: Stripe['id']): Promise<void> {
    await this.stripeRepository.delete(id);
  }
}
