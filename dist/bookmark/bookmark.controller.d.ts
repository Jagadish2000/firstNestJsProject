import { Bookmark } from '@prisma/client';
import { BookmarkService } from './bookmark.service';
import { JwtService } from '@nestjs/jwt';
export declare class BookmarkController {
    private bookmarkService;
    private jwtService;
    constructor(bookmarkService: BookmarkService, jwtService: JwtService);
    addBookmark(req: any): Promise<Bookmark>;
}
