import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { bookProviders } from './book.provider';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...bookProviders, BookService],
  controllers: [BookController],
})
export class BookModule {}
