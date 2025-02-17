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
  IsNotEmpty,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateSubscriptionsDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  endDate: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  status: string;

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
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  subscriber: UserDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stripeSubscriptionId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
