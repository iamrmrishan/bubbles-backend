import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import {
  CreatePaymentIntentDto,
  CreateStripeAccountDto,
  CreateStripeCustomerDto,
  CreateStripeSubscriptionDto,
} from '../../dto/stripe.dto';
import { PaymentPort } from '../ports/payment.port';

@Injectable()
export class StripeAdapter implements PaymentPort {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') as string,
      {
        apiVersion: '2025-01-27.acacia',
      },
    );
  }

  async createPaymentIntent(
    data: CreatePaymentIntentDto,
  ): Promise<{ id: string; clientSecret: string }> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: 'usd',
      customer: data.customerId,
      description: data.description,
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: Math.round(data.amount * 20), // 20% platform fee
    });

    if (!paymentIntent.client_secret) {
      throw new UnprocessableEntityException({
        status: 422,
        error: 'Failed to create payment intent',
        message: 'No client secret was generated',
      });
    }

    return {
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    };
  }

  async createCustomer(data: CreateStripeCustomerDto) {
    const customer = await this.stripe.customers.create({
      email: data.email,
      name: data.name,
    });

    return customer.id;
  }

  async createConnectedAccount(data: CreateStripeAccountDto) {
    const account = await this.stripe.accounts.create({
      type: 'express',
      country: data.country,
      email: data.email,
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
      business_profile: data.businessName
        ? {
            name: data.businessName,
          }
        : undefined,
    });

    return account.id;
  }

  async createSubscription(data: CreateStripeSubscriptionDto) {
    return this.stripe.subscriptions.create({
      customer: data.customerId,
      items: [{ price: data.priceId }],
      payment_behavior: data.paymentBehavior || 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      application_fee_percent: 20, // 20% platform fee
    });
  }

  async cancelSubscription(subscriptionId: string) {
    await this.stripe.subscriptions.cancel(subscriptionId);
  }

  async refundPayment(paymentIntentId: string, amount?: number) {
    await this.stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });
  }

  async retrieveSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.retrieve(subscriptionId);
  }

  async createPayout(accountId: string, amount: number) {
    await this.stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      destination: accountId,
    });
  }

  async verifyWebhookSignature(
    payload: Buffer,
    signature: string,
  ): Promise<boolean> {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.configService.get('STRIPE_WEBHOOK_SECRET') as string,
      );
      return !!event;
    } catch (err) {
      return false;
    }
  }

  async createSubscriptionProduct({
    name,
    description,
    amount,
    interval,
    intervalCount,
  }: {
    name: string;
    description: string;
    amount: number;
    interval: 'day' | 'week' | 'month' | 'year';
    intervalCount: number;
  }) {
    const product = await this.stripe.products.create({
      name,
      description,
    });

    const price = await this.stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(amount * 100),
      currency: 'usd',
      recurring: {
        interval,
        interval_count: intervalCount,
      },
    });

    return {
      productId: product.id,
      priceId: price.id,
    };
  }

  async createSubscriptionPrice({
    productId,
    amount,
    interval,
    intervalCount,
  }: {
    productId: string;
    amount: number;
    interval: 'day' | 'week' | 'month' | 'year';
    intervalCount: number;
  }) {
    const price = await this.stripe.prices.create({
      product: productId,
      unit_amount: Math.round(amount * 100),
      currency: 'usd',
      recurring: {
        interval,
        interval_count: intervalCount,
      },
    });

    return {
      priceId: price.id,
    };
  }

  async archiveProduct(productId: string) {
    await this.stripe.products.update(productId, {
      active: false,
    });
  }
}
