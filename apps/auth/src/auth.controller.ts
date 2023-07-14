import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'apps/auth/src/auth.service';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'apps/auth/src/guards/local-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user
  }
}
