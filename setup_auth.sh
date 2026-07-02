#!/bin/bash
# ==============================================================================
# Setup do Módulo de Autenticação (JWT) - SaaS RH/DP
# ==============================================================================

cd /opt/rh-saas/backend

echo "🟢 Instalando dependências do JWT e Passport para o NestJS..."
npm install --save @nestjs/jwt @nestjs/passport passport passport-jwt
npm install --save-dev @types/passport-jwt

echo "🟢 Adicionando chaves secretas no .env..."
# Adiciona a chave secreta apenas se ela não existir no arquivo
if ! grep -q "JWT_SECRET" .env; then
  echo "" >> .env
  echo "# Autenticação" >> .env
  # Em produção, essa chave deve ser um hash longo e complexo gerado aleatoriamente
  echo "JWT_SECRET=ChaveSuperSecretaRepP2024!@#" >> .env 
  echo "JWT_EXPIRATION=8h" >> .env
fi

echo "🟢 Criando estrutura de pastas do Módulo de Auth e Users..."
mkdir -p src/modules/auth/strategies
mkdir -p src/modules/auth/guards
mkdir -p src/modules/users

# ------------------------------------------------------------------------------
# 1. ENTIDADE DE USUÁRIO (O Básico para o Login funcionar)
# ------------------------------------------------------------------------------
echo "🟢 Criando Entidade de Usuário..."
cat << 'EOF' > src/modules/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ unique: true })
  email: string;

  // A senha já virá em Hash (Bcrypt) do banco de dados
  @Column()
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;
}
EOF

# ------------------------------------------------------------------------------
# 2. GUARDIÃO DE AUTENTICAÇÃO (O que tranca as rotas)
# ------------------------------------------------------------------------------
echo "🟢 Criando Guardião JWT (JwtAuthGuard)..."
cat << 'EOF' > src/modules/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Aqui você pode adicionar lógicas extras de bloqueio se necessário
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido ou expirado. Faça login novamente.');
    }
    return user; // Injota o usuário na requisição (request.user)
  }
}
EOF

# ------------------------------------------------------------------------------
# 3. ESTRATÉGIA JWT (Como o NestJS valida e decodifica o token)
# ------------------------------------------------------------------------------
echo "🟢 Criando Estratégia JWT..."
cat << 'EOF' > src/modules/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extrai o token do cabeçalho de Autorização (Bearer Token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // O payload retornado aqui é anexado automaticamente em request.user
  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      tenantId: payload.tenantId, 
      email: payload.email 
    };
  }
}
EOF

# ------------------------------------------------------------------------------
# 4. SERVIÇO DE AUTENTICAÇÃO (Validação de credenciais e geração do Token)
# ------------------------------------------------------------------------------
echo "🟢 Criando Serviço de Auth..."
cat << 'EOF' > src/modules/auth/auth.service.ts
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
EOF

# ------------------------------------------------------------------------------
# 5. CONTROLLER DE AUTENTICAÇÃO (A Rota /login)
# ------------------------------------------------------------------------------
echo "🟢 Criando Controller de Auth..."
cat << 'EOF' > src/modules/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    return this.authService.login(user);
  }
}
EOF

# ------------------------------------------------------------------------------
# 6. DTO DE LOGIN
# ------------------------------------------------------------------------------
echo "🟢 Criando DTO de Login..."
mkdir -p src/modules/auth/dto
cat << 'EOF' > src/modules/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Forneça um e-mail válido.' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}
EOF

# ------------------------------------------------------------------------------
# 7. MÓDULO DE AUTENTICAÇÃO
# ------------------------------------------------------------------------------
echo "🟢 Empacotando o Módulo de Auth..."
cat << 'EOF' > src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
EOF

echo "✅ Módulo de Autenticação criado com sucesso! Lembre-se de importar o AuthModule no app.module.ts"
