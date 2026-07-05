# DATABASE REVERSE ENGINEERING

Data: 2026-07-04 11:19:47.720772

Banco: rh_saas_db

Tabelas encontradas: 44

---

## audit_events

Registros: 2

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | character varying |
| user_id | character varying |
| action | character varying |
| entity_type | character varying |
| entity_id | character varying |
| details | text |
| created_at | timestamp without time zone |

---

## audit_logs

Registros: 18

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| userId | character varying |
| action | character varying |
| resource | character varying |
| payload | jsonb |
| ipAddress | character varying |
| timestamp | timestamp without time zone |

---

## audit_logs_unified

Registros: 6

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | uuid |
| client_id | uuid |
| actor_user_id | uuid |
| actor_email | text |
| actor_role | text |
| action | text |
| entity_type | text |
| entity_id | text |
| ip_address | text |
| user_agent | text |
| metadata | jsonb |
| created_at | timestamp with time zone |

---

## clock_event_types

Registros: 18

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| code | text |
| name | text |
| description | text |
| pair_code | text |
| category | text |
| default_order | integer |
| active_by_default | boolean |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

---

## clock_events

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | uuid |
| employee_id | character varying |
| timestamp | timestamp with time zone |
| timezone | character varying |
| eventType | USER-DEFINED |
| latitude | double precision |
| longitude | double precision |
| is_inside_geofence | boolean |
| device_info | text |
| client_ip | character varying |
| rowHash | character varying |

### Foreign Keys

- tenant_id → tenants.id

---

## clock_events_foundation

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| event_type_id | uuid |
| local_event_id | text |
| event_datetime | timestamp with time zone |
| server_received_at | timestamp with time zone |
| source | text |
| sync_status | text |
| latitude | numeric |
| longitude | numeric |
| accuracy_meters | numeric |
| address | text |
| inside_geofence | boolean |
| selfie_required | boolean |
| selfie_file_id | uuid |
| local_hash | text |
| server_hash | text |
| nsr | bigint |
| metadata | jsonb |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- employee_profile_id → hr_employee_profiles.id
- event_type_id → clock_event_types.id

---

## clock_justifications_foundation

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| clock_event_id | uuid |
| justification_type | text |
| description | text |
| status | text |
| attachment_path | text |
| reviewed_by | text |
| reviewed_at | timestamp with time zone |
| review_notes | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- employee_profile_id → hr_employee_profiles.id
- clock_event_id → clock_events_foundation.id

---

## clock_policies

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| name | text |
| description | text |
| gps_required | boolean |
| min_accuracy_meters | integer |
| geofence_required | boolean |
| allow_outside_geofence_with_justification | boolean |
| offline_allowed | boolean |
| max_offline_hours | integer |
| selfie_required | boolean |
| telemetry_enabled | boolean |
| telemetry_interval_minutes | integer |
| is_default | boolean |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## clock_policy_event_types

Registros: 4

### Colunas

| Nome | Tipo |
|------|------|
| policy_id | uuid |
| event_type_id | uuid |
| enabled | boolean |
| requires_selfie | boolean |
| requires_geofence | boolean |
| requires_justification | boolean |
| display_order | integer |
| updated_at | timestamp with time zone |

### Foreign Keys

- policy_id → clock_policies.id
- event_type_id → clock_event_types.id

---

## document_recipients_foundation

Registros: 3

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| document_id | uuid |
| employee_profile_id | uuid |
| status | text |
| viewed_at | timestamp with time zone |
| signed_at | timestamp with time zone |
| evidence | jsonb |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- employee_profile_id → hr_employee_profiles.id
- document_id → documents_foundation.id

---

## documents

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | character varying |
| employee_id | character varying |
| filename | character varying |
| path | character varying |
| isSigned | boolean |
| createdAt | timestamp without time zone |

---

## documents_foundation

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| title | text |
| document_type | text |
| status | text |
| requires_signature | boolean |
| requires_selfie | boolean |
| requires_location | boolean |
| file_path | text |
| hash_sha256 | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## employee_schedules

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | character varying |
| employee_id | character varying |
| schedule_id | uuid |
| start_date | date |
| end_date | date |

### Foreign Keys

- schedule_id → schedules.id

---

## employees

Registros: 2

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | uuid |
| firstName | character varying |
| lastName | character varying |
| cpf | character varying |
| email | character varying |
| department | character varying |
| jobTitle | character varying |
| admissionDate | date |
| isActive | boolean |
| createdAt | timestamp without time zone |
| updatedAt | timestamp without time zone |
| user_id | uuid |

### Foreign Keys

- tenant_id → tenants.id
- user_id → users.id

---

## geography_columns

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| f_table_catalog | name |
| f_table_schema | name |
| f_table_name | name |
| f_geography_column | name |
| coord_dimension | integer |
| srid | integer |
| type | text |

---

## geometry_columns

Registros: 12

### Colunas

| Nome | Tipo |
|------|------|
| f_table_catalog | character varying |
| f_table_schema | name |
| f_table_name | name |
| f_geometry_column | name |
| coord_dimension | integer |
| srid | integer |
| type | character varying |

---

## hr_branches

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| company_id | uuid |
| name | text |
| document_number | text |
| address_line | text |
| city | text |
| state | text |
| postal_code | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- company_id → hr_companies.id

---

## hr_companies

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| legal_name | text |
| trade_name | text |
| document_number | text |
| state_registration | text |
| municipal_registration | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## hr_cost_centers

Registros: 3

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| code | text |
| name | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## hr_departments

Registros: 3

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| name | text |
| description | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## hr_employee_profiles

Registros: 3

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_external_ref | text |
| first_name | text |
| last_name | text |
| cpf | text |
| email | text |
| department_id | uuid |
| job_position_id | uuid |
| job_function_id | uuid |
| admission_date | date |
| status | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- department_id → hr_departments.id
- job_position_id → hr_job_positions.id
- job_function_id → hr_job_functions.id

---

## hr_geofences

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| work_location_id | uuid |
| name | text |
| latitude | numeric |
| longitude | numeric |
| radius_meters | integer |
| is_active | boolean |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- work_location_id → hr_work_locations.id

---

## hr_job_functions

Registros: 4

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| name | text |
| description | text |
| allows_external_visit | boolean |
| allows_travel | boolean |
| allows_overtime | boolean |
| allows_on_call | boolean |
| allows_shift_duty | boolean |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## hr_job_positions

Registros: 5

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| name | text |
| description | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## hr_work_locations

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| name | text |
| address_line | text |
| city | text |
| state | text |
| latitude | numeric |
| longitude | numeric |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## location_tracking_points

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| device_id | uuid |
| tracked_at | timestamp with time zone |
| latitude | numeric |
| longitude | numeric |
| accuracy_meters | numeric |
| address | text |
| source | text |
| metadata | jsonb |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- employee_profile_id → hr_employee_profiles.id
- device_id → mobile_devices.id

---

## mobile_app_settings

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| min_supported_version | text |
| force_update | boolean |
| allow_offline | boolean |
| show_address_before_clock | boolean |
| show_pending_sync_count | boolean |
| privacy_notice_required | boolean |
| settings | jsonb |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## mobile_devices

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| device_uid | text |
| platform | text |
| model | text |
| app_version | text |
| is_active | boolean |
| last_seen_at | timestamp with time zone |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- employee_profile_id → hr_employee_profiles.id

---

## mobile_sync_batches

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| device_id | uuid |
| status | text |
| received_at | timestamp with time zone |
| processed_at | timestamp with time zone |
| metadata | jsonb |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- employee_profile_id → hr_employee_profiles.id
- device_id → mobile_devices.id

---

## payslips_foundation

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| reference_month | integer |
| reference_year | integer |
| title | text |
| file_path | text |
| hash_sha256 | text |
| acknowledged_at | timestamp with time zone |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- employee_profile_id → hr_employee_profiles.id

---

## rh_saas_schema_migrations

Registros: 7

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| migration_key | text |
| description | text |
| executed_at | timestamp with time zone |
| metadata | jsonb |

---

## saas_clients

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | uuid |
| plan_id | uuid |
| slug | text |
| trade_name | text |
| legal_name | text |
| document_number | text |
| status | text |
| timezone | text |
| default_locale | text |
| notes | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- plan_id → saas_plans.id

---

## saas_plans

Registros: 3

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| code | text |
| name | text |
| description | text |
| is_active | boolean |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

---

## schedules

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | character varying |
| name | character varying |
| type | USER-DEFINED |
| workDays | jsonb |
| expected_minutes_per_day | integer |
| daily_tolerance_minutes | integer |
| entry1 | character varying |
| exit1 | character varying |
| entry2 | character varying |
| exit2 | character varying |
| expected_minutes | integer |

---

## spatial_ref_sys

Registros: 8500

### Colunas

| Nome | Tipo |
|------|------|
| srid | integer |
| auth_name | character varying |
| auth_srid | integer |
| srtext | character varying |
| proj4text | character varying |

---

## super_admin_users

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| email | text |
| full_name | text |
| is_active | boolean |
| notes | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

---

## tenant_client_audit

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| field_name | character varying |
| old_value | text |
| new_value | text |
| changed_by | character varying |
| created_at | timestamp with time zone |

---

## tenant_module_audit

Registros: 2

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| module_code | character varying |
| old_enabled | boolean |
| new_enabled | boolean |
| changed_by_user_id | uuid |
| changed_by_email | character varying |
| created_at | timestamp without time zone |

---

## tenant_module_flags

Registros: 11

### Colunas

| Nome | Tipo |
|------|------|
| client_id | uuid |
| module_code | text |
| enabled | boolean |
| settings | jsonb |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id

---

## tenants

Registros: 1

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| cnpj | character varying |
| corporate_name | character varying |
| trading_name | character varying |
| is_active | boolean |
| created_at | timestamp without time zone |
| updated_at | timestamp without time zone |
| phone | character varying |
| email | character varying |
| address | text |
| website | character varying |
| hr_manager | character varying |
| logo_url | text |

---

## time_bank

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | character varying |
| employee_id | character varying |
| date | date |
| expected_minutes | integer |
| worked_minutes | integer |
| balance_minutes | integer |
| status | character varying |
| created_at | timestamp without time zone |
| updated_at | timestamp without time zone |

---

## time_bank_balances_foundation

Registros: 3

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| reference_date | date |
| balance_minutes | integer |
| credit_minutes | integer |
| debit_minutes | integer |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

### Foreign Keys

- client_id → saas_clients.id
- employee_profile_id → hr_employee_profiles.id

---

## time_records

Registros: 0

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | character varying |
| employee_id | character varying |
| latitude | numeric |
| longitude | numeric |
| timestamp | timestamp without time zone |

---

## users

Registros: 2

### Colunas

| Nome | Tipo |
|------|------|
| id | uuid |
| tenant_id | uuid |
| email | character varying |
| passwordHash | character varying |
| isActive | boolean |
| last_login_at | timestamp without time zone |
| created_at | timestamp without time zone |
| updated_at | timestamp without time zone |
| role | character varying |

### Foreign Keys

- tenant_id → tenants.id

---

# FOUNDATION IDENTIFICADA

Tabelas Foundation encontradas: 22

- clock_event_types
- clock_events
- clock_events_foundation
- clock_justifications_foundation
- clock_policies
- clock_policy_event_types
- documents_foundation
- hr_branches
- hr_companies
- hr_cost_centers
- hr_departments
- hr_employee_profiles
- hr_geofences
- hr_job_functions
- hr_job_positions
- hr_work_locations
- location_tracking_points
- mobile_app_settings
- mobile_devices
- mobile_sync_batches
- payslips_foundation
- time_bank_balances_foundation

# CONCLUSÃO

Existem estruturas Foundation no banco que não estão representadas no backend atual.