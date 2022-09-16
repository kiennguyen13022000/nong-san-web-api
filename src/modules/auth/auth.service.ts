import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/services/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminService.findOne(username);
    if (!user) {
      return null;
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return null;
    }

    const result = {
      _id: user._id,
      username: user.username,
      name: user.name,
    };
    return result;
  }

  async login(user: any) {
    return {
      accessToken: this.jwtService.sign(user),
      name: user.name,
      username: user.username,
    };
  }

  async loginCustomer(user: any) {
    return this.jwtService.sign(user);
  }
}
