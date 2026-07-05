# Foundation Read-Only Integration

## Sprint 4.6B-R

A Sprint 4.6B-R criou uma camada inicial de integração read-only entre o backend NestJS e a Foundation existente no banco PostgreSQL.

## Objetivo

Validar e expor a Foundation pelo NestJS sem alterar dados, sem criar tabelas novas e sem substituir imediatamente os módulos legacy.

## Contexto

Durante a engenharia reversa do banco, foi identificado que o PostgreSQL já possui uma arquitetura corporativa avançada chamada Foundation, com tabelas para:

- RH Core
- Ponto eletrônico moderno
- Mobile
- Tracking
- Geofence
- Documentos
- Banco de horas
- SaaS

O backend NestJS atual ainda utilizava principalmente estruturas legacy como:

- employees
- time_records
- documents
- time_bank

A Sprint 4.6B-R inicia a aproximação entre o NestJS e a Foundation existente.

## Módulo criado

src/modules/foundation

## Arquivos principais

- src/modules/foundation/foundation.module.ts
- src/modules/foundation/foundation.service.ts
- src/modules/foundation/foundation.controller.ts

## Entities criadas

- src/modules/foundation/entities/saas-client.entity.ts
- src/modules/foundation/entities/hr-employee-profile.entity.ts
- src/modules/foundation/entities/hr-department.entity.ts
- src/modules/foundation/entities/hr-job-position.entity.ts
- src/modules/foundation/entities/hr-job-function.entity.ts
- src/modules/foundation/entities/hr-work-location.entity.ts
- src/modules/foundation/entities/hr-geofence.entity.ts
- src/modules/foundation/entities/mobile-device.entity.ts
- src/modules/foundation/entities/mobile-app-settings.entity.ts
- src/modules/foundation/entities/location-tracking-point.entity.ts

## Tabelas Foundation contempladas nesta fase

- saas_clients
- hr_employee_profiles
- hr_departments
- hr_job_positions
- hr_job_functions
- hr_work_locations
- hr_geofences
- mobile_devices
- mobile_app_settings
- location_tracking_points

## Endpoints criados

- GET /v1/foundation/overview
- GET /v1/foundation/hr/employees
- GET /v1/foundation/hr/departments
- GET /v1/foundation/hr/job-positions
- GET /v1/foundation/hr/job-functions
- GET /v1/foundation/hr/work-locations
- GET /v1/foundation/hr/geofences
- GET /v1/foundation/mobile/devices
- GET /v1/foundation/mobile/settings
- GET /v1/foundation/tracking/points

## Segurança

Todos os endpoints estão protegidos por JwtAuthGuard.

## Estratégia de tenant/client

A integração utiliza o relacionamento:

tenant_id -> saas_clients.id

para localizar o client_id correspondente ao tenant autenticado.

## Regras desta fase

Esta fase é somente leitura.

- Não cria tabelas.
- Não altera dados.
- Não remove tabelas legacy.
- Não substitui módulos legacy.
- Não migra registros.

## TypeORM

Todas as entities Foundation foram configuradas com synchronize: false para impedir alteração automática no banco.

## Status técnico

A Fase 2A registrou o FoundationModule no AppModule e o build foi validado com sucesso.

## Próximas fases recomendadas

1. Validar endpoints Foundation com JWT.
2. Criar integração read-only para Clock Foundation.
3. Criar integração read-only para Documents Foundation.
4. Criar integração read-only para TimeBank Foundation.
5. Planejar migração gradual de módulos legacy para Foundation.
6. Retomar Live Tracking usando:
   - location_tracking_points
   - mobile_devices
   - mobile_app_settings
   - hr_geofences
   - hr_employee_profiles
