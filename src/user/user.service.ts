import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword } from './dto/changePassword.dto';
import * as argon from 'argon2';

@Injectable({})
export class UserService {
  constructor(private strat: JwtService, private prisma: PrismaService) {}

  async borrowBook(userId: number, inputBook: Book) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const book = await this.prisma.book.findUnique({
      where: {
        id: inputBook.id,
      },
    });
    book.userId = userId;
    const due = new Date();
    due.setMonth(1);
    await this.prisma.book.update({
      where: {
        id: book.id,
      },
      data: {
        userId: userId,
        dueDate: due,
      },
    });
  }
  async returnBook(userId: number, inputBook: Book) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const book = await this.prisma.book.findUnique({
      where: {
        id: inputBook.id,
      },
    });
    book.userId = userId;
    const curDate = new Date();
    await this.prisma.book.update({
      where: {
        id: book.id,
      },
      data: {
        userId: null,
      },
    });
    return curDate > book.dueDate
      ? `you were ${Math.floor(
          Math.abs(curDate.getTime() - book.dueDate.getTime()) /
            (1000 * 3600 * 24),
        )} days late`
      : 'you were on time';
  }
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async deleteUser(user: User) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        flaggedForDel: true,
      },
    });
    await this.sleep(24 * 3600 * 1000);
    if (user.flaggedForDel) {
      return await this.prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    }
  }
  async changePassword(dto: ChangePassword) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const passMatches = await argon.verify(user.hash, dto.oldPassword);
    if (!passMatches) {
      throw new ForbiddenException('invalid passowrd');
    }
    const newHash = await argon.hash(dto.newPassword);
    return await this.prisma.user.update({
      where: {
        id: dto.userId,
      },
      data: {
        hash: newHash,
      },
    });
  }
}
