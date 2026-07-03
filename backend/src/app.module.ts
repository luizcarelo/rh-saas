import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// TODOS os Módulos do Sistema
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AuthModule } from "./modules/auth/auth.module"; // <-- AQUI ESTAVA O PROBLEMA!
import { DocumentsModule } from "./modules/documents/documents.module";
import { EmployeesModule } from "./modules/employees/employees.module";
import { SchedulesModule } from "./modules/schedules/schedules.module";
import { TimeBankModule } from "./modules/time-bank/time-bank.module";
import { TimeRecordsModule } from "./modules/time-records/time-records.module";

// Entidades "soltas" (Sem módulo próprio)
import { Tenant } from './modules/tenant/tenant.entity';
import { ClockEvent } from './modules/clock-events/clock-event.entity';
import { User } from './modules/users/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuditModule } from './modules/audit/audit.module';
import { SuperAdminModule } from "./modules/super-admin/super-admin.module";
@Module({
  imports: [
    AuditModule,
    SuperAdminModule,
    AnalyticsModule,
    AuthModule,
    UsersModule,
    DocumentsModule,
    EmployeesModule,
    SchedulesModule,
    TimeBankModule,
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
        
        entities: [Tenant, ClockEvent, User], // Traz as soltas (User é crucial pro Auth)
        autoLoadEntities: true, 
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
  ],
})
export class AppModule {}
