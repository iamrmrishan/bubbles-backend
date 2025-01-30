import { Content } from '../../contents/domain/content';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class ContentReport {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  resolutionNote?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  reason?: string | null;

  @ApiProperty({
    type: () => Content,
    nullable: false,
  })
  contentId: Content;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  reporterId?: User | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
