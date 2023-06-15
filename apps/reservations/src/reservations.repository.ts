import { DatabaseService } from '@app/common/database/database.service';
import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { CreateReservationDto } from 'apps/reservations/src/dto/create-reservation.dto';
import { UpdateReservationDto } from 'apps/reservations/src/dto/update-reservation.dto';

@Injectable()
export class ReservationsRepository {
  private readonly logger: Logger;

  constructor(private readonly databaseService: DatabaseService) {
    this.logger = new Logger(ReservationsRepository.name);
  }

  async create(params: CreateReservationDto): Promise<Reservation> {
    return this.databaseService.reservation.create({
      data: {
        startDate: new Date(params.startDate),
        endDate: new Date(params.endDate),
      },
    });
  }

  async findAll(): Promise<Reservation[]> {
    return this.databaseService.reservation.findMany();
  }

  async findOne(uuid: string): Promise<Reservation> {
    return this.databaseService.reservation.findUniqueOrThrow({
      where: { uuid },
    });
  }

  async update(
    uuid: string,
    dates: UpdateReservationDto,
  ): Promise<Reservation> {
    try {
      const updatedReservation = await this.databaseService.reservation.update({
        where: { uuid },
        data: {
          startDate: new Date(dates.startDate),
          endDate: new Date(dates.endDate),
        },
      });

      return updatedReservation;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(uuid: string): Promise<Reservation> {
    try {
      const deletedReservation = await this.databaseService.reservation.delete({
        where: { uuid },
      });

      return deletedReservation;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
