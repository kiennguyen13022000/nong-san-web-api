import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'SĐT đăng nhập',
    default: '0999999999',
  })
  username: string;

  @ApiProperty({
    description: 'mật khẩu',
    default: 'sims1234',
  })
  password: string;
}
