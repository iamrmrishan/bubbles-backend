import {
  Controller,
  Post,
  Headers,
  Body,
  RawBodyRequest,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { StripeService } from './stripes.service';
import Stripe from 'stripe';

@ApiTags('Stripe Webhooks')
@Controller({
  path: 'stripe/webhook',
  version: '1',
})
export class StripeWebhookController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @ApiOperation({ summary: 'Handle Stripe webhook events' })
  @ApiHeader({
    name: 'stripe-signature',
    description: 'Stripe webhook signature',
    required: true,
  })
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
    @Body() body: any,
  ) {
    if (!signature) {
      throw new HttpException(
        'Missing stripe-signature header',
        HttpStatus.BAD_REQUEST,
      );
    }

    const rawBody = request.rawBody;
    if (!rawBody) {
      throw new HttpException('Missing raw body', HttpStatus.BAD_REQUEST);
    }

    // Verify webhook signature
    const isValid = await this.stripeService.verifyWebhookSignature(
      rawBody,
      signature,
    );
    if (!isValid) {
      throw new HttpException(
        'Invalid webhook signature',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const event = body as Stripe.Event;

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentIntentSucceeded(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case 'payment_intent.payment_failed':
          await this.handlePaymentIntentFailed(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case 'customer.subscription.created':
          await this.handleSubscriptionCreated(
            event.data.object as Stripe.Subscription,
          );
          break;

        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(
            event.data.object as Stripe.Subscription,
          );
          break;

        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(
            event.data.object as Stripe.Subscription,
          );
          break;

        case 'account.updated':
          await this.handleConnectedAccountUpdated(
            event.data.object as Stripe.Account,
          );
          break;

        case 'payout.paid':
          await this.handlePayoutPaid(event.data.object as Stripe.Payout);
          break;

        case 'payout.failed':
          await this.handlePayoutFailed(event.data.object as Stripe.Payout);
          break;

        // Add more event types as needed

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return { received: true };
    } catch (err) {
      console.error('Error processing webhook:', err);
      throw new HttpException(
        'Error processing webhook',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent,
  ) {
    // TODO: Implement payment success logic
    // - Update payment status in database
    // - Send confirmation email
    // - Update wallet balances
    console.log('Payment succeeded:', paymentIntent.id);
  }

  private async handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
    // TODO: Implement payment failure logic
    // - Update payment status in database
    // - Send failure notification
    console.log('Payment failed:', paymentIntent.id);
  }

  private async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    // TODO: Implement subscription creation logic
    // - Create subscription record in database
    // - Send welcome email
    console.log('Subscription created:', subscription.id);
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    // TODO: Implement subscription update logic
    // - Update subscription status in database
    console.log('Subscription updated:', subscription.id);
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    // TODO: Implement subscription deletion logic
    // - Update subscription status in database
    // - Send cancellation email
    console.log('Subscription deleted:', subscription.id);
  }

  private async handleConnectedAccountUpdated(account: Stripe.Account) {
    // TODO: Implement connected account update logic
    // - Update creator account status
    console.log('Connected account updated:', account.id);
  }

  private async handlePayoutPaid(payout: Stripe.Payout) {
    // TODO: Implement payout success logic
    // - Update payout status in database
    // - Send confirmation to creator
    console.log('Payout succeeded:', payout.id);
  }

  private async handlePayoutFailed(payout: Stripe.Payout) {
    // TODO: Implement payout failure logic
    // - Update payout status in database
    // - Send failure notification to creator
    console.log('Payout failed:', payout.id);
  }
}
