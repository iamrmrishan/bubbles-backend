import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchPreferencesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
