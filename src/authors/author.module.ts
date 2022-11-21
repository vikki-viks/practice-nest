import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthorController } from './author.controller';
import { authorProviders } from './author.provider';
import { AuthorService } from './author.service';

@Module({
  imports: [DatabaseModule],
  providers: [...authorProviders, AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
