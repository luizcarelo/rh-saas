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
      // O "||" garante um fallback seguro caso o .env falhe, satisfazendo o TypeScript
      secretOrKey: configService.get<string>('JWT_SECRET') || 'FallbackSecret!@#2024',
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
