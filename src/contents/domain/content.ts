import { User } from '../../users/domain/user';
import { FileType } from '../../files/domain/file';
import { ApiProperty } from '@nestjs/swagger';

export class Content {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  creator: User;

  @ApiProperty({
    type: () => [FileType],
    nullable: true,
  })
  media?: FileType[] | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
