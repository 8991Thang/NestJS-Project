import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    default: 'thangpham1@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    default: 'thang123',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
