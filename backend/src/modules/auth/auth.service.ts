import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    if (!user.isActive) {
      return null;
    }

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!isMatch) {
      return null;
    }

    const { passwordHash, ...result } = user;

    return result;
  }

  async login(user: any) {

    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role ?? 'EMPLOYEE',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user_info: payload,
    };
  }
}
