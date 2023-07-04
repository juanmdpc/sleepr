import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ITokenPayload } from "apps/auth/src/interfaces/token-payload.interface";
import { UsersService } from "apps/auth/src/users/users.service";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authorization,
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate({userId}: ITokenPayload) {
    console.log(userId)
    return this.usersService.getOne({ uuid: userId })
  }
}