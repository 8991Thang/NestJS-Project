/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { TUser } from './user.type';
import { UserRepository } from './users.repository';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signAuth(authDto: AuthDto): Promise<TUser> {
    return await this.userRepository.createNewUser(authDto);
  }

  async signIn(authDto: AuthDto): Promise<TUser> {
    const { email, password } = authDto;
    const foundUser = await this.userRepository.findOne({ email });
    if (foundUser) {
      const comparePassword = await compare(password, foundUser.password);
      if (comparePassword) {
        return foundUser;
      }
      throw new BadRequestException('Password not match!!');
    }
    throw new NotFoundException('User does not exit!!');
  }
}
