import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WalletDto } from '../../wallets/dto/wallet.dto';

export class PaymentDto {
  @ApiProperty({ type: () => WalletDto })
  @ValidateNested()
  @Type(() => WalletDto)
  @IsNotEmpty()
  fromWallet: WalletDto;

  @ApiProperty({ type: () => WalletDto })
  @ValidateNested()
  @Type(() => WalletDto)
  @IsNotEmpty()
  toWallet: WalletDto;

  @ApiProperty({
    description: 'Payment amount in dollars',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;
}
