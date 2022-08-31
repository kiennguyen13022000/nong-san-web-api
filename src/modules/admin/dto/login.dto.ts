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
  @IsPhoneNumber('VN', {
    message: 'Tên đăng nhập phải là số điện thoại',
  })
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
