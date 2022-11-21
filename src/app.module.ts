import { Module } from '@nestjs/common';
import { AuthorModule } from './authors/author.module';
import { BookModule } from './books/book.module';

@Module({
  imports: [AuthorModule, BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
