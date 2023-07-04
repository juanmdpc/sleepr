import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly uuid?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly email?: string
}