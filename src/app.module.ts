import { Module } from '@nestjs/common';
import { AuthorModule } from './authors/author.module';
import { BookModule } from './books/book.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthorModule, BookModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
