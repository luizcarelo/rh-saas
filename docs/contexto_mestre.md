# CONTEXTO\_MESTRE.md

**Projeto:** RH SaaS Multiempresa  
**Data de referência:** Julho/2026  
**Status:** Backend corporativo operacional com Dashboard, Reports, Banco de Horas, Escalas, Auditoria e Super Admin.

***

# 1. VISÃO GERAL

Sistema SaaS de RH multiempresa com:

```text
✅ Multi Tenant
✅ Usuários
✅ Colaboradores
✅ Gestão Documental
✅ Ponto Eletrônico
✅ Escalas
✅ Banco de Horas
✅ Dashboard
✅ Relatórios
✅ Auditoria
✅ Super Admin
```

Arquitetura:

```text
Frontend
   ↓
NestJS
   ↓
PostgreSQL
   ↓
Docker Compose
```

Servidor:

```text
Debian Linux
Docker
Docker Compose
PostgreSQL
Node 20
NestJS
```

***

# 2. PREFERÊNCIAS DO PROJETO

## Obrigatório

Antes de qualquer alteração:

```text
1. Informar a mudança proposta
2. Aguardar aprovação
3. Executar alteração
4. Atualizar documentação
```

Documentos obrigatórios:

```text
CONTEXTO_PROJETO.md
CHANGELOG.md
DECISOES_TECNICAS.md
PENDENCIAS.md
```

***

## Desenvolvimento

Preferências:

```text
✅ PT-BR
✅ Scripts completos
✅ Evitar passos manuais
✅ Alterações em blocos maiores
✅ Sempre gerar backup
```

***

# 3. ESTRUTURA DOS MÓDULOS

## Tenant

Módulo:

```text
src/modules/tenant
```

Endpoints:

```http
GET /v1/tenant
PUT /v1/tenant
```

Campos atuais:

```text
id
cnpj
corporateName
tradingName
isActive

phone
email
address
website
hrManager
logoUrl
```

Tabela:

```sql
tenants
```

***

## Auth

Endpoints:

```http
POST /v1/auth/login
```

JWT:

```text
JwtAuthGuard
```

Protegendo praticamente todas as APIs.

***

## Users

Endpoints:

```http
POST /v1/users
GET /v1/users
```

***

## Employees

Endpoints:

```http
POST /v1/employees
GET /v1/employees
GET /v1/employees/:id
DELETE /v1/employees/:id

PUT /v1/employees/:id/link-user
DELETE /v1/employees/:id/link-user
```

***

## Documents

Endpoints:

```http
POST /v1/documents/upload
GET /v1/documents/my-docs
```

***

# 4. MÓDULO ESCALAS

## Arquivos

```text
src/modules/schedules
```

***

## Entidade

```ts
Schedule
```

Tipos:

```ts
FIXED
SHIFT_12X36
```

Enum:

```ts
ScheduleType
```

***

## CRUD

```http
GET /v1/schedules
GET /v1/schedules/:id

POST /v1/schedules

PUT /v1/schedules/:id

DELETE /v1/schedules/:id
```

***

## Vínculo de Escalas

Tabela:

```text
employee_schedules
```

***

Endpoints:

```http
POST /v1/schedules/assign

GET /v1/schedules/employee/:employeeId

GET /v1/schedules/employee/:employeeId/active

DELETE /v1/schedules/assign/:id

PATCH /v1/schedules/assign/:id/end
```

***

## Auditoria

Eventos:

```text
SCHEDULE_CREATED
SCHEDULE_UPDATED
SCHEDULE_DELETED

SCHEDULE_ASSIGNED
SCHEDULE_UNASSIGNED
SCHEDULE_ENDED
```

***

# 5. BANCO DE HORAS

## Módulo

```text
src/modules/time-bank
```

***

## Entidade

```ts
TimeBank
```

Campos:

```text
employeeId
date

expectedMinutes
workedMinutes

balanceMinutes

status
```

***

Status:

```text
OPEN
CLOSED
```

***

## Endpoints

```http
GET /v1/time-bank

GET /v1/time-bank/:employeeId

GET /v1/time-bank/:employeeId/details

POST /v1/time-bank/recalculate
```

***

## Integração

Fluxo:

```text
ClockEvent
      ↓
Schedules
      ↓
TimeBank
```

***

## Auditoria

```text
TIMEBANK_RECALCULATED
```

***

# 6. PONTO ELETRÔNICO

## Endpoints

```http
POST /v1/time-records/clock-in

GET /v1/time-records/afd

POST /v1/time-records/simulate-math
```

***

## Fluxo

```text
Clock In
     ↓
ClockEvent
     ↓
Banco de Horas
```

***

# 7. DASHBOARD

## Módulo

```text
src/modules/dashboard
```

***

## Endpoints

```http
GET /v1/dashboard/overview

GET /v1/dashboard/employees

GET /v1/dashboard/time-bank

GET /v1/dashboard/schedules

GET /v1/dashboard/time-records
```

***

## Sprint 4.4A

Endpoint adicional:

```http
GET /v1/dashboard/executive
```

***

Indicadores:

```text
employees
users
schedules

positiveBalance
negativeBalance

timeBankRecords
```

***

# 8. REPORTS

## Módulo

```text
src/modules/reports
```

***

## Endpoints

```http
GET /v1/reports/employees

GET /v1/reports/schedules

GET /v1/reports/time-bank

GET /v1/reports/afd
```

***

## Sprint 4.5

Endpoints adicionais:

```http
GET /v1/reports/executive

GET /v1/reports/productivity

GET /v1/reports/time-bank-summary

GET /v1/reports/schedule-distribution
```

***

## reports.service.ts

Métodos esperados:

```text
employees()
schedules()
timeBank()
afd()

executive()
productivity()
timeBankSummary()
scheduleDistribution()
```

Importante:

```text
Remover duplicações de executive()
Remover duplicações de timeBankSummary()
```

***

# 9. ANALYTICS

## Módulo

```text
src/modules/analytics
```

***

Endpoints:

```http
GET /v1/analytics/overview
```

Sprint 4.5:

```http
GET /v1/analytics/workforce
```

***

# 10. AUDITORIA

## Endpoints

```http
GET /audit

GET /audit/:id
```

Sprint 4.3B:

```http
GET /audit/action/:action

GET /audit/entity/:entityType
```

***

## Ordem correta do Controller

Obrigatório:

```ts
@Get()

@Get('action/:action')

@Get('entity/:entityType')

@Get(':id')
```

`@Get(':id')` deve ficar por último.

***

## Eventos Implementados

```text
LOGIN

USER_CREATED

EMPLOYEE_CREATED
EMPLOYEE_DELETED

USER_LINKED
USER_UNLINKED

DOCUMENT_UPLOADED

CLOCK_IN

TENANT_UPDATED

SCHEDULE_CREATED
SCHEDULE_UPDATED
SCHEDULE_DELETED

SCHEDULE_ASSIGNED
SCHEDULE_UNASSIGNED
SCHEDULE_ENDED

TIMEBANK_RECALCULATED
```

***

# 11. SUPER ADMIN

Endpoints:

```http
/v1/super-admin/*
```

***

Possui:

```text
Clientes
Planos
Métricas
Saúde do Sistema
Dashboard Global
Auditoria
```

***

# 12. BANCO DE DADOS

## PostgreSQL

Variáveis:

```env
DB_HOST=postgres_db
DB_PORT=5432

DB_USERNAME=admin_rh_saas
DB_PASSWORD=SenhaForte123!

DB_DATABASE=rh_saas_db
```

***

## Tenant

Tabela:

```sql
tenants
```

Campos atuais:

```sql
id
cnpj
corporate_name
trading_name

is_active

phone
email
address
website
hr_manager
logo_url

created_at
updated_at
```

***

# 13. DOCKER

Build API:

```bash
cd /opt/rh-saas/backend

npm run build
```

***

Deploy:

```bash
cd /opt/rh-saas

docker compose -f docker-compose.prod.yml build api

docker compose -f docker-compose.prod.yml up -d --force-recreate api
```

***

Logs:

```bash
docker logs --tail=200 rh_saas_api
```

***

# 14. STATUS FINAL

## Concluído

```text
✅ Sprint 4.1
Escalas + Banco de Horas

✅ Sprint 4.2
Dashboard

✅ Sprint 4.3A
Reports

✅ Sprint 4.3B
Auditoria Avançada

✅ Sprint 4.4A
Dashboard Executivo

🟡 Sprint 4.4B
Company Settings
(banco concluído)

🟡 Sprint 4.5
Reports Executivos
(parcial)
```

***

# 15. PRÓXIMA PRIORIDADE

## Sprint 4.5

Finalizar:

```text
reports.service.ts
reports.controller.ts

analytics.service.ts
analytics.controller.ts
```

Validar:

```http
GET /v1/reports/executive
GET /v1/reports/productivity
GET /v1/reports/time-bank-summary
GET /v1/reports/schedule-distribution

GET /v1/analytics/workforce
```

Depois:

```text
🚀 Sprint 5.0
Frontend Corporativo
```
