import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create({ username, password }: CreateUserDto) {
    const hash = await bcrypt.hash(password, 10);
    return this.userRepository.save({
      username,
      password: hash,
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
