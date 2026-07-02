import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// Importaremos o repositório de usuários quando o módulo de Users estiver completo
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // MOCK: Substitua pela busca real no banco via usersService
    const mockUser = {
      id: 'uuid-do-funcionario',
      tenantId: 'uuid-da-empresa',
      email: 'colaborador@empresa.com',
      passwordHash: await bcrypt.hash('Senha123', 10), // Apenas para teste
      isActive: true,
    };

    if (mockUser && mockUser.isActive) {
      const isMatch = await bcrypt.compare(pass, mockUser.passwordHash);
      if (isMatch) {
        const { passwordHash, ...result } = mockUser;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      tenantId: user.tenantId 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user_info: payload
    };
  }
}
