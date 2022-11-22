import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  create({ username, password }: CreateUserDto) {
    return this.userRepository.save({
      username,
      password,
    });
  }
}
