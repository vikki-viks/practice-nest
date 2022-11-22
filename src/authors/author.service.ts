import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

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
    return this.authorRepository.findOne({
      where: {
        id,
      },
    });
  }

  create({ name }: CreateAuthorDto) {
    return this.authorRepository.save({
      name,
    });
  }

  async delete(id: number) {
    await this.authorRepository.delete(id);
  }

  async update(id: number, { name }: UpdateAuthorDto) {
    const author = await this.authorRepository.findOneOrFail({ where: { id } });
    author.name = name;
    await this.authorRepository.save(author);
  }
}
