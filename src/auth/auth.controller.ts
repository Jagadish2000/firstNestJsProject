import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signUp(@Body() ldto: LoginDto) {
    console.log({
      ldto,
    });
    return this.authService.signin(ldto);
  }
  @Post('signUp')
  signIn(@Body() sdto: SignUpDto) {
    return this.authService.signUp(sdto);
  }
}
