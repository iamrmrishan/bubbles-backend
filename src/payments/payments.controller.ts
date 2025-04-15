import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  NotFoundException,
  ForbiddenException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { PaymentsService } from './payments.service';

import { Payment } from './domain/payment';
import { User } from '../users/domain/user';
import {
  CreateSubscriptionPaymentDto,
  CreateTipPaymentDto,
  PaymentFilterDto,
  RefundPaymentDto,
} from './dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('subscription')
  @ApiOperation({ summary: 'Create subscription payment' })
  @ApiCreatedResponse({ type: Payment })
  async createSubscriptionPayment(
    @Body() createPaymentDto: CreateSubscriptionPaymentDto,
    @GetUser() user: User,
  ) {
    if (user.id !== createPaymentDto.fromWallet.owner.id) {
      throw new ForbiddenException(
        'You can only create payments from your own wallet',
      );
    }
    return this.paymentsService.createSubscriptionPayment(createPaymentDto);
  }

  @Post('tip')
  @ApiOperation({ summary: 'Send tip to creator' })
  @ApiCreatedResponse({ type: Payment })
  async createTipPayment(
    @Body() createTipDto: CreateTipPaymentDto,
    @GetUser() user: User,
  ) {
    if (user.id !== createTipDto.fromWallet.owner.id) {
      throw new ForbiddenException(
        'You can only send tips from your own wallet',
      );
    }
    return this.paymentsService.createTipPayment(createTipDto);
  }

  @Post(':id/refund')
  @ApiOperation({ summary: 'Refund payment' })
  @ApiParam({ name: 'id', type: String })
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  async refundPayment(
    @Param('id') id: string,
    @Body() refundDto: RefundPaymentDto,
  ) {
    const payment = await this.paymentsService.findById(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return this.paymentsService.refundPayment(id, refundDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments with filters' })
  @ApiOkResponse({ type: [Payment] })
  @ApiQuery({ type: PaymentFilterDto })
  async findAll(@Query() filterDto: PaymentFilterDto, @GetUser() user: User) {
    return this.paymentsService.findAll(filterDto);
  }

  @Get('wallet/:walletId')
  @ApiOperation({ summary: 'Get payments for specific wallet' })
  @ApiParam({ name: 'walletId', type: String })
  async findByWallet(
    @Param('walletId') walletId: string,
    @GetUser() user: User,
  ) {
    // First validate wallet ownership
    const wallet = await this.paymentsService.findWalletById(walletId);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    // Check if user owns the wallet or is an admin
    if (wallet.owner.id !== user.id && user.role?.id !== RoleEnum.admin) {
      throw new ForbiddenException(
        'You can only view payments for your own wallet',
      );
    }

    // If validation passes, get the payments
    return this.paymentsService.findPaymentsByWalletId(walletId);
  }

  @Get('received')
  @ApiOperation({ summary: 'Get received payments' })
  async findReceived(@GetUser() user: User) {
    if (!user.isCreator) {
      throw new ForbiddenException('Only creators can view received payments');
    }
    return this.paymentsService.findByToWallet(user?.wallet?.id as string);
  }

  @Get('sent')
  @ApiOperation({ summary: 'Get sent payments' })
  async findSent(@GetUser() user: User) {
    return this.paymentsService.findByFromWallet(user?.wallet?.id as string);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    const payment = await this.paymentsService.findById(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Check if user is involved in the payment or is an admin
    if (
      payment.fromWallet.owner.id !== user.id &&
      payment.toWallet.owner.id !== user.id &&
      user.role?.id !== RoleEnum.admin
    ) {
      throw new ForbiddenException('You can only view your own payments');
    }

    return payment;
  }

  @Get('stats/summary')
  @ApiOperation({ summary: 'Get payment statistics' })
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  async getStats() {
    return this.paymentsService.getPaymentStats();
  }
}
