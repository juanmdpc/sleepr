import { DatabaseService } from '@app/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from 'apps/auth/src/users/dtos/request/get-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(params: CreateUserDto) {
    return this.databaseService.user.create({
      data: {
        ...params,
        password: await bcrypt.hash(params.password, 10),
      },
    });
  }

  async findOne(params: GetUserDto) {
    return this.databaseService.user.findFirst({
      where: params,
    });
  }
}
