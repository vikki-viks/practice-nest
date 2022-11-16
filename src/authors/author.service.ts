import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
  ) {}

  async getAll() {
    return this.authorRepository.find();
  }

  async getById(id: number) {
    return this.authorRepository.find({
      where: {
        id,
      },
    });
  }

  async create({ name }: CreateAuthorDto) {
    this.authorRepository.create({
      name,
    });
  }
}
