import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class Wallet {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Number })
  balance: number;

  @ApiProperty({ type: String, nullable: true })
  stripeAccountId?: string | null;

  @ApiProperty({ type: String, nullable: true })
  stripeCustomerId?: string | null;

  @ApiProperty({ type: () => User })
  owner: User;

  @ApiProperty({ type: String })
  currency: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
