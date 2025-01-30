import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreatorAttributesEntity } from '../entities/creator-attributes.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CreatorAttributes } from '../../../../domain/creator-attributes';
import { CreatorAttributesRepository } from '../../creator-attributes.repository';
import { CreatorAttributesMapper } from '../mappers/creator-attributes.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CreatorAttributesRelationalRepository
  implements CreatorAttributesRepository
{
  constructor(
    @InjectRepository(CreatorAttributesEntity)
    private readonly creatorAttributesRepository: Repository<CreatorAttributesEntity>,
  ) {}

  async create(data: CreatorAttributes): Promise<CreatorAttributes> {
    const persistenceModel = CreatorAttributesMapper.toPersistence(data);
    const newEntity = await this.creatorAttributesRepository.save(
      this.creatorAttributesRepository.create(persistenceModel),
    );
    return CreatorAttributesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CreatorAttributes[]> {
    const entities = await this.creatorAttributesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CreatorAttributesMapper.toDomain(entity));
  }

  async findById(
    id: CreatorAttributes['id'],
  ): Promise<NullableType<CreatorAttributes>> {
    const entity = await this.creatorAttributesRepository.findOne({
      where: { id },
    });

    return entity ? CreatorAttributesMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: CreatorAttributes['id'][],
  ): Promise<CreatorAttributes[]> {
    const entities = await this.creatorAttributesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CreatorAttributesMapper.toDomain(entity));
  }

  async update(
    id: CreatorAttributes['id'],
    payload: Partial<CreatorAttributes>,
  ): Promise<CreatorAttributes> {
    const entity = await this.creatorAttributesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.creatorAttributesRepository.save(
      this.creatorAttributesRepository.create(
        CreatorAttributesMapper.toPersistence({
          ...CreatorAttributesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CreatorAttributesMapper.toDomain(updatedEntity);
  }

  async remove(id: CreatorAttributes['id']): Promise<void> {
    await this.creatorAttributesRepository.delete(id);
  }
}
