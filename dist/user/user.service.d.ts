import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword } from './dto/changePassword.dto';
export declare class UserService {
    private strat;
    private prisma;
    constructor(strat: JwtService, prisma: PrismaService);
    borrowBook(userId: number, bookId: string): Promise<void>;
    returnBook(userId: number, bookId: string): Promise<string>;
    sleep(ms: number): Promise<unknown>;
    deleteUser(userId: number): Promise<User>;
    changePassword(dto: ChangePassword): Promise<User>;
}
