// src/payments/payments.service.ts
import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payment, PaymentStatus, PaymentType } from './domain/payment';
import { PaymentRepository } from './infrastructure/persistence/payment.repository';
import { WalletsService } from '../wallets/wallets.service';
import { StripeService } from '../stripes/stripes.service';

import { User } from '../users/domain/user';
import {
  CreateSubscriptionPaymentDto,
  CreateTipPaymentDto,
  PaymentFilterDto,
  PaymentResponseDto,
  RefundPaymentDto,
} from './dto';
import { WalletRepository } from '../wallets/infrastructure/persistence/wallet.repository';
import { Wallet } from '../wallets/domain/wallet';
import { NullableType } from '../utils/types/nullable.type';
import { SubscriptionPlansService } from '../subscription-plans/subscription-plans.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly walletsService: WalletsService,
    private readonly stripeService: StripeService,
    @Inject(forwardRef(() => SubscriptionPlansService))
    private readonly subscriptionPlansService: SubscriptionPlansService,
    private readonly configService: ConfigService,
    private readonly walletRepository: WalletRepository,
  ) {}

  async createSubscriptionPayment(
    createDto: CreateSubscriptionPaymentDto,
  ): Promise<Payment> {
    const fromWallet = await this.validateWallet(createDto.fromWallet.id);
    const toWallet = await this.validateWallet(createDto.toWallet.id);

    // Validate subscription plan
    const plan = await this.subscriptionPlansService.findById(
      createDto.subscriptionPlanId,
    );
    if (!plan) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plan: 'subscriptionPlanNotFound' },
      });
    }

    // Verify amount matches plan price
    if (createDto.amount !== plan.price) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { amount: 'amountDoesNotMatchPlanPrice' },
      });
    }

    return this.processPayment({
      type: PaymentType.SUBSCRIPTION,
      amount: createDto.amount,
      fromWallet,
      toWallet,
      metadata: {
        subscriptionPlanId: plan.id,
      },
    });
  }

  async createTipPayment(createDto: CreateTipPaymentDto): Promise<Payment> {
    const fromWallet = await this.validateWallet(createDto.fromWallet.id);
    const toWallet = await this.validateWallet(createDto.toWallet.id);

    // Verify creator is receiving the tip
    if (!toWallet.owner.isCreator) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { toWallet: 'recipientIsNotCreator' },
      });
    }

    return this.processPayment({
      type: PaymentType.TIP,
      amount: createDto.amount,
      fromWallet,
      toWallet,
      metadata: {
        message: createDto.message,
      },
    });
  }

  private async processPayment(data: {
    type: PaymentType;
    amount: number;
    fromWallet: any;
    toWallet: any;
    metadata?: Record<string, any>;
  }): Promise<Payment> {
    // Calculate fees
    const platformFeePercent = this.configService.get('stripe.platformFee');
    const platformFee = (data.amount * platformFeePercent) / 100;
    const creatorAmount = data.amount - platformFee;

    // Create Stripe payment intent
    const paymentIntent = await this.stripeService.createPaymentIntent({
      amount: data.amount,
      customerId: data.fromWallet.stripeCustomerId,
      description: `Payment of type ${data.type}`,
    });

    // Create payment record
    const payment = await this.paymentRepository.create({
      type: data.type,
      amount: data.amount,
      platformFee,
      creatorAmount,
      fromWallet: data.fromWallet,
      toWallet: data.toWallet,
      stripePaymentId: paymentIntent.id,
      status: PaymentStatus.PENDING,
      metadata: data.metadata,
    });

    // Create and return response DTO
    const response = new PaymentResponseDto();
    Object.assign(response, payment);
    response.clientSecret = paymentIntent.clientSecret;
    return response;
  }

  private async validateWallet(walletId: string) {
    const wallet = await this.walletsService.findById(walletId);
    if (!wallet) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { wallet: 'walletNotFound' },
      });
    }
    return wallet;
  }

  async findWalletById(walletId: string): Promise<NullableType<Wallet>> {
    return this.walletRepository.findById(walletId);
  }

  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { payment: 'paymentNotFound' },
      });
    }
    return payment;
  }

  async findByWallet(walletId: string) {
    await this.validateWallet(walletId);
    return this.paymentRepository.find({
      where: [{ fromWallet: { id: walletId } }, { toWallet: { id: walletId } }],
    });
  }

  async findPaymentsByWalletId(walletId: string): Promise<Payment[]> {
    // This will find all payments where the wallet is either the sender or receiver
    return this.paymentRepository.findByWalletId(walletId);
  }

  async findByFromWallet(walletId: string) {
    await this.validateWallet(walletId);
    return this.paymentRepository.find({
      where: { fromWallet: { id: walletId } },
    });
  }

  async findByToWallet(walletId: string) {
    await this.validateWallet(walletId);
    return this.paymentRepository.find({
      where: { toWallet: { id: walletId } },
    });
  }

  async findByStripePaymentId(stripePaymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { stripePaymentId },
    });
    if (!payment) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { payment: 'paymentNotFound' },
      });
    }
    return payment;
  }

  async findAll(filterDto: PaymentFilterDto, user: User) {
    const query = this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.fromWallet', 'fromWallet')
      .leftJoinAndSelect('payment.toWallet', 'toWallet');

    if (filterDto.type) {
      query.andWhere('payment.type = :type', { type: filterDto.type });
    }

    if (filterDto.startDate) {
      query.andWhere('payment.createdAt >= :startDate', {
        startDate: filterDto.startDate,
      });
    }

    if (filterDto.endDate) {
      query.andWhere('payment.createdAt <= :endDate', {
        endDate: filterDto.endDate,
      });
    }

    if (filterDto.minAmount) {
      query.andWhere('payment.amount >= :minAmount', {
        minAmount: filterDto.minAmount,
      });
    }

    if (filterDto.maxAmount) {
      query.andWhere('payment.amount <= :maxAmount', {
        maxAmount: filterDto.maxAmount,
      });
    }

    // Pagination
    const page = filterDto.page || 1;
    const limit = filterDto.limit || 10;
    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  async processSuccessfulPayment(paymentId: string): Promise<void> {
    const payment = await this.findById(paymentId);

    // Update payment status
    await this.paymentRepository.update(paymentId, {
      status: PaymentStatus.COMPLETED,
    });

    // Update wallet balances
    await this.walletsService.updateBalance(
      payment.toWallet.id,
      payment.creatorAmount,
    );

    // Create payout to creator
    await this.stripeService.createPayout(
      payment.toWallet.stripeAccountId as string,
      payment.creatorAmount,
    );

    // If subscription payment, initiate subscription
    if (
      payment.type === PaymentType.SUBSCRIPTION &&
      payment.metadata?.subscriptionPlanId
    ) {
      await this.subscriptionPlansService.activateSubscription(
        payment.metadata.subscriptionPlanId,
        payment.fromWallet.owner.id,
      );
    }
  }

  async processFailedPayment(paymentId: string): Promise<void> {
    await this.paymentRepository.update(paymentId, {
      status: PaymentStatus.FAILED,
    });
  }

  async refundPayment(
    paymentId: string,
    refundDto: RefundPaymentDto,
  ): Promise<void> {
    const payment = await this.findById(paymentId);

    if (payment.status === PaymentStatus.REFUNDED) {
      throw new BadRequestException('Payment has already been refunded');
    }

    const refundAmount = refundDto.amount || payment.amount;
    if (refundAmount > payment.amount) {
      throw new BadRequestException(
        'Refund amount cannot exceed payment amount',
      );
    }

    // Create refund in Stripe
    await this.stripeService.refundPayment(
      payment.stripePaymentId,
      refundDto.amount,
    );

    // Calculate refund amounts
    const refundPlatformFee =
      (refundAmount * payment.platformFee) / payment.amount;
    const refundCreatorAmount = refundAmount - refundPlatformFee;

    // Update payment status
    await this.paymentRepository.update(paymentId, {
      status: PaymentStatus.REFUNDED,
      metadata: {
        ...payment.metadata,
        refundReason: refundDto.reason,
        refundAmount: refundAmount,
      },
    });

    // Reverse the wallet balance update
    await this.walletsService.updateBalance(
      payment.toWallet.id,
      -refundCreatorAmount,
    );

    // If subscription payment, cancel subscription
    if (
      payment.type === PaymentType.SUBSCRIPTION &&
      payment.metadata?.subscriptionPlanId
    ) {
      await this.subscriptionPlansService.cancelSubscription(
        payment.metadata.subscriptionPlanId,
        payment.fromWallet.owner.id,
      );
    }
  }

  async getPaymentStats() {
    const stats = await this.paymentRepository
      .createQueryBuilder('payment')
      .select([
        'COUNT(*) as totalPayments',
        'SUM(amount) as totalAmount',
        'SUM(platformFee) as totalPlatformFee',
        'COUNT(CASE WHEN status = :completed THEN 1 END) as completedPayments',
        'COUNT(CASE WHEN status = :failed THEN 1 END) as failedPayments',
      ])
      .setParameter('completed', PaymentStatus.COMPLETED)
      .setParameter('failed', PaymentStatus.FAILED)
      .getRawOne();

    return {
      ...stats,
      successRate: (stats.completedPayments / stats.totalPayments) * 100,
    };
  }
}
