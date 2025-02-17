import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaymentDto } from './payment.dto';

export class CreatePaymentDto extends PaymentDto {
  @ApiProperty({
    description: 'ID of the subscription plan',
  })
  @IsString()
  @IsNotEmpty()
  subscriptionPlanId: string;
}
