import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { hashPassword, validatePassword } from 'src/utils/filesecurity';
import { InitiateRegistrationDto } from './dto/initiate-registration.dto';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { TemporaryTokenService } from 'src/temporary-token/temporary-token.service';
import { FinishRegistrationDto } from './dto/finish-registration.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private mailSenderService: MailSenderService,
    private temporaryTokenService: TemporaryTokenService,
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
    if (isMatch && user.isRegistered) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async initiateRegistration({ email, password }: InitiateRegistrationDto) {
    const hash = await hashPassword(password);
    const user = await this.userRepository.save({
      username: email,
      password: hash,
      isRegistered: false,
    });
    await this.mailSenderService.sendEmail({
      userMail: email,
      subject: 'This is your token',
      text: await this.temporaryTokenService.issue(user.id),
    });
  }

  async finishRegistration({ token }: FinishRegistrationDto) {
    const userId = Number(await this.temporaryTokenService.validate(token));
    this.userRepository.save({
      id: userId,
      isRegistered: true,
    });
  }
}
