import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signin(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    signUp(dto: SignUpDto): Promise<import(".prisma/client").User>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
}
