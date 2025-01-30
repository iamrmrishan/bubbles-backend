import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class CreatorAttributes {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  value: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  key: string;

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
