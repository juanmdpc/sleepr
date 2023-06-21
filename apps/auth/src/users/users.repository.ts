import { DatabaseService } from '@app/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(params: CreateUserDto) {
    return this.databaseService.user.create({
      data: params,
    });
  }
}
