import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './users.repository';
import { PassportStrategy } from '@nestjs/passport';
// import { TJwtToken } from './jwt.type';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'SECRET_KEY',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found!!');
    }
    return user;

    //   const user = await this.userRepository.findOne()
  }
}
