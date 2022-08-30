import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'SĐT đăng nhập',
    default: '0999999999',
  })
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  username: string;

  @ApiProperty({
    description: 'mật khẩu',
    default: 'sims1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
