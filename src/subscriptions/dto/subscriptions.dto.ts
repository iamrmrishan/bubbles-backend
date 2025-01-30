import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
