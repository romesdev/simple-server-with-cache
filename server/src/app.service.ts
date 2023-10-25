import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user-repository';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findMany();
  }
}
