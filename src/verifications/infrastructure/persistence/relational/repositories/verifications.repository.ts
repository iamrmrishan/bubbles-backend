import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { VerificationsEntity } from '../entities/verifications.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Verifications } from '../../../../domain/verifications';
import { VerificationsRepository } from '../../verifications.repository';
import { VerificationsMapper } from '../mappers/verifications.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class VerificationsRelationalRepository
  implements VerificationsRepository
{
  constructor(
    @InjectRepository(VerificationsEntity)
    private readonly verificationsRepository: Repository<VerificationsEntity>,
  ) {}

  async create(data: Verifications): Promise<Verifications> {
    const persistenceModel = VerificationsMapper.toPersistence(data);
    const newEntity = await this.verificationsRepository.save(
      this.verificationsRepository.create(persistenceModel),
    );
    return VerificationsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Verifications[]> {
    const entities = await this.verificationsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => VerificationsMapper.toDomain(entity));
  }

  async findById(
    id: Verifications['id'],
  ): Promise<NullableType<Verifications>> {
    const entity = await this.verificationsRepository.findOne({
      where: { id },
    });

    return entity ? VerificationsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Verifications['id'][]): Promise<Verifications[]> {
    const entities = await this.verificationsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => VerificationsMapper.toDomain(entity));
  }

  async update(
    id: Verifications['id'],
    payload: Partial<Verifications>,
  ): Promise<Verifications> {
    const entity = await this.verificationsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.verificationsRepository.save(
      this.verificationsRepository.create(
        VerificationsMapper.toPersistence({
          ...VerificationsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return VerificationsMapper.toDomain(updatedEntity);
  }

  async remove(id: Verifications['id']): Promise<void> {
    await this.verificationsRepository.delete(id);
  }
}
