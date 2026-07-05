import { AuditModule } from '../audit/audit.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuditModule, 
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AuditModule, ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') ||
          'FallbackSecret!@#2024',
        signOptions: {
          expiresIn:
            (configService.get<string>('JWT_EXPIRATION') ||
              '8h') as any,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],
  controllers: [
    AuthController,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
