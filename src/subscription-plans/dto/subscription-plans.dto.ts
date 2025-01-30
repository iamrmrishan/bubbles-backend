import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionPlansDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
