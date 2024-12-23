import { FilesService } from '../files/files.service';
import { FileType } from '../files/domain/file';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateContentReportDto } from './dto/create-content-report.dto';
import { UpdateContentReportDto } from './dto/update-content-report.dto';
import { ContentReportRepository } from './infrastructure/persistence/content-report.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ContentReport } from './domain/content-report';

@Injectable()
export class ContentReportsService {
  constructor(
    private readonly fileService: FilesService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly contentReportRepository: ContentReportRepository,
  ) {}

  async create(createContentReportDto: CreateContentReportDto) {
    // Do not remove comment below.
    // <creating-property />

    let contentId: FileType | undefined = undefined;
    const contentIdObject = await this.fileService.findById(
      createContentReportDto.contentId.id,
    );
    if (!contentIdObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          contentId: 'notExists',
        },
      });
    }
    contentId = contentIdObject;
    let reporterId: User | null | undefined = undefined;

    if (createContentReportDto.reporterId) {
      const reporterIdObject = await this.userService.findById(
        createContentReportDto.reporterId.id.toString(),
      );
      if (!reporterIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            reporterId: 'notExists',
          },
        });
      }
      reporterId = reporterIdObject;
    } else if (createContentReportDto.reporterId === null) {
      reporterId = null;
    }

    if (createContentReportDto.reporterId) {
      const reporterIdObject = await this.userService.findById(
        createContentReportDto.reporterId.id.toString(),
      );
      if (!reporterIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            reporterId: 'notExists',
          },
        });
      }
      reporterId = reporterIdObject;
    } else if (createContentReportDto.reporterId === null) {
      reporterId = null;
    }

    return this.contentReportRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      resolutionNote: createContentReportDto.resolutionNote,

      status: createContentReportDto.status,

      reason: createContentReportDto.reason,

      contentId,
      reporterId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.contentReportRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ContentReport['id']) {
    return this.contentReportRepository.findById(id);
  }

  findByIds(ids: ContentReport['id'][]) {
    return this.contentReportRepository.findByIds(ids);
  }

  async update(
    id: ContentReport['id'],

    updateContentReportDto: UpdateContentReportDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let contentId: FileType | undefined = undefined;

    if (updateContentReportDto.contentId) {
      const contentIdObject = await this.fileService.findById(
        updateContentReportDto.contentId.id,
      );
      if (!contentIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            contentId: 'notExists',
          },
        });
      }
      contentId = contentIdObject;
    }

    if (updateContentReportDto.contentId) {
      const contentIdObject = await this.fileService.findById(
        updateContentReportDto.contentId.id,
      );
      if (!contentIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            contentId: 'notExists',
          },
        });
      }
      contentId = contentIdObject;
    }

    let reporterId: User | null | undefined = undefined;

    if (updateContentReportDto.reporterId) {
      const reporterIdObject = await this.userService.findById(
        updateContentReportDto.reporterId.id.toString(),
      );
      if (!reporterIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            reporterId: 'notExists',
          },
        });
      }
      reporterId = reporterIdObject;
    } else if (updateContentReportDto.reporterId === null) {
      reporterId = null;
    }

    if (updateContentReportDto.reporterId) {
      const reporterIdObject = await this.userService.findById(
        updateContentReportDto.reporterId.id.toString(),
      );
      if (!reporterIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            reporterId: 'notExists',
          },
        });
      }
      reporterId = reporterIdObject;
    } else if (updateContentReportDto.reporterId === null) {
      reporterId = null;
    }

    return this.contentReportRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      resolutionNote: updateContentReportDto.resolutionNote,

      status: updateContentReportDto.status,

      reason: updateContentReportDto.reason,

      contentId,

      reporterId,
    });
  }

  remove(id: ContentReport['id']) {
    return this.contentReportRepository.remove(id);
  }
}
