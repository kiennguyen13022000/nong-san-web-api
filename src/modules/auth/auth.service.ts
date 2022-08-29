import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../admin/dto/login.dto';
import { AdminService } from '../admin/services/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.adminService.findOne(username);
    const isMatchPassword = await bcrypt.compare(pass, user.password);
    if (user && isMatchPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
