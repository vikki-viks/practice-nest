import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/author.entity';
import { Book } from './books/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'books',
      entities: [Author, Book],
      synchronize: true,
      migrations: [
        /*...*/
      ],
      migrationsTableName: 'migration',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
