# Backend — Endpoints Planejados

## Autenticação

- POST /v1/auth/login
- POST /v1/auth/refresh
- POST /v1/auth/logout
- GET /v1/auth/me
- GET /v1/mobile/bootstrap

## Ponto

- POST /v1/time-records/clock
- POST /v1/time-records/sync
- GET /v1/time-records/today
- GET /v1/time-records/history
- GET /v1/time-records/afd
- POST /v1/time-records/:id/justify

## Telemetria

- POST /v1/telemetry/location
- POST /v1/telemetry/batch
- GET /v1/telemetry/live
- GET /v1/telemetry/history
