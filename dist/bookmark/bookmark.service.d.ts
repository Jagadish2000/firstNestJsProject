import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BookmarkService {
    private prisma;
    constructor(prisma: PrismaService);
    addBookmark(userId: number, bookId: string, pagenum: string): Promise<Bookmark>;
    removeBookmark(userId: number, bookmark: Bookmark): Promise<Bookmark>;
}
