import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PaymentDto } from './payment.dto';
import { PaymentType } from '../domain/payment';

export class CreateSubscriptionPaymentDto extends PaymentDto {
  @ApiProperty({
    description: 'ID of the subscription plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  subscriptionPlanId: string;

  @ApiProperty({
    description: 'Optional description for the subscription payment',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  @IsNotEmpty()
  type: PaymentType;
}
