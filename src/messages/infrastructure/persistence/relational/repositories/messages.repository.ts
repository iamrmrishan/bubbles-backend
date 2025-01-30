import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MessagesEntity } from '../entities/messages.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Messages } from '../../../../domain/messages';
import { MessagesRepository } from '../../messages.repository';
import { MessagesMapper } from '../mappers/messages.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class MessagesRelationalRepository implements MessagesRepository {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
  ) {}

  async create(data: Messages): Promise<Messages> {
    const persistenceModel = MessagesMapper.toPersistence(data);
    const newEntity = await this.messagesRepository.save(
      this.messagesRepository.create(persistenceModel),
    );
    return MessagesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Messages[]> {
    const entities = await this.messagesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => MessagesMapper.toDomain(entity));
  }

  async findById(id: Messages['id']): Promise<NullableType<Messages>> {
    const entity = await this.messagesRepository.findOne({
      where: { id },
    });

    return entity ? MessagesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Messages['id'][]): Promise<Messages[]> {
    const entities = await this.messagesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => MessagesMapper.toDomain(entity));
  }

  async update(
    id: Messages['id'],
    payload: Partial<Messages>,
  ): Promise<Messages> {
    const entity = await this.messagesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.messagesRepository.save(
      this.messagesRepository.create(
        MessagesMapper.toPersistence({
          ...MessagesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MessagesMapper.toDomain(updatedEntity);
  }

  async remove(id: Messages['id']): Promise<void> {
    await this.messagesRepository.delete(id);
  }
}
