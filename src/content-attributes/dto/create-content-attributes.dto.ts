import { ContentDto } from '../../contents/dto/content.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateContentAttributesDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  value: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  key: string;

  @ApiProperty({
    required: true,
    type: () => ContentDto,
  })
  @ValidateNested()
  @Type(() => ContentDto)
  @IsNotEmptyObject()
  content: ContentDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
