/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Book } from '../models/book.model';
import { LibraryService } from '../services/library.service';

@Controller('books')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('/createBook')
  async createBook(@Res() response, @Body() book: Book) {
    const newBook = await this.libraryService.createBook(book);
    return response.status(HttpStatus.CREATED).json({
      newBook,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const books = await this.libraryService.findAll();
    return response.status(HttpStatus.OK).json({
      books,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const book = await this.libraryService.findOne(id);
    return response.status(HttpStatus.OK).json({
      book,
    });
  }
  @Put(':id')
  async update(@Res() response,@Param('id') id: string, @Body() book: Book) {
    const bookRes = await this.libraryService.update(id,book);
    return response.status(HttpStatus.OK).json({
        bookRes,
    });  }

  @Delete(':id')
  async remove(@Res() response,@Param('id') id: string) {
    const book = await this.libraryService.delete(id);
    return response.status(HttpStatus.OK).json({
      book,
    });  }
}
