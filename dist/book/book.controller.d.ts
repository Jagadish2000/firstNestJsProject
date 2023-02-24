import { BookService } from './book.service';
import { Book } from '@prisma/client';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    addBook(req: Book): Promise<void>;
}
