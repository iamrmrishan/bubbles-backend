import { UserDto } from '../../users/dto/user.dto';
import { FileDto } from '../../files/dto/file.dto';

import { Type } from 'class-transformer';

import {
  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  creator: UserDto;

  @ApiProperty({
    required: false,
    type: () => [FileDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  media?: FileDto[] | null;
}
