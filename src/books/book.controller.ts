import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookService } from './book.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  getAll() {
    return this.bookService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.bookService.getById(Number(id));
  }
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.bookService.delete(Number(id));
    return `Delete book with id ${id}`;
  }
  @Put(':id')
  update(@Body() updateBookDto: UpdateBookDto, @Param('id') id: string) {
    this.bookService.update(Number(id), updateBookDto);
    return `New title ${updateBookDto.title} `;
  }
}
