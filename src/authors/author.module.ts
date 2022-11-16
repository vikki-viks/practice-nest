import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { authorProviders } from './author.provider';
import { AuthorService } from './author.service';

@Module({
  imports: [DatabaseModule],
  providers: [...authorProviders, AuthorService],
})
export class AuthorModule {}
