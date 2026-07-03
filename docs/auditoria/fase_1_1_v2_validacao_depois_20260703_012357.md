# Validação depois da normalização — Fase 1.1 V2

Data: 2026-07-03T01:24:05.231584

## Resultado crítico
- Tabela `clock_policies`: EXISTE
- Coluna `clock_policies.updated_at`: OK

## Migration
```text
fase_1_1_diagnostico_normalizacao_v2|2026-07-03 01:24:01.294279+00
```

## Coluna updated_at depois
- saas_plans: OK
- saas_clients: OK
- tenant_module_flags: OK
- super_admin_users: OK
- audit_logs_unified: AUSENTE/SEM TABELA
- rh_saas_schema_migrations: AUSENTE/SEM TABELA
- hr_companies: OK
- hr_branches: OK
- hr_departments: OK
- hr_cost_centers: OK
- hr_job_positions: OK
- hr_job_functions: OK
- hr_work_locations: OK
- hr_geofences: OK
- hr_employee_profiles: OK
- clock_event_types: OK
- clock_policies: OK
- clock_policy_event_types: OK
- mobile_app_settings: OK
- mobile_devices: OK
- mobile_sync_batches: OK
- clock_events_foundation: OK
- location_tracking_points: OK
- documents_foundation: OK
- document_recipients_foundation: OK
- payslips_foundation: OK
- time_bank_balances_foundation: OK
- clock_justifications_foundation: OK

## Contagens depois
- audit_logs_unified: 0
- clock_event_types: 18
- clock_events_foundation: 0
- clock_justifications_foundation: 0
- clock_policies: 0
- clock_policy_event_types: 0
- document_recipients_foundation: 0
- documents_foundation: 0
- hr_branches: 0
- hr_companies: 1
- hr_cost_centers: 3
- hr_departments: 3
- hr_employee_profiles: 3
- hr_geofences: 1
- hr_job_functions: 4
- hr_job_positions: 5
- hr_work_locations: 1
- location_tracking_points: 0
- mobile_app_settings: 0
- mobile_devices: 0
- mobile_sync_batches: 0
- payslips_foundation: 0
- rh_saas_schema_migrations: 1
- saas_clients: 1
- saas_plans: 3
- super_admin_users: 0
- tenant_module_flags: 11
- time_bank_balances_foundation: 0
