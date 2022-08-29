import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'tên đăng nhập',
    default: 'admin@sims.com',
  })
  username: string;

  @ApiProperty({
    description: 'mật khẩu',
    default: 'sims@123',
  })
  password: string;
}
