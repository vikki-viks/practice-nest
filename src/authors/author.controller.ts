import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  @Get()
  getAll() {
    return this.authorService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.authorService.getById(Number(id));
  }
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Remove' + id;
  }
  @Put(':id')
  update(@Body() updateAuthorDto: UpdateAuthorDto, @Param('id') id: string) {
    return `New name ${updateAuthorDto.name} `;
  }
}
