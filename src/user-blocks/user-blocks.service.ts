import { UsersService } from '../users/users.service';
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateUserBlocksDto } from './dto/create-user-blocks.dto';
import { UpdateUserBlocksDto } from './dto/update-user-blocks.dto';
import { UserBlocksRepository } from './infrastructure/persistence/user-blocks.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserBlocks } from './domain/user-blocks';
import { User } from '../users/domain/user';

@Injectable()
export class UserBlocksService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly userBlocksRepository: UserBlocksRepository,
  ) {}

  async create(createUserBlocksDto: CreateUserBlocksDto) {
    // Do not remove comment below.
    // <creating-property />
    let blocker: User | null | undefined = undefined;

    if (createUserBlocksDto.blocker) {
      const blockerObject = await this.userService.findById(
        createUserBlocksDto.blocker.id.toString(),
      );
      if (!blockerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            blocker: 'notExists',
          },
        });
      }
      blocker = blockerObject;
    } else if (createUserBlocksDto.blocker === null) {
      blocker = null;
    }

    let blockedId: User | null | undefined = undefined;

    if (createUserBlocksDto.blockedId) {
      const blockedIdObject = await this.userService.findById(
        createUserBlocksDto.blockedId.id.toString(),
      );
      if (!blockedIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            blockedId: 'notExists',
          },
        });
      }
      blockedId = blockedIdObject;
    } else if (createUserBlocksDto.blockedId === null) {
      blockedId = null;
    }

    let blockerId: User[] | null | undefined = undefined;

    if (createUserBlocksDto.blockerId) {
      const blockerIdObjects = await this.userService.findByIds(
        createUserBlocksDto.blockerId.map((entity) => entity.id.toString()),
      );
      if (blockerIdObjects.length !== createUserBlocksDto.blockerId.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            blockerId: 'notExists',
          },
        });
      }
      blockerId = blockerIdObjects;
    } else if (createUserBlocksDto.blockerId === null) {
      blockerId = null;
    }

    return this.userBlocksRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      blocker,

      blockedId,

      blockerId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userBlocksRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserBlocks['id']) {
    return this.userBlocksRepository.findById(id);
  }

  findByIds(ids: UserBlocks['id'][]) {
    return this.userBlocksRepository.findByIds(ids);
  }

  async update(
    id: UserBlocks['id'],

    updateUserBlocksDto: UpdateUserBlocksDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let blocker: User | null | undefined = undefined;

    if (updateUserBlocksDto.blocker) {
      const blockerObject = await this.userService.findById(
        updateUserBlocksDto.blocker.id.toString(),
      );
      if (!blockerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            blocker: 'notExists',
          },
        });
      }
      blocker = blockerObject;
    } else if (updateUserBlocksDto.blocker === null) {
      blocker = null;
    }

    let blockedId: User | null | undefined = undefined;

    if (updateUserBlocksDto.blockedId) {
      const blockedIdObject = await this.userService.findById(
        updateUserBlocksDto.blockedId.id.toString(),
      );
      if (!blockedIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            blockedId: 'notExists',
          },
        });
      }
      blockedId = blockedIdObject;
    } else if (updateUserBlocksDto.blockedId === null) {
      blockedId = null;
    }

    let blockerId: User[] | null | undefined = undefined;

    if (updateUserBlocksDto.blockerId) {
      const blockerIdObjects = await this.userService.findByIds(
        updateUserBlocksDto.blockerId.map((entity) => entity.id.toString()),
      );
      if (blockerIdObjects.length !== updateUserBlocksDto.blockerId.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            blockerId: 'notExists',
          },
        });
      }
      blockerId = blockerIdObjects;
    } else if (updateUserBlocksDto.blockerId === null) {
      blockerId = null;
    }

    return this.userBlocksRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      blocker,

      blockedId,

      blockerId,
    });
  }

  remove(id: UserBlocks['id']) {
    return this.userBlocksRepository.remove(id);
  }
}
