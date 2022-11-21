import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
  ) {}
  getAll() {
    return this.bookRepository.find();
  }

  getById(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

  create({ title, authorId }: CreateBookDto) {
    return this.bookRepository.save({
      title,
      author: { id: authorId },
    });
  }

  async delete(id: number) {
    await this.bookRepository.delete(id);
  }

  async update(id: number, { title }: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    book.title = title;
    await this.bookRepository.save(book);
  }
}
