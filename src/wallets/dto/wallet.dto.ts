import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class WalletDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the wallet',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: Number,
    description: 'Current balance of the wallet',
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    type: String,
    description: 'Currency of the wallet',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    type: () => UserDto,
    description: 'Owner of the wallet',
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  owner: UserDto;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the wallet is active',
  })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
