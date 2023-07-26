import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private readonly stripe: Stripe

  constructor(readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15'
    })
  }

  async createPaymentMethod(card: Stripe.PaymentMethodCreateParams.Card1): Promise<Stripe.PaymentMethod> {
    return this.stripe.paymentMethods.create({
      type: 'card',
      card,
    })
  }

  async createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa'
    })
  }
}