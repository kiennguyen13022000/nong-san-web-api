import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { LoginDto } from '../dto/login.dto';

@ApiTags('[Admin] Đăng nhập')
@Controller('admin')
export class AdminController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
