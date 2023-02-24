import { User } from '@prisma/client';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword } from './dto/changePassword.dto';
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getMe(user: User): User;
    borrowBook(req: any): Promise<void>;
    returnBook(req: any): Promise<string>;
    changePassword(req: ChangePassword): Promise<User>;
    deleteUser(req: User): Promise<User>;
}
