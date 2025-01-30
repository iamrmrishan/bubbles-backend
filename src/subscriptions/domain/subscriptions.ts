import { SubscriptionPlans } from '../../subscription-plans/domain/subscription-plans';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Subscriptions {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  endDate: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  startDate: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  status: string;

  @ApiProperty({
    type: () => SubscriptionPlans,
    nullable: false,
  })
  plan: SubscriptionPlans;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  subscriber: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
