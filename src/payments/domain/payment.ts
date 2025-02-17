import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../../wallets/domain/wallet';

export enum PaymentType {
  SUBSCRIPTION = 'subscription',
  TIP = 'tip',
  PAYOUT = 'payout',
  REFUND = 'refund',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export class Payment {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ enum: PaymentType })
  type: PaymentType;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: Number })
  platformFee: number;

  @ApiProperty({ type: Number })
  creatorAmount: number;

  @ApiProperty({ type: () => Wallet })
  fromWallet: Wallet;

  @ApiProperty({ type: () => Wallet })
  toWallet: Wallet;

  @ApiProperty({ type: String })
  stripePaymentId: string;

  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    nullable: true,
    required: ['required'],
    example: {
      subscriptionPlanId: 'plan_123',
      message: 'Thank you for the content!',
    },
  })
  metadata?: Record<string, any>;
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
