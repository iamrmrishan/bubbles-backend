import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  customerId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateStripeCustomerDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;
}

export class CreateStripeAccountDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  country: string = 'US';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessName?: string;
}

export class CreateStripeSubscriptionDto {
  @ApiProperty()
  @IsString()
  customerId: string;

  @ApiProperty()
  @IsString()
  priceId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paymentBehavior?: 'default_incomplete' | 'error_if_incomplete';
}
