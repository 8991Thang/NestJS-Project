/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { TUser } from './user.type';
import { UserRepository } from './users.repository';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Token } from './jwt.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signAuth(authDto: AuthDto): Promise<TUser> {
    return await this.userRepository.createNewUser(authDto);
  }

  async signIn(authDto: AuthDto): Promise<Token> {
    const { email, password } = authDto;
    const foundUser = await this.userRepository.findOne({ email });
    if (foundUser) {
      const comparePassword = await compare(password, foundUser.password);
      if (comparePassword) {
        const { email } = foundUser;
        const accessToken = this.jwtService.sign({ email });
        return { accessToken };
      }
      throw new BadRequestException('Password not match!!');
    }
    throw new NotFoundException('User does not exit!!');
  }
}
