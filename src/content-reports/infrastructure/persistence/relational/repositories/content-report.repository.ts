import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ContentReportEntity } from '../entities/content-report.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ContentReport } from '../../../../domain/content-report';
import { ContentReportRepository } from '../../content-report.repository';
import { ContentReportMapper } from '../mappers/content-report.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ContentReportRelationalRepository
  implements ContentReportRepository
{
  constructor(
    @InjectRepository(ContentReportEntity)
    private readonly contentReportRepository: Repository<ContentReportEntity>,
  ) {}

  async create(data: ContentReport): Promise<ContentReport> {
    const persistenceModel = ContentReportMapper.toPersistence(data);
    const newEntity = await this.contentReportRepository.save(
      this.contentReportRepository.create(persistenceModel),
    );
    return ContentReportMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ContentReport[]> {
    const entities = await this.contentReportRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ContentReportMapper.toDomain(entity));
  }

  async findById(
    id: ContentReport['id'],
  ): Promise<NullableType<ContentReport>> {
    const entity = await this.contentReportRepository.findOne({
      where: { id },
    });

    return entity ? ContentReportMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ContentReport['id'][]): Promise<ContentReport[]> {
    const entities = await this.contentReportRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ContentReportMapper.toDomain(entity));
  }

  async update(
    id: ContentReport['id'],
    payload: Partial<ContentReport>,
  ): Promise<ContentReport> {
    const entity = await this.contentReportRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.contentReportRepository.save(
      this.contentReportRepository.create(
        ContentReportMapper.toPersistence({
          ...ContentReportMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ContentReportMapper.toDomain(updatedEntity);
  }

  async remove(id: ContentReport['id']): Promise<void> {
    await this.contentReportRepository.delete(id);
  }
}
