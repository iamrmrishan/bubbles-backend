import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
