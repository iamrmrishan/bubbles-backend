import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContentAttributesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
