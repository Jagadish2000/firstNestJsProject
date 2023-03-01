import { BookService } from './book.service';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    addBook(req: any): Promise<void>;
}
