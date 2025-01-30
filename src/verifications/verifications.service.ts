import { FilesService } from '../files/files.service';
import { FileType } from '../files/domain/file';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateVerificationsDto } from './dto/create-verifications.dto';
import { UpdateVerificationsDto } from './dto/update-verifications.dto';
import { VerificationsRepository } from './infrastructure/persistence/verifications.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Verifications } from './domain/verifications';

@Injectable()
export class VerificationsService {
  constructor(
    private readonly fileService: FilesService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly verificationsRepository: VerificationsRepository,
  ) {}

  async create(createVerificationsDto: CreateVerificationsDto) {
    // Do not remove comment below.
    // <creating-property />

    const selfieWithIdObject = await this.fileService.findById(
      createVerificationsDto.selfieWithId.id,
    );
    if (!selfieWithIdObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          selfieWithId: 'notExists',
        },
      });
    }
    const selfieWithId = selfieWithIdObject;

    const idDocumentObject = await this.fileService.findById(
      createVerificationsDto.idDocument.id,
    );
    if (!idDocumentObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          idDocument: 'notExists',
        },
      });
    }
    const idDocument = idDocumentObject;

    const userObject = await this.userService.findById(
      createVerificationsDto.user.id.toString(),
    );
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.verificationsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      verifiedBy: createVerificationsDto.verifiedBy,

      verifiedAt: createVerificationsDto.verifiedAt,

      isVerified: createVerificationsDto.isVerified,

      rejectionReason: createVerificationsDto.rejectionReason,

      status: createVerificationsDto.status,

      selfieWithId,

      idDocument,

      address: createVerificationsDto.address,

      state: createVerificationsDto.state,

      country: createVerificationsDto.country,

      dateOfBirth: createVerificationsDto.dateOfBirth,

      fullName: createVerificationsDto.fullName,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.verificationsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Verifications['id']) {
    return this.verificationsRepository.findById(id);
  }

  findByIds(ids: Verifications['id'][]) {
    return this.verificationsRepository.findByIds(ids);
  }

  async update(
    id: Verifications['id'],

    updateVerificationsDto: UpdateVerificationsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let selfieWithId: FileType | undefined = undefined;

    if (updateVerificationsDto.selfieWithId) {
      const selfieWithIdObject = await this.fileService.findById(
        updateVerificationsDto.selfieWithId.id,
      );
      if (!selfieWithIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            selfieWithId: 'notExists',
          },
        });
      }
      selfieWithId = selfieWithIdObject;
    }

    let idDocument: FileType | undefined = undefined;

    if (updateVerificationsDto.idDocument) {
      const idDocumentObject = await this.fileService.findById(
        updateVerificationsDto.idDocument.id,
      );
      if (!idDocumentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idDocument: 'notExists',
          },
        });
      }
      idDocument = idDocumentObject;
    }

    let user: User | undefined = undefined;

    if (updateVerificationsDto.user) {
      const userObject = await this.userService.findById(
        updateVerificationsDto.user.id.toString(),
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.verificationsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      verifiedBy: updateVerificationsDto.verifiedBy,

      verifiedAt: updateVerificationsDto.verifiedAt,

      isVerified: updateVerificationsDto.isVerified,

      rejectionReason: updateVerificationsDto.rejectionReason,

      status: updateVerificationsDto.status,

      selfieWithId,

      idDocument,

      address: updateVerificationsDto.address,

      state: updateVerificationsDto.state,

      country: updateVerificationsDto.country,

      dateOfBirth: updateVerificationsDto.dateOfBirth,

      fullName: updateVerificationsDto.fullName,

      user,
    });
  }

  remove(id: Verifications['id']) {
    return this.verificationsRepository.remove(id);
  }
}
