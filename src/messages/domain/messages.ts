import { SubscriptionPlans } from '../../subscription-plans/domain/subscription-plans';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Messages {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  sentAt: string;

  @ApiProperty({
    type: () => SubscriptionPlans,
    nullable: false,
  })
  plan: SubscriptionPlans;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  MessageContent: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  receiver: User;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  sender: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
