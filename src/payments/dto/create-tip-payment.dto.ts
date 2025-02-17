import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaymentDto } from './payment.dto';

export class CreateTipPaymentDto extends PaymentDto {
  @ApiProperty({
    description: 'Optional message with the tip',
    required: false,
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  message?: string;
}
