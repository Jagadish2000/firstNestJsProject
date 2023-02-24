import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async addBook(dto: Book) {
    const book = await this.prisma.book.create({
      data: {
        name: dto.name,
        author: dto.author,
      },
    });
  }
  //async getBook(dto : number)
}
