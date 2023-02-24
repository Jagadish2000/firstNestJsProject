import { ForbiddenException, Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async addBookmark(userId: number, bookmark: Bookmark) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookmark.bookId,
      },
    });
    if (book.userId != userId) {
      throw new ForbiddenException('the user hasnt borrwed this book');
    }
    return await this.prisma.bookmark.create({
      data: {
        bookId: bookmark.bookId,
        pagenum: bookmark.pagenum,
        description: bookmark.description,
      },
    });
  }
  async removeBookmark(userId: number, bookmark: Bookmark) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookmark.bookId,
      },
    });
    if (book.userId != userId) {
      throw new ForbiddenException('the user hasnt borrwed this book');
    }
    return await this.prisma.bookmark.delete({
      where: {
        id: bookmark.id,
      },
    });
  }
}
