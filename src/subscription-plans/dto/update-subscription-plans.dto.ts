import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateSubscriptionPlanDto } from './create-subscription-plans.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// First create a DTO without the Stripe fields, as they're handled differently in updates
class BaseUpdateSubscriptionPlanDto extends PartialType(
  OmitType(CreateSubscriptionPlanDto, [
    'stripeProductId',
    'stripePriceId',
  ] as const),
) {}

export class UpdateSubscriptionPlansDto extends BaseUpdateSubscriptionPlanDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  stripeProductId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  stripePriceId?: string;
}
