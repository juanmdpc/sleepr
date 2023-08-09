import { CreateChargeDto } from "@app/common";
import { IsEmail } from "class-validator";

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  readonly email: string
}
