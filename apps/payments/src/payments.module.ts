import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { StripeService } from 'apps/payments/src/providers/stripe.service';
import { ClientsModule } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE } from '@app/common';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      PORT: Joi.string().required(),
      STRIPE_SECRET_KEY: Joi.string().required(),
      NOTIFICATIONS_HOST: Joi.string().required(),
      NOTIFICATIONS_PORT: Joi.number().required(),
    }),
  }),
  ClientsModule.registerAsync([
    {
      name: NOTIFICATIONS_SERVICE,
      useFactory: (configService: ConfigService) => ({
        options: {
          host: configService.get('NOTIFICATIONS_HOST'),
          port: configService.get('NOTIFICATIONS_PORT')
        }
      }),
      inject: [ConfigService]
    }
  ])],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
})
export class PaymentsModule {}
