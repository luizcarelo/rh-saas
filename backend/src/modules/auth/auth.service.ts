import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly auditService: AuditService,
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

    await this.auditService.create({
      tenantId: user.tenantId,
      userId: user.id,
      entityId: user.id,
      action: 'LOGIN',
      entityType: 'User',
      details: user.email,
    });

    return {
      access_token: this.jwtService.sign(payload),
      user_info: payload,
    };
  }
}
