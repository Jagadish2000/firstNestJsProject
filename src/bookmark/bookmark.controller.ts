import { Controller, Post, Request } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { BookmarkService } from './bookmark.service';
import { JwtService } from '@nestjs/jwt';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
    private jwtService: JwtService,
  ) {}
  @Post('/add')
  addBookmark(@Request() req: any) {
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true });
    const userId = json.sub;
    return this.bookmarkService.addBookmark(userId, req.Body);
  }
}
