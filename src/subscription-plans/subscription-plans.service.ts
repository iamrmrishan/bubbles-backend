import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plans.dto';
import { SubscriptionPlansRepository } from './infrastructure/persistence/subscription-plans.repository';
import { UsersService } from '../users/users.service';
import { StripeService } from '../stripes/stripes.service';
import { UpdateSubscriptionPlansDto } from './dto/update-subscription-plans.dto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { SubscriptionStatus } from '../subscriptions/domain/subscriptions';
import { DeepPartial } from 'typeorm';
import { SubscriptionPlan } from './domain/subscription-plans';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlansRepository,
    private readonly usersService: UsersService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly stripeService: StripeService,
    private readonly walletsService: WalletsService,
  ) {}

  async create(createDto: CreateSubscriptionPlanDto) {
    // Verify creator exists and is actually a creator
    const creator = await this.usersService.findById(
      createDto.creator.id.toString(),
    );

    if (!creator) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { creator: 'creatorNotFound' },
      });
    }

    if (!creator.isCreator) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { creator: 'userIsNotCreator' },
      });
    }

    // Get creator's wallet to access their Stripe account ID
    const creatorWallet = await this.walletsService.findByUserId(creator.id);
    if (!creatorWallet?.stripeAccountId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { wallet: 'creatorStripeAccountNotFound' },
      });
    }

    // Create Stripe product and price under creator's account
    const { productId, priceId } =
      await this.stripeService.createSubscriptionProduct({
        name: createDto.name,
        description: createDto.description,
        amount: createDto.price,
        interval: 'month',
        intervalCount: createDto.duration,
        stripeAccountId: creatorWallet.stripeAccountId,
      });

    // Create subscription plan
    return this.subscriptionPlanRepository.create({
      ...createDto,
      creator: creator,
      stripeProductId: productId,
      stripePriceId: priceId,
      creatorId: creator.id,
    });
  }

  async findById(id: string) {
    const plan = await this.subscriptionPlanRepository.findById(id);
    if (!plan) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plan: 'planNotFound' },
      });
    }
    return plan;
  }

  async findByCreatorId(creatorId: string) {
    return this.subscriptionPlanRepository.find({
      where: { creator: { id: creatorId } },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: string, updateDto: UpdateSubscriptionPlansDto) {
    const plan = await this.findById(id);

    // If price is being updated, create new Stripe price
    if (updateDto.price && updateDto.price !== plan.price) {
      const { priceId } = await this.stripeService.createSubscriptionPrice({
        productId: plan.stripeProductId.toString(),
        amount: updateDto.price,
        interval: 'month',
        intervalCount: updateDto.duration || plan.duration,
      });

      updateDto.stripePriceId = priceId;
    }

    // // Convert DTO to DeepPartial<SubscriptionPlan>
    // const updateData: DeepPartial<SubscriptionPlan> = {
    //   name: updateDto.name,
    //   description: updateDto.description,
    //   price: updateDto.price,
    //   duration: updateDto.duration,
    //   stripePriceId: updateDto.stripePriceId,
    //   stripeProductId: updateDto.stripeProductId,
    //   creator: updateDto.creator ? {
    //     id: String(updateDto.creator.id)
    //   } : undefined
    // };

    // Convert DTO to DeepPartial<SubscriptionPlan>
    const updateData = this.toUpdateData(updateDto);

    return this.subscriptionPlanRepository.update(id, updateData);
  }

  private toUpdateData(
    updateDto: UpdateSubscriptionPlansDto,
  ): DeepPartial<SubscriptionPlan> {
    const updateData: DeepPartial<SubscriptionPlan> = {};

    // Only include properties that are defined in the DTO
    if (updateDto.name !== undefined) {
      updateData.name = updateDto.name;
    }
    if (updateDto.description !== undefined) {
      updateData.description = updateDto.description;
    }
    if (updateDto.price !== undefined) {
      updateData.price = updateDto.price;
    }
    if (updateDto.duration !== undefined) {
      updateData.duration = updateDto.duration;
    }
    if (updateDto.stripePriceId !== undefined) {
      updateData.stripePriceId = updateDto.stripePriceId;
    }
    if (updateDto.stripeProductId !== undefined) {
      updateData.stripeProductId = updateDto.stripeProductId;
    }
    if (updateDto.creator !== undefined) {
      updateData.creator = {
        id: String(updateDto.creator.id),
      };
    }

    return updateData;
  }

  async remove(id: string) {
    const plan = await this.findById(id);

    // Archive Stripe product
    await this.stripeService.archiveProduct(plan.stripeProductId);

    return this.subscriptionPlanRepository.remove(id);
  }

  async activateSubscription(
    planId: string,
    subscriberId: string,
  ): Promise<void> {
    const [plan, subscriber] = await Promise.all([
      this.findById(planId),
      this.usersService.findById(subscriberId),
    ]);

    if (!subscriber) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { subscriber: 'subscriberNotFound' },
      });
    }

    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    // Create Stripe subscription
    const stripeSubscription = await this.stripeService.createSubscription({
      customerId: subscriber?.wallet?.stripeCustomerId as string,
      priceId: plan.stripePriceId,
      paymentBehavior: 'default_incomplete',
    });

    // Create subscription record
    await this.subscriptionsService.create({
      subscriber: { id: subscriberId },
      plan: { id: planId },
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: SubscriptionStatus.ACTIVE,
      stripeSubscriptionId: stripeSubscription.id,
    });
  }

  async cancelSubscription(
    planId: string,
    subscriberId: string,
  ): Promise<void> {
    const subscription =
      await this.subscriptionsService.findByPlanAndSubscriber(
        planId,
        subscriberId,
      );

    if (!subscription) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { subscription: 'subscriptionNotFound' },
      });
    }

    // Cancel Stripe subscription
    await this.stripeService.cancelSubscription(
      subscription.stripeSubscriptionId,
    );

    // Update subscription status
    await this.subscriptionsService.update(subscription.id, {
      status: SubscriptionStatus.CANCELED,
    });
  }
}
