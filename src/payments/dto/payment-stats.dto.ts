import { ApiProperty } from '@nestjs/swagger';

export class PaymentStatsDto {
  @ApiProperty()
  totalPayments: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  totalPlatformFee: number;

  @ApiProperty()
  completedPayments: number;

  @ApiProperty()
  failedPayments: number;

  @ApiProperty()
  successRate: number;

  @ApiProperty()
  averagePaymentAmount: number;
}
