import { ContentsService } from '../contents/contents.service';
import { Content } from '../contents/domain/content';

import {
  forwardRef,
  HttpStatus,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateContentAttributesDto } from './dto/create-content-attributes.dto';
import { UpdateContentAttributesDto } from './dto/update-content-attributes.dto';
import { ContentAttributesRepository } from './infrastructure/persistence/content-attributes.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ContentAttributes } from './domain/content-attributes';

@Injectable()
export class ContentAttributesService {
  constructor(
    @Inject(forwardRef(() => ContentsService))
    private contentsService: ContentsService,

    // Dependencies here
    private readonly contentAttributesRepository: ContentAttributesRepository,
  ) {}

  async create(createContentAttributesDto: CreateContentAttributesDto) {
    // Do not remove comment below.
    // <creating-property />

    const contentObject = await this.contentsService.findById(
      createContentAttributesDto.content.id,
    );
    if (!contentObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          content: 'notExists',
        },
      });
    }
    const content = contentObject;

    return this.contentAttributesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      value: createContentAttributesDto.value,

      key: createContentAttributesDto.key,

      content,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.contentAttributesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ContentAttributes['id']) {
    return this.contentAttributesRepository.findById(id);
  }

  findByIds(ids: ContentAttributes['id'][]) {
    return this.contentAttributesRepository.findByIds(ids);
  }

  async update(
    id: ContentAttributes['id'],

    updateContentAttributesDto: UpdateContentAttributesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let content: Content | undefined = undefined;

    if (updateContentAttributesDto.content) {
      const contentObject = await this.contentsService.findById(
        updateContentAttributesDto.content.id,
      );
      if (!contentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            content: 'notExists',
          },
        });
      }
      content = contentObject;
    }

    return this.contentAttributesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      value: updateContentAttributesDto.value,

      key: updateContentAttributesDto.key,

      content,
    });
  }

  remove(id: ContentAttributes['id']) {
    return this.contentAttributesRepository.remove(id);
  }
}
