import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ContentAttributesEntity } from '../entities/content-attributes.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ContentAttributes } from '../../../../domain/content-attributes';
import { ContentAttributesRepository } from '../../content-attributes.repository';
import { ContentAttributesMapper } from '../mappers/content-attributes.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ContentAttributesRelationalRepository
  implements ContentAttributesRepository
{
  constructor(
    @InjectRepository(ContentAttributesEntity)
    private readonly contentAttributesRepository: Repository<ContentAttributesEntity>,
  ) {}

  async create(data: ContentAttributes): Promise<ContentAttributes> {
    const persistenceModel = ContentAttributesMapper.toPersistence(data);
    const newEntity = await this.contentAttributesRepository.save(
      this.contentAttributesRepository.create(persistenceModel),
    );
    return ContentAttributesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ContentAttributes[]> {
    const entities = await this.contentAttributesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ContentAttributesMapper.toDomain(entity));
  }

  async findById(
    id: ContentAttributes['id'],
  ): Promise<NullableType<ContentAttributes>> {
    const entity = await this.contentAttributesRepository.findOne({
      where: { id },
    });

    return entity ? ContentAttributesMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: ContentAttributes['id'][],
  ): Promise<ContentAttributes[]> {
    const entities = await this.contentAttributesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ContentAttributesMapper.toDomain(entity));
  }

  async update(
    id: ContentAttributes['id'],
    payload: Partial<ContentAttributes>,
  ): Promise<ContentAttributes> {
    const entity = await this.contentAttributesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.contentAttributesRepository.save(
      this.contentAttributesRepository.create(
        ContentAttributesMapper.toPersistence({
          ...ContentAttributesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ContentAttributesMapper.toDomain(updatedEntity);
  }

  async remove(id: ContentAttributes['id']): Promise<void> {
    await this.contentAttributesRepository.delete(id);
  }
}
