import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Query,
  Mutation,
  Resolver,
} from '@nestjs/graphql';

import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';

@Resolver('User')
@UseGuards(AuthGuard('jwt'))
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Query('user')
  async findOneById(obj, args, context, info): Promise<User> {
    const { id } = args;
    return await this.usersService.findOneById(+id);
  }

  @Mutation('createUser')
  async create(obj, args: User, context, info): Promise<User> {
    const createdUser = await this.usersService.create(args);
    return createdUser;
  }

}