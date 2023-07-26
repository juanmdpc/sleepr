import { CreateChargeDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date;

  @IsDate()
  @Type(() => Date)
  readonly endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  readonly charge: CreateChargeDto
}
