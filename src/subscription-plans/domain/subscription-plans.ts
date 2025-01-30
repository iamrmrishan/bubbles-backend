import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionPlans {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  duration: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  description: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
