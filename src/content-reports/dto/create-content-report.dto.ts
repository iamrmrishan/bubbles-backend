import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { ContentDto } from '../../contents/dto/content.dto';

export class CreateContentReportDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  resolutionNote?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  reason?: string | null;

  @ApiProperty({
    required: true,
    type: () => ContentDto,
  })
  @ValidateNested()
  @Type(() => ContentDto)
  @IsNotEmptyObject()
  contentId: ContentDto;

  @ApiProperty({
    required: false,
    type: () => UserDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  reporterId?: UserDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
