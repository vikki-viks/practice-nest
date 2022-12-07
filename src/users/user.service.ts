import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { hashPassword, validatePassword } from 'src/utils/filesecurity';
import { InitiateRegistrationDto } from './dto/initiate-registration.dto';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private mailSenderService: MailSenderService,
  ) {}

  async create({ username, password }: CreateUserDto) {
    const hash = await hashPassword(password);
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
    const isMatch = await validatePassword(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async initiateRegistration({ email, password }: InitiateRegistrationDto) {
    const hash = await hashPassword(password);
    await this.userRepository.save({
      username: email,
      password: hash,
    });
    await this.mailSenderService.sendEmail({
      userMail: email,
      subject: 'test',
      text: 'test2',
    });
  }
}
