import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto';
import { SubscriptionsRepository } from './infrastructure/persistence/subscriptions.repository';
import { UsersService } from '../users/users.service';
import { SubscriptionPlansService } from '../subscription-plans/subscription-plans.service';
import { PaymentsService } from '../payments/payments.service';
import { StripeService } from '../stripes/stripes.service';
import { Subscription, SubscriptionStatus } from './domain/subscriptions';
import { PaymentType } from '../payments/domain/payment';
import { NullableType } from '../utils/types/nullable.type';
import { DeepPartial } from 'typeorm';
import { Wallet } from '../wallets/domain/wallet';
import { WalletDto } from '../wallets/dto/wallet.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionRepository: SubscriptionsRepository,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => SubscriptionPlansService))
    private readonly subscriptionPlansService: SubscriptionPlansService,
    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  async create(createDto: CreateSubscriptionsDto) {
    // Verify subscriber exists
    const subscriber = await this.usersService.findById(
      createDto.subscriber.id.toString(),
    );
    if (!subscriber) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { subscriber: 'subscriberNotFound' },
      });
    }

    // Verify plan exists
    const plan = await this.subscriptionPlansService.findById(
      createDto.plan.id,
    );
    if (!plan) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plan: 'planNotFound' },
      });
    }

    // Check if user already has active subscription to this creator
    const existingSubscription = await this.subscriptionRepository.findOne({
      where: {
        subscriber: { id: subscriber.id },
        plan: { creator: { id: plan.creator.id } },
        status: SubscriptionStatus.ACTIVE,
      },
    });

    if (existingSubscription) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { subscription: 'activeSubscriptionExists' },
      });
    }

    // Create Stripe subscription
    const stripeSubscription = await this.stripeService.createSubscription({
      customerId: subscriber?.wallet?.stripeCustomerId as string,
      priceId: plan.stripePriceId,
      paymentBehavior: 'default_incomplete',
    });

    // // Create initial payment
    // const payment = await this.paymentsService.createSubscriptionPayment({
    //   type: PaymentType.SUBSCRIPTION,
    //   amount: plan.price,
    //   fromWallet: subscriber.wallet,
    //   toWallet: plan.creator.wallet,
    // });

    // Create subscription record
    return this.subscriptionRepository.create({
      subscriber,
      plan,
      stripeSubscriptionId: stripeSubscription.id,
      startDate: new Date().toISOString(),
      endDate: new Date(
        stripeSubscription.current_period_end * 1000,
      ).toISOString(),
      status: SubscriptionStatus.ACTIVE,
    });
  }

  async update(
    id: string,
    data: DeepPartial<Subscription>,
  ): Promise<NullableType<Subscription>> {
    return this.subscriptionRepository.update(id, data);
  }

  async findById(id: string) {
    const subscription = await this.subscriptionRepository.findById(id);
    if (!subscription) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { subscription: 'subscriptionNotFound' },
      });
    }
    return subscription;
  }

  async findBySubscriberId(subscriberId: string) {
    return this.subscriptionRepository.findOne({
      where: { subscriber: { id: subscriberId } },
    });
  }

  async findByCreatorId(creatorId: string) {
    return this.subscriptionRepository.findOne({
      where: { plan: { creator: { id: creatorId } } },
    });
  }

  async cancel(id: string) {
    const subscription = await this.findById(id);

    // Cancel Stripe subscription
    await this.stripeService.cancelSubscription(
      subscription.stripeSubscriptionId,
    );

    // Update subscription status
    return this.subscriptionRepository.update(id, {
      status: SubscriptionStatus.CANCELED,
    });
  }

  // async handleSubscriptionRenewal(stripeSubscriptionId: string) {
  //   const subscription = await this.subscriptionRepository.findOne({
  //     where: { stripeSubscriptionId },
  //   });

  //   if (!subscription) {
  //     throw new Error('Subscription not found');
  //   }

  //   // Create payment for renewal
  //   await this.paymentsService.createSubscriptionPayment({
  //     type: PaymentType.SUBSCRIPTION,
  //     amount: subscription.plan.price,
  //     fromWallet: subscription.subscriber.wallet,
  //     toWallet: subscription.plan.creator.wallet,
  //   });

  //   // Update subscription end date
  //   const stripeSubscription =
  //     await this.stripeService.retrieveSubscription(stripeSubscriptionId);

  //   await this.subscriptionRepository.update(subscription.id, {
  //     endDate: new Date(
  //       stripeSubscription.current_period_end * 1000,
  //     ).toISOString(),
  //   });
  // }

  async handleSubscriptionRenewal(stripeSubscriptionId: string): Promise<void> {
    // Find subscription with related entities
    const subscription = await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId },
    });

    if (!subscription) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { subscription: 'subscriptionNotFound' },
      });
    }

    // Validate wallets exist
    this.validateWalletsForPayment(subscription);

    // Create renewal payment
    await this.createRenewalPayment(subscription);

    // Update subscription end date
    await this.updateSubscriptionEndDate(subscription.id, stripeSubscriptionId);
  }

  private validateWalletsForPayment(subscription: Subscription): void {
    if (!subscription.subscriber.wallet) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { wallet: 'subscriberWalletNotFound' },
      });
    }

    if (!subscription.plan.creator.wallet) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { wallet: 'creatorWalletNotFound' },
      });
    }
  }

  private toWalletDto(wallet: Wallet): WalletDto {
    return {
      id: wallet.id,
      balance: wallet.balance,
      currency: wallet.currency,
      owner: wallet.owner,
      isActive: wallet.isActive,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }

  private async createRenewalPayment(
    subscription: Subscription,
  ): Promise<void> {
    await this.paymentsService.createSubscriptionPayment({
      type: PaymentType.SUBSCRIPTION,
      amount: subscription.plan.price,
      subscriptionPlanId: subscription.plan.id,
      fromWallet: this.toWalletDto(subscription.subscriber.wallet!),
      toWallet: this.toWalletDto(subscription.plan.creator.wallet!),
      description: `Subscription renewal for plan: ${subscription.plan.name}`,
    });
  }

  private async updateSubscriptionEndDate(
    subscriptionId: string,
    stripeSubscriptionId: string,
  ): Promise<void> {
    try {
      const stripeSubscription =
        await this.stripeService.retrieveSubscription(stripeSubscriptionId);

      await this.subscriptionRepository.update(subscriptionId, {
        endDate: new Date(
          stripeSubscription.current_period_end * 1000,
        ).toISOString(),
      });
    } catch (error) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { stripe: 'failedToUpdateSubscriptionEndDate' },
      });
    }
  }

  async handleSubscriptionPaymentFailed(stripeSubscriptionId: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    await this.subscriptionRepository.update(subscription.id, {
      status: SubscriptionStatus.PAYMENT_FAILED,
    });
  }

  async findByPlanAndSubscriber(
    planId: string,
    subscriberId: string,
  ): Promise<NullableType<Subscription>> {
    return this.subscriptionRepository.findByPlanAndSubscriber(
      planId,
      subscriberId,
    );
  }
}
