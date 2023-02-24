import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '@prisma/client';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Post('add')
  addBook(@Body() req: Book) {
    console.log(req);
    return this.bookService.addBook(req);
  }
}
