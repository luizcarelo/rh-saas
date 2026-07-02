import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AuditModule } from "./modules/audit/audit.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { TimeRecordsModule } from "./modules/time-records/time-records.module";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './modules/tenant/tenant.entity';
import { ClockEvent } from './modules/clock-events/clock-event.entity';

@Module({
  imports: [
    AnalyticsModule,
    DocumentsModule,
    AuditModule,
    TimeRecordsModule,
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
