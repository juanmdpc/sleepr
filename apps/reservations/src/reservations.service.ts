import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  private readonly logger: Logger;

  constructor(private readonly reservationsRepository: ReservationsRepository, @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy) {
    this.logger = new Logger(ReservationsService.name);
  }

  async create(params: CreateReservationDto, userId: number) {
    return this.paymentsService.send('create_charge', params.charge).pipe(map(() => {
      return this.reservationsRepository.create(params, userId)
    }))
  }

  async findAll() {
    return this.reservationsRepository.findAll();
  }

  async findOne(uuid: string) {
    try {
      const createdReservation = await this.reservationsRepository.findOne(
        uuid,
      );

      return createdReservation;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  async update(uuid: string, data: UpdateReservationDto) {
    try {
      const updatedReservation = await this.reservationsRepository.update(
        uuid,
        data,
      );

      return updatedReservation;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(uuid: string) {
    try {
      const deletedReservation = await this.reservationsRepository.remove(uuid);

      return deletedReservation;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
