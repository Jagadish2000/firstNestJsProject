import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(ldto: LoginDto): Promise<{
        access_token: string;
    }>;
    signIn(sdto: SignUpDto): Promise<import(".prisma/client").User>;
}
