import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserBlocksEntity } from '../entities/user-blocks.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserBlocks } from '../../../../domain/user-blocks';
import { UserBlocksRepository } from '../../user-blocks.repository';
import { UserBlocksMapper } from '../mappers/user-blocks.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserBlocksRelationalRepository implements UserBlocksRepository {
  constructor(
    @InjectRepository(UserBlocksEntity)
    private readonly userBlocksRepository: Repository<UserBlocksEntity>,
  ) {}

  async create(data: UserBlocks): Promise<UserBlocks> {
    const persistenceModel = UserBlocksMapper.toPersistence(data);
    const newEntity = await this.userBlocksRepository.save(
      this.userBlocksRepository.create(persistenceModel),
    );
    return UserBlocksMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserBlocks[]> {
    const entities = await this.userBlocksRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => UserBlocksMapper.toDomain(entity));
  }

  async findById(id: UserBlocks['id']): Promise<NullableType<UserBlocks>> {
    const entity = await this.userBlocksRepository.findOne({
      where: { id },
    });

    return entity ? UserBlocksMapper.toDomain(entity) : null;
  }

  async findByIds(ids: UserBlocks['id'][]): Promise<UserBlocks[]> {
    const entities = await this.userBlocksRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => UserBlocksMapper.toDomain(entity));
  }

  async update(
    id: UserBlocks['id'],
    payload: Partial<UserBlocks>,
  ): Promise<UserBlocks> {
    const entity = await this.userBlocksRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.userBlocksRepository.save(
      this.userBlocksRepository.create(
        UserBlocksMapper.toPersistence({
          ...UserBlocksMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserBlocksMapper.toDomain(updatedEntity);
  }

  async remove(id: UserBlocks['id']): Promise<void> {
    await this.userBlocksRepository.delete(id);
  }
}
