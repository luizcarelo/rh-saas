# GAP ANALYSIS - FOUNDATION x NESTJS

Data: 2026-07-04 11:37:06.703017

## Resumo Executivo

- Tabelas Foundation analisadas: 27
- Com Entity no NestJS: 2
- Sem Entity no NestJS: 25
- Com Controller detectado: 1
- Com Service detectado: 11
- Com Module detectado: 2
- Registradas no AppModule: 2

## Resumo por Domínio

| Domínio | Tabelas | Com Entity | Sem Entity |
|---|---:|---:|---:|
| clock | 5 | 1 | 4 |
| documents | 2 | 1 | 1 |
| geofence | 2 | 0 | 2 |
| hr | 7 | 0 | 7 |
| mobile | 3 | 0 | 3 |
| payroll | 1 | 0 | 1 |
| saas | 5 | 0 | 5 |
| timebank | 1 | 0 | 1 |
| tracking | 1 | 0 | 1 |

## Tabelas Foundation

| Tabela | Domínio | Registros | Entity | Service | Controller | Module | AppModule |
|---|---|---:|---|---|---|---|---|
| saas_clients | saas | 1 | ❌ | ✅ | ❌ | ❌ | ❌ |
| saas_plans | saas | 3 | ❌ | ✅ | ❌ | ❌ | ❌ |
| tenant_module_flags | saas | 11 | ❌ | ✅ | ❌ | ❌ | ❌ |
| tenant_module_audit | saas | 2 | ❌ | ✅ | ❌ | ❌ | ❌ |
| tenant_client_audit | saas | 0 | ❌ | ✅ | ❌ | ❌ | ❌ |
| hr_companies | hr | 1 | ❌ | ✅ | ❌ | ❌ | ❌ |
| hr_branches | hr | 0 | ❌ | ❌ | ❌ | ❌ | ❌ |
| hr_departments | hr | 3 | ❌ | ❌ | ❌ | ❌ | ❌ |
| hr_cost_centers | hr | 3 | ❌ | ❌ | ❌ | ❌ | ❌ |
| hr_job_positions | hr | 5 | ❌ | ❌ | ❌ | ❌ | ❌ |
| hr_job_functions | hr | 4 | ❌ | ❌ | ❌ | ❌ | ❌ |
| hr_employee_profiles | hr | 3 | ❌ | ✅ | ❌ | ❌ | ❌ |
| hr_work_locations | geofence | 1 | ❌ | ❌ | ❌ | ❌ | ❌ |
| hr_geofences | geofence | 1 | ❌ | ❌ | ❌ | ❌ | ❌ |
| clock_event_types | clock | 18 | ❌ | ✅ | ❌ | ❌ | ❌ |
| clock_policies | clock | 1 | ❌ | ❌ | ❌ | ❌ | ❌ |
| clock_policy_event_types | clock | 4 | ❌ | ❌ | ❌ | ❌ | ❌ |
| clock_events_foundation | clock | 0 | ✅ | ✅ | ❌ | ✅ | ✅ |
| clock_justifications_foundation | clock | 1 | ❌ | ❌ | ❌ | ❌ | ❌ |
| mobile_devices | mobile | 0 | ❌ | ❌ | ❌ | ❌ | ❌ |
| mobile_app_settings | mobile | 1 | ❌ | ❌ | ❌ | ❌ | ❌ |
| mobile_sync_batches | mobile | 0 | ❌ | ❌ | ❌ | ❌ | ❌ |
| location_tracking_points | tracking | 0 | ❌ | ❌ | ❌ | ❌ | ❌ |
| documents_foundation | documents | 1 | ✅ | ✅ | ✅ | ✅ | ✅ |
| document_recipients_foundation | documents | 3 | ❌ | ❌ | ❌ | ❌ | ❌ |
| time_bank_balances_foundation | timebank | 3 | ❌ | ❌ | ❌ | ❌ | ❌ |
| payslips_foundation | payroll | 1 | ❌ | ✅ | ❌ | ❌ | ❌ |

## Gaps Principais

- saas_clients não possui Entity NestJS mapeada.
- saas_plans não possui Entity NestJS mapeada.
- tenant_module_flags não possui Entity NestJS mapeada.
- tenant_module_audit não possui Entity NestJS mapeada.
- tenant_client_audit não possui Entity NestJS mapeada.
- hr_companies não possui Entity NestJS mapeada.
- hr_branches não possui Entity NestJS mapeada.
- hr_departments não possui Entity NestJS mapeada.
- hr_cost_centers não possui Entity NestJS mapeada.
- hr_job_positions não possui Entity NestJS mapeada.
- hr_job_functions não possui Entity NestJS mapeada.
- hr_employee_profiles não possui Entity NestJS mapeada.
- hr_work_locations não possui Entity NestJS mapeada.
- hr_geofences não possui Entity NestJS mapeada.
- clock_event_types não possui Entity NestJS mapeada.
- clock_policies não possui Entity NestJS mapeada.
- clock_policy_event_types não possui Entity NestJS mapeada.
- clock_justifications_foundation não possui Entity NestJS mapeada.
- mobile_devices não possui Entity NestJS mapeada.
- mobile_app_settings não possui Entity NestJS mapeada.
- mobile_sync_batches não possui Entity NestJS mapeada.
- location_tracking_points não possui Entity NestJS mapeada.
- document_recipients_foundation não possui Entity NestJS mapeada.
- time_bank_balances_foundation não possui Entity NestJS mapeada.
- payslips_foundation não possui Entity NestJS mapeada.

## Candidatos de Migração Legacy → Foundation

- employees → hr_employee_profiles
- sem equivalente direto → hr_work_locations
- sem equivalente direto → hr_geofences
- parcialmente relacionado a time-records → clock_event_types
- sem equivalente direto → clock_policies
- time_records → clock_events_foundation
- sem equivalente direto → mobile_devices
- sem equivalente direto → mobile_app_settings
- sem equivalente direto → mobile_sync_batches
- sem equivalente direto → location_tracking_points
- documents → documents_foundation
- time_bank → time_bank_balances_foundation

## Recomendação Técnica

1. Não criar novas tabelas paralelas para recursos já existentes na Foundation.
2. Criar primeiro Entities NestJS para as tabelas Foundation.
3. Criar módulos read-only para validar a Foundation pelo backend.
4. Migrar gradualmente módulos Legacy para Foundation.
5. Somente após validação, descontinuar tabelas Legacy equivalentes.
