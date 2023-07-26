import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repository';
import { AUTH_SERVICE, DatabaseModule, PAYMENTS_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT: Joi.string().required(),
      })
    }),
    ClientsModule.registerAsync([
      { name: AUTH_SERVICE, 
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT')
          },
        }),
        inject: [ConfigService] 
      },
      { name: PAYMENTS_SERVICE, 
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get('PAYMENTS_HOST'),
            port: configService.get('PAYMENTS_PORT')
          },
        }),
        inject: [ConfigService] 
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
