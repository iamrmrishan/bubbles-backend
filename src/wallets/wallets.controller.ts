import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './domain/wallet';

@ApiTags('Wallets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'wallets',
  version: '1',
})
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: 'Create wallet' })
  @ApiResponse({ type: Wallet })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet by id' })
  @ApiResponse({ type: Wallet })
  findById(@Param('id') id: string) {
    return this.walletsService.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get wallet by user id' })
  @ApiResponse({ type: Wallet })
  findByUserId(@Param('userId') userId: string) {
    return this.walletsService.findByUserId(userId);
  }
}
