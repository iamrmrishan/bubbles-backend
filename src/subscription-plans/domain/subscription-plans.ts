import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class SubscriptionPlan {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number })
  duration: number; // in months

  @ApiProperty({ type: String })
  creatorId: string;

  @ApiProperty({ type: () => User })
  creator: User;

  @ApiProperty({ type: String })
  stripeProductId: string;

  @ApiProperty({ type: String })
  stripePriceId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
