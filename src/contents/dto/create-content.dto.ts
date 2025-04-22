import { UserDto } from '../../users/dto/user.dto';
import { FileDto } from '../../files/dto/file.dto';

import { Type } from 'class-transformer';

import {
  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateContentAttributesDto } from '../../content-attributes/dto/create-content-attributes.dto';

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  visibility?: 'public' | 'followers' | 'subscribers';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  ppvPrice?: number;

  @ApiProperty({ required: false, type: [CreateContentAttributesDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContentAttributesDto)
  attributes?: CreateContentAttributesDto[];

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
