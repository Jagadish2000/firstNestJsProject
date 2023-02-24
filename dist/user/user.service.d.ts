import { PrismaService } from 'src/prisma/prisma.service';
import { Book, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword } from './dto/changePassword.dto';
export declare class UserService {
    private strat;
    private prisma;
    constructor(strat: JwtService, prisma: PrismaService);
    borrowBook(userId: number, inputBook: Book): Promise<void>;
    returnBook(userId: number, inputBook: Book): Promise<string>;
    sleep(ms: number): Promise<unknown>;
    deleteUser(user: User): Promise<User>;
    changePassword(dto: ChangePassword): Promise<User>;
}
