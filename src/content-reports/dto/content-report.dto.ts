import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContentReportDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
