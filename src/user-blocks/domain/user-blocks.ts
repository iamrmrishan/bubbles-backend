import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserBlocks {
  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  blocker?: User | null;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  blockedId?: User | null;

  @ApiProperty({
    type: () => [User],
    nullable: true,
  })
  blockerId?: User[] | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
