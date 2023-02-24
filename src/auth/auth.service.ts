import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { LoginDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect Credentials');
    }
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Incorrect Credentials');
    }
    if (user.flaggedForDel) {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          flaggedForDel: false,
        },
      });
    }
    return this.signToken(user.id, user.email);
  }
  async signUp(dto: SignUpDto) {
    try {
      const hash = await argon.hash(dto.password);
      const emailHash = await argon.hash(dto.email);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          emailHash: emailHash,
          hash: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
