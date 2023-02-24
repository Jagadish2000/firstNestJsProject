import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Book, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtStrategy } from 'src/auth/strategy';
import { JwtService } from '@nestjs/jwt';
import { Http2ServerRequest } from 'http2';
import { ChangePassword } from './dto/changePassword.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('/:id')
  getMe(@GetUser() user: User) {
    return user;
  }
  @ApiOperation({ summary: 'borrow a book' })
  @Patch('borrowBook')
  borrowBook(@Body() req: any) {
    console.log(req);
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true });
    const userId = json.sub;
    return this.userService.borrowBook(userId, req.Body.Book);
  }
  @Patch('returnBook')
  returnBook(@Body() req: any) {
    console.log(req);
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true });
    const userId = json.sub;
    return this.userService.returnBook(userId, req.Body.Book);
  }
  @Patch('changePassword')
  changePassword(@Request() req: ChangePassword) {
    console.log(req);
    return this.userService.changePassword(req);
  }
  @Delete('deactivate')
  deleteUser(@Body() req: User) {
    return this.userService.deleteUser(req);
  }
}
