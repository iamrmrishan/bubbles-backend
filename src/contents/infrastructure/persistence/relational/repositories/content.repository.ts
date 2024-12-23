import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ContentEntity } from '../entities/content.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Content } from '../../../../domain/content';
import { ContentRepository } from '../../content.repository';
import { ContentMapper } from '../mappers/content.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ContentRelationalRepository implements ContentRepository {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
  ) {}

  async create(data: Content): Promise<Content> {
    const persistenceModel = ContentMapper.toPersistence(data);
    const newEntity = await this.contentRepository.save(
      this.contentRepository.create(persistenceModel),
    );
    return ContentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Content[]> {
    const entities = await this.contentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ContentMapper.toDomain(entity));
  }

  async findById(id: Content['id']): Promise<NullableType<Content>> {
    const entity = await this.contentRepository.findOne({
      where: { id },
    });

    return entity ? ContentMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Content['id'][]): Promise<Content[]> {
    const entities = await this.contentRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ContentMapper.toDomain(entity));
  }

  async update(id: Content['id'], payload: Partial<Content>): Promise<Content> {
    const entity = await this.contentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.contentRepository.save(
      this.contentRepository.create(
        ContentMapper.toPersistence({
          ...ContentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ContentMapper.toDomain(updatedEntity);
  }

  async remove(id: Content['id']): Promise<void> {
    await this.contentRepository.delete(id);
  }
}
