import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { StripeService } from 'apps/payments/src/providers/stripe.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeService: StripeService) {}

  async createCharge(input: CreateChargeDto) {
    const { amount } = input
    
    return this.stripeService.createPaymentIntent( amount * 100)
  }
}
