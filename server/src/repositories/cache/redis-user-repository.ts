import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user-repository';
import { User } from '@prisma/client';
import { RedisService } from 'config/redis';
import { PrismaUserRepository } from '../prisma-repository';

@Injectable()
export class RedisUserRepository implements UserRepository {
  constructor(
    private readonly redis: RedisService,
    private readonly prismaUserRepository: PrismaUserRepository,
  ) {}

  async findMany(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users');

    if (!cachedUsers) {
      const users = await this.prismaUserRepository.findMany();

      await this.redis.set(
        'users',
        JSON.stringify(users),
        'EX', // data expire
        15, // seconds to expire
      );

      return users;
    }

    return JSON.parse(cachedUsers);
  }
}
