import { Content } from '../../contents/domain/content';
import { ApiProperty } from '@nestjs/swagger';

export class ContentAttributes {
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
    type: () => Content,
    nullable: false,
  })
  content: Content;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
