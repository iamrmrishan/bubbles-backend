import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentType, PaymentStatus } from '../domain/payment';

export class PaymentFilterDto {
  @ApiProperty({
    enum: PaymentType,
    required: false,
    description: 'Filter by payment type',
  })
  @IsEnum(PaymentType)
  @IsOptional()
  type?: PaymentType;

  @ApiProperty({
    enum: PaymentStatus,
    required: false,
    description: 'Filter by payment status',
  })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiProperty({
    required: false,
    description: 'Filter by start date (ISO string)',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    required: false,
    description: 'Filter by end date (ISO string)',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    required: false,
    minimum: 0,
    description: 'Filter by minimum amount',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  minAmount?: number;

  @ApiProperty({
    required: false,
    minimum: 0,
    description: 'Filter by maximum amount',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxAmount?: number;

  @ApiProperty({
    required: false,
    minimum: 1,
    description: 'Page number for pagination',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiProperty({
    required: false,
    minimum: 1,
    maximum: 100,
    description: 'Number of items per page',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by wallet ID',
  })
  @IsString()
  @IsOptional()
  walletId?: string;
}
