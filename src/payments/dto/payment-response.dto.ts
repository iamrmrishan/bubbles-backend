import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '../domain/payment';

export class PaymentResponseDto extends Payment {
  @ApiProperty({
    description: 'Stripe payment intent client secret for frontend processing',
    required: false,
  })
  clientSecret?: string;
}
