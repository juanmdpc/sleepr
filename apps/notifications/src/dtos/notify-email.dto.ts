import { IsEmail, IsString } from "class-validator";

export class NotifyEmailDto {
  @IsEmail()
  readonly email: string

  @IsString()
  readonly text: string
}