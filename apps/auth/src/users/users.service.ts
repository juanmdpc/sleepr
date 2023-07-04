import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from 'apps/auth/src/users/dtos/request/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(params: CreateUserDto) {
      const user = await this.getOne({email: params.email})

      if (user) {
        throw new UnprocessableEntityException('Email is not valid')
      }

      return this.usersRepository.create(params)
  }

  async validate(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    const isValidPassword = bcrypt.compare(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async getOne(params: GetUserDto) {
    return this.usersRepository.findOne(params);
  }
}
