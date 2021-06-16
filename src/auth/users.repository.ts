import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import { TUser } from './user.type';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createNewUser(authDto: AuthDto): Promise<TUser> {
    const { email, password } = authDto;
    const user = this.create({
      email,
      password,
    });
    try {
      const saveUser = await this.save(user);
      if (saveUser) {
        const { password, ...user } = saveUser;
        return user;
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User name has exit!!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
