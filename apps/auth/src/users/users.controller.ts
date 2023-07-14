import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@CurrentUser() user) {
    return this.usersService.getOne({ uuid: user.uuid });
  }
}
