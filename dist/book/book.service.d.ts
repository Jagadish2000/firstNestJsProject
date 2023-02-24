import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
    addBook(dto: Book): Promise<void>;
}
