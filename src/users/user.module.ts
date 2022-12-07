import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailSenderModule } from 'src/mail-sender/mail-sender.module';

@Module({
  imports: [DatabaseModule, MailSenderModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService, 'USER_REPOSITORY'],
})
export class UserModule {}
