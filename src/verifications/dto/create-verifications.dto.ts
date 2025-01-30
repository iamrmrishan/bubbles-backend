import { FileDto } from '../../files/dto/file.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateVerificationsDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  verifiedBy?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  verifiedAt?: string | null;

  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  status: string;

  @ApiProperty({
    required: true,
    type: () => FileDto,
  })
  @ValidateNested()
  @Type(() => FileDto)
  @IsNotEmptyObject()
  selfieWithId: FileDto;

  @ApiProperty({
    required: true,
    type: () => FileDto,
  })
  @ValidateNested()
  @Type(() => FileDto)
  @IsNotEmptyObject()
  idDocument: FileDto;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  state: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  country: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
