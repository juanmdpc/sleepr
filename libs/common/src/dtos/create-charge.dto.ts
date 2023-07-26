import { CardDto } from "@app/common/dtos/card.dto";
import { Type } from "class-transformer";
import { IsCreditCard, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  readonly card: CardDto

  @IsNumber()
  readonly amount: number
}