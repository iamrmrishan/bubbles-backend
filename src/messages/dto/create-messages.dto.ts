import { SubscriptionPlansDto } from '../../subscription-plans/dto/subscription-plans.dto';

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
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateMessagesDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  sentAt: string;

  @ApiProperty({
    required: true,
    type: () => SubscriptionPlansDto,
  })
  @ValidateNested()
  @Type(() => SubscriptionPlansDto)
  @IsNotEmptyObject()
  plan: SubscriptionPlansDto;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  MessageContent: string;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  receiver: UserDto;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  sender: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
