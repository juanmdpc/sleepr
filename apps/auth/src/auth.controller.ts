import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'apps/auth/src/auth.service';
import { CurrentUser } from 'apps/auth/src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'apps/auth/src/guards/local-auth.guard';
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
}
