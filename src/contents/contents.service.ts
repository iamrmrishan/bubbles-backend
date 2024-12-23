import { UsersService } from '../users/users.service';
import { FilesService } from '../files/files.service';
import { User } from '../users/domain/user';
import { FileType } from '../files/domain/file';

import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentRepository } from './infrastructure/persistence/content.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Content } from './domain/content';

@Injectable()
export class ContentsService {
  constructor(
    private readonly userService: UsersService,
    private readonly filesService: FilesService,
    private readonly contentRepository: ContentRepository,
  ) {}

  async create(createContentDto: CreateContentDto) {
    const creatorObject = await this.userService.findById(
      createContentDto.creator.id.toString(),
    );
    if (!creatorObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          creator: 'notExists',
        },
      });
    }
    const creator = creatorObject;

    let media: FileType[] | null | undefined = undefined;
    if (createContentDto.media?.length) {
      const fileIds = createContentDto.media.map((file) => file.id);
      const files = await this.filesService.findByIds(fileIds);

      if (files.length !== fileIds.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            media: 'someFilesNotExist',
          },
        });
      }
      media = files;
    }

    return this.contentRepository.create({
      description: createContentDto.description,
      title: createContentDto.title,
      creator,
      media,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.contentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Content['id']) {
    return this.contentRepository.findById(id);
  }

  findByIds(ids: Content['id'][]) {
    return this.contentRepository.findByIds(ids);
  }

  async update(id: Content['id'], updateContentDto: UpdateContentDto) {
    let creator: User | undefined = undefined;
    if (updateContentDto.creator) {
      const creatorObject = await this.userService.findById(
        updateContentDto.creator.id.toString(),
      );
      if (!creatorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            creator: 'notExists',
          },
        });
      }
      creator = creatorObject;
    }

    let media: FileType[] | null | undefined = undefined;
    if (updateContentDto.media?.length) {
      const fileIds = updateContentDto.media.map((file) => file.id);
      const files = await this.filesService.findByIds(fileIds);

      if (files.length !== fileIds.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            media: 'someFilesNotExist',
          },
        });
      }
      media = files;
    } else if (updateContentDto.media === null) {
      media = null;
    }

    return this.contentRepository.update(id, {
      description: updateContentDto.description,
      title: updateContentDto.title,
      creator,
      media,
    });
  }

  remove(id: Content['id']) {
    return this.contentRepository.remove(id);
  }
}
