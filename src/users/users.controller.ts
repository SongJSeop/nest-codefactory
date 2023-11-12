import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }
}
