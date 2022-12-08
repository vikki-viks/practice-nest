import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailSenderModule } from 'src/mail-sender/mail-sender.module';
import { TemporaryTokenModule } from 'src/temporary-token/temporary-token.module';

@Module({
  imports: [DatabaseModule, MailSenderModule, TemporaryTokenModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService, 'USER_REPOSITORY'],
})
export class UserModule {}
