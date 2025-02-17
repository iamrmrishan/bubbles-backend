import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CreateSubscriptionPriceDto,
  CreateSubscriptionProductDto,
  PaymentPort,
} from './infrastructure/ports/payment.port';
import { ConfigService } from '@nestjs/config';
import {
  CreatePaymentIntentDto,
  CreateStripeAccountDto,
  CreateStripeCustomerDto,
  CreateStripeSubscriptionDto,
} from './dto/stripe.dto';

@Injectable()
export class StripeService {
  constructor(
    @Inject(forwardRef(() => PaymentPort))
    private readonly paymentPort: PaymentPort,
    private readonly configService: ConfigService,
  ) {}

  createPaymentIntent(data: CreatePaymentIntentDto) {
    return this.paymentPort.createPaymentIntent(data);
  }

  createCustomer(data: CreateStripeCustomerDto) {
    return this.paymentPort.createCustomer(data);
  }

  createConnectedAccount(data: CreateStripeAccountDto) {
    return this.paymentPort.createConnectedAccount(data);
  }

  createSubscription(data: CreateStripeSubscriptionDto) {
    return this.paymentPort.createSubscription(data);
  }

  cancelSubscription(subscriptionId: string) {
    return this.paymentPort.cancelSubscription(subscriptionId);
  }

  refundPayment(paymentIntentId: string, amount?: number): Promise<void> {
    return this.paymentPort.refundPayment(paymentIntentId, amount);
  }
  retrieveSubscription(subscriptionId: string) {
    return this.paymentPort.retrieveSubscription(subscriptionId);
  }

  createPayout(accountId: string, amount: number) {
    return this.paymentPort.createPayout(accountId, amount);
  }

  verifyWebhookSignature(payload: Buffer, signature: string) {
    return this.paymentPort.verifyWebhookSignature(payload, signature);
  }

  createSubscriptionProduct(data: CreateSubscriptionProductDto) {
    return this.paymentPort.createSubscriptionProduct(data);
  }

  createSubscriptionPrice(data: CreateSubscriptionPriceDto) {
    return this.paymentPort.createSubscriptionPrice(data);
  }

  archiveProduct(productId: string) {
    return this.paymentPort.archiveProduct(productId);
  }
}
