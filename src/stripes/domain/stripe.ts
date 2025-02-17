import { ApiProperty } from '@nestjs/swagger';

export enum StripePaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export class Stripe {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  paymentIntentId: string;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: String })
  currency: string;

  @ApiProperty({ enum: StripePaymentStatus })
  status: StripePaymentStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
