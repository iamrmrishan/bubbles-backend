import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { SubscriptionPlan } from '../../subscription-plans/domain/subscription-plans';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  EXPIRED = 'expired',
  PAYMENT_FAILED = 'payment_failed',
}

export class Subscription {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: () => User })
  subscriber: User;

  @ApiProperty({ type: () => SubscriptionPlan })
  plan: SubscriptionPlan;

  @ApiProperty({ type: String })
  stripeSubscriptionId: string;

  @ApiProperty({ type: String })
  startDate: string;

  @ApiProperty({ type: String })
  endDate: string;

  @ApiProperty({ enum: SubscriptionStatus })
  status: SubscriptionStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
