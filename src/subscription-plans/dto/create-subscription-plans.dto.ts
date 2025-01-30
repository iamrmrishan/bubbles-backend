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
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateSubscriptionPlansDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

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
