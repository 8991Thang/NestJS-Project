import { Req, UseGuards } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Token } from './jwt.type';
import { TUser } from './user.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() authDto: AuthDto): Promise<TUser> {
    return await this.authService.signAuth(authDto);
  }
  @Post('/signIn')
  async signIn(@Body() authDto: AuthDto): Promise<Token> {
    return await this.authService.signIn(authDto);
  }
}
