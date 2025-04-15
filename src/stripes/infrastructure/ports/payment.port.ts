import {
  CreatePaymentIntentDto,
  CreateStripeAccountDto,
  CreateStripeCustomerDto,
  CreateStripeSubscriptionDto,
} from '../../dto/stripe.dto';

export interface CreateSubscriptionProductResponse {
  productId: string;
  priceId: string;
}

export interface CreateSubscriptionProductDto {
  name: string;
  description: string;
  amount: number;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount: number;
  stripeAccountId: string;
}

export interface CreateSubscriptionPriceDto {
  productId: string;
  amount: number;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount: number;
}

export abstract class PaymentPort {
  abstract createPaymentIntent(
    data: CreatePaymentIntentDto,
  ): Promise<{ id: string; clientSecret: string }>;
  abstract createCustomer(data: CreateStripeCustomerDto): Promise<string>;
  abstract createConnectedAccount(
    data: CreateStripeAccountDto,
  ): Promise<string>;
  abstract createSubscription(data: CreateStripeSubscriptionDto): Promise<any>;
  abstract cancelSubscription(subscriptionId: string): Promise<void>;
  abstract refundPayment(
    paymentIntentId: string,
    amount?: number,
  ): Promise<void>;
  abstract retrieveSubscription(subscriptionId: string): Promise<any>;
  abstract createPayout(accountId: string, amount: number): Promise<void>;
  abstract verifyWebhookSignature(
    payload: Buffer,
    signature: string,
  ): Promise<boolean>;
  abstract createSubscriptionProduct(
    data: CreateSubscriptionProductDto,
  ): Promise<CreateSubscriptionProductResponse>;
  abstract createSubscriptionPrice(
    data: CreateSubscriptionPriceDto,
  ): Promise<{ priceId: string }>;
  abstract archiveProduct(productId: string): Promise<void>;
}
