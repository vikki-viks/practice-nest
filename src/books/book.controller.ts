import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookService } from './book.service';

@Controller('book')
export class AuthorController {
  constructor(private bookService: BookService) {}
  @Get()
  getAll() {
    return this.bookService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.bookService.getById(id);
  }
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Remove' + id;
  }
  @Put(':id')
  update(@Body() updateBookDto: UpdateBookDto, @Param('id') id: string) {
    return `New title ${updateBookDto.title} `;
  }
}
