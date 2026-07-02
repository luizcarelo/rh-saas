#!/bin/bash
# ==============================================================================
# Setup do Backend NestJS - SaaS RH/DP (Arquitetura Enterprise & Portaria 671)
# ==============================================================================

echo "🟢 Instalando o Node.js 20 LTS (NodeSource) no Debian..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "🟢 Verificando instalações..."
node -v
npm -v

echo "🟢 Instalando o NestJS CLI globalmente..."
npm install -g @nestjs/cli

cd /opt/rh-saas/

echo "🟢 Inicializando novo projeto NestJS (API)..."
# Usamos o npx para criar sem travar o terminal em prompts interativos
npx @nestjs/cli new backend --package-manager npm --skip-git

cd backend

echo "🟢 Instalando dependências de Produção (Banco, Validação e Segurança)..."
npm install --save @nestjs/typeorm typeorm pg @nestjs/config ioredis class-validator class-transformer helmet bcrypt
npm install --save-dev @types/bcrypt

# ------------------------------------------------------------------------------
# CRIAÇÃO DO ARQUIVO DE CONFIGURAÇÃO DE AMBIENTE (.env)
# ------------------------------------------------------------------------------
echo "🟢 Criando arquivo .env de exemplo..."
cat <<EOF > .env
PORT=3000
NODE_ENV=development

# Banco de Dados (Apontando para o container Docker criado no passo anterior)
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=admin_rh_saas
DB_PASSWORD=SenhaForte123!
DB_DATABASE=rh_saas_db

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=SenhaRedis456!
EOF

# ------------------------------------------------------------------------------
# ESTRUTURAÇÃO DO MÓDULO MULTI-TENANT (ISOLAMENTO DE EMPRESAS)
# ------------------------------------------------------------------------------
echo "🟢 Criando estrutura do Módulo de Tenants..."
mkdir -p src/modules/tenant

cat << 'EOF' > src/modules/tenant/tenant.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 14 })
  cnpj: string;

  @Column({ name: 'corporate_name', length: 255 })
  corporateName: string;

  @Column({ name: 'trading_name', length: 255, nullable: true })
  tradingName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
EOF

# ------------------------------------------------------------------------------
# ESTRUTURAÇÃO DO MÓDULO DE PONTO ELETRÔNICO (PORTARIA 671 MTE)
# ------------------------------------------------------------------------------
echo "🟢 Criando estrutura do Módulo de Ponto Eletrônico (REP-P)..."
mkdir -p src/modules/clock-events

# Entidade do Ponto (IMUTÁVEL - Sem campo de Update)
cat << 'EOF' > src/modules/clock-events/clock-event.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

export enum ClockEventType {
  ENTRADA = 'ENTRADA',
  SAIDA_INTERVALO = 'SAIDA_INTERVALO',
  RETORNO_INTERVALO = 'RETORNO_INTERVALO',
  SAIDA = 'SAIDA',
  EXTRA = 'EXTRA'
}

@Entity('clock_events')
export class ClockEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  // A Portaria 671 exige data/hora exata do registro e o fuso horário
  @CreateDateColumn({ name: 'timestamp', type: 'timestamp with time zone' })
  timestamp: Date;

  @Column({ default: 'UTC' })
  timezone: string;

  @Column({ type: 'enum', enum: ClockEventType })
  eventType: ClockEventType;

  // Coordenadas geográficas para validação posterior (PostGIS)
  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ name: 'is_inside_geofence', default: true })
  isInsideGeofence: boolean;

  // Auditoria do dispositivo usado para bater o ponto
  @Column({ name: 'device_info', type: 'text', nullable: true })
  deviceInfo: string;

  @Column({ name: 'client_ip', length: 45, nullable: true })
  clientIp: string;

  // ASSINATURA DIGITAL (HASH SHA-256): Garante que a linha não foi adulterada no banco de dados
  @Column({ type: 'varchar', length: 64, unique: true })
  rowHash: string;
}
EOF

# ------------------------------------------------------------------------------
# CONFIGURAÇÃO DO APP MODULE GLOBAL COM TYPEORM
# ------------------------------------------------------------------------------
echo "🟢 Configurando App Module principal..."
cat << 'EOF' > src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './modules/tenant/tenant.entity';
import { ClockEvent } from './modules/clock-events/clock-event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Tenant, ClockEvent],
        synchronize: configService.get<string>('NODE_ENV') === 'development', // CUIDADO: Desativar em produção (usar migrations)
      }),
    }),
  ],
})
export class AppModule {}
EOF

# ------------------------------------------------------------------------------
# CONFIGURAÇÃO DO MAIN.TS COM SEGURANÇA PADRÃO (HELMET + VALIDATION)
# ------------------------------------------------------------------------------
echo "🟢 Configurando ponto de entrada (main.ts) com segurança..."
cat << 'EOF' > src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Proteção contra vulnerabilidades web conhecidas (Headers HTTP seguros)
  app.use(helmet());

  // Ativa o CORS de forma controlada (Mudar em produção para os domínios do SaaS)
  app.enableCors({ origin: '*' });

  // Força a validação de todas as requisições baseadas nos DTOs com class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API do SaaS de RH rodando com segurança na porta: ${port}`);
}
bootstrap();
EOF

echo "✅ Backend NestJS configurado e estruturado com sucesso!"
