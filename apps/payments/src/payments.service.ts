import {  NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationsService } from 'apps/notifications/src/notifications.service';
import { PaymentsCreateChargeDto } from 'apps/payments/src/dtos/payments-create-charge.dto';
import { StripeService } from 'apps/payments/src/providers/stripe.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeService: StripeService, @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy) {}

  async createCharge(input: PaymentsCreateChargeDto) {
    const { amount, email } = input
    
    const paymentIntent = await this.stripeService.createPaymentIntent( amount * 100)

    this.notificationsService.emit('notify_email', {email, text: `Your payment  of $${amount} has completed successfully`})

    return paymentIntent
  }
}
