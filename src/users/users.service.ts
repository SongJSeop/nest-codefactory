import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserModel> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
