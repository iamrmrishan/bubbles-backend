import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Verifications {
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
