import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  private author = [];

  getAll() {
    return this.author;
  }

  getById(id: string) {
    return this.author.find((p) => p.id === id);
  }

  create(authorDto: CreateBookDto) {
    this.author.push({
      ...authorDto,
      id: Date.now().toString(),
    });
  }
}
