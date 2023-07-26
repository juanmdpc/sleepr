import { IsString, IsNotEmpty, IsNumber, IsCreditCard } from "class-validator";

export class CardDto {
  @IsString()
  @IsNotEmpty()
  readonly cvc: string
  
  @IsNumber()
  readonly exp_month: number

  @IsNumber()
  readonly exp_year: number

  @IsCreditCard()
  readonly number: string;
}