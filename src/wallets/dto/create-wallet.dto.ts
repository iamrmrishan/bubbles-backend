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

export class CreateWalletDto {
  @ApiProperty({
    type: Number,
    description: 'Initial balance of the wallet',
    default: 0,
  })
  @IsNumber()
  balance: number = 0;

  @ApiProperty({
    type: String,
    description: 'Currency of the wallet',
    example: 'USD',
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
}
