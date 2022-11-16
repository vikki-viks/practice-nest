import { Author } from 'src/authors/author.entity';
import { Book } from 'src/books/book.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'book',
        entities: [Author, Book],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
