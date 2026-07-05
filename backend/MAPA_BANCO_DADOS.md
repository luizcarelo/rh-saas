# MAPA DO BANCO RH SAAS

Gerado em: 2026-07-04 11:13:50.577329

Tabelas encontradas: 44

## audit_events

Registros: 2

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| tenant_id | character varying |
| user_id | character varying |
| action | character varying |
| entity_type | character varying |
| entity_id | character varying |
| details | text |
| created_at | timestamp without time zone |

## audit_logs

Registros: 18

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| userId | character varying |
| action | character varying |
| resource | character varying |
| payload | jsonb |
| ipAddress | character varying |
| timestamp | timestamp without time zone |

## audit_logs_unified

Registros: 6

| Coluna | Tipo |
|---------|---------|
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

## clock_event_types

Registros: 18

| Coluna | Tipo |
|---------|---------|
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

## clock_events

Registros: 0

| Coluna | Tipo |
|---------|---------|
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

## clock_events_foundation

Registros: 0

| Coluna | Tipo |
|---------|---------|
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

## clock_justifications_foundation

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## clock_policies

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## clock_policy_event_types

Registros: 4

| Coluna | Tipo |
|---------|---------|
| policy_id | uuid |
| event_type_id | uuid |
| enabled | boolean |
| requires_selfie | boolean |
| requires_geofence | boolean |
| requires_justification | boolean |
| display_order | integer |
| updated_at | timestamp with time zone |

## document_recipients_foundation

Registros: 3

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| document_id | uuid |
| employee_profile_id | uuid |
| status | text |
| viewed_at | timestamp with time zone |
| signed_at | timestamp with time zone |
| evidence | jsonb |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## documents

Registros: 0

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| tenant_id | character varying |
| employee_id | character varying |
| filename | character varying |
| path | character varying |
| isSigned | boolean |
| createdAt | timestamp without time zone |

## documents_foundation

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## employee_schedules

Registros: 0

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| tenant_id | character varying |
| employee_id | character varying |
| schedule_id | uuid |
| start_date | date |
| end_date | date |

## employees

Registros: 2

| Coluna | Tipo |
|---------|---------|
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

## geography_columns

Registros: 0

| Coluna | Tipo |
|---------|---------|
| f_table_catalog | name |
| f_table_schema | name |
| f_table_name | name |
| f_geography_column | name |
| coord_dimension | integer |
| srid | integer |
| type | text |

## geometry_columns

Registros: 12

| Coluna | Tipo |
|---------|---------|
| f_table_catalog | character varying |
| f_table_schema | name |
| f_table_name | name |
| f_geometry_column | name |
| coord_dimension | integer |
| srid | integer |
| type | character varying |

## hr_branches

Registros: 0

| Coluna | Tipo |
|---------|---------|
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

## hr_companies

Registros: 1

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| legal_name | text |
| trade_name | text |
| document_number | text |
| state_registration | text |
| municipal_registration | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## hr_cost_centers

Registros: 3

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| code | text |
| name | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## hr_departments

Registros: 3

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| name | text |
| description | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## hr_employee_profiles

Registros: 3

| Coluna | Tipo |
|---------|---------|
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

## hr_geofences

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## hr_job_functions

Registros: 4

| Coluna | Tipo |
|---------|---------|
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

## hr_job_positions

Registros: 5

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| name | text |
| description | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## hr_work_locations

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## location_tracking_points

Registros: 0

| Coluna | Tipo |
|---------|---------|
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

## mobile_app_settings

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## mobile_devices

Registros: 0

| Coluna | Tipo |
|---------|---------|
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

## mobile_sync_batches

Registros: 0

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| device_id | uuid |
| status | text |
| received_at | timestamp with time zone |
| processed_at | timestamp with time zone |
| metadata | jsonb |
| updated_at | timestamp with time zone |

## payslips_foundation

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## rh_saas_schema_migrations

Registros: 7

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| migration_key | text |
| description | text |
| executed_at | timestamp with time zone |
| metadata | jsonb |

## saas_clients

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## saas_plans

Registros: 3

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| code | text |
| name | text |
| description | text |
| is_active | boolean |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## schedules

Registros: 0

| Coluna | Tipo |
|---------|---------|
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

## spatial_ref_sys

Registros: 8500

| Coluna | Tipo |
|---------|---------|
| srid | integer |
| auth_name | character varying |
| auth_srid | integer |
| srtext | character varying |
| proj4text | character varying |

## super_admin_users

Registros: 1

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| email | text |
| full_name | text |
| is_active | boolean |
| notes | text |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## tenant_client_audit

Registros: 0

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| field_name | character varying |
| old_value | text |
| new_value | text |
| changed_by | character varying |
| created_at | timestamp with time zone |

## tenant_module_audit

Registros: 2

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| module_code | character varying |
| old_enabled | boolean |
| new_enabled | boolean |
| changed_by_user_id | uuid |
| changed_by_email | character varying |
| created_at | timestamp without time zone |

## tenant_module_flags

Registros: 11

| Coluna | Tipo |
|---------|---------|
| client_id | uuid |
| module_code | text |
| enabled | boolean |
| settings | jsonb |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## tenants

Registros: 1

| Coluna | Tipo |
|---------|---------|
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

## time_bank

Registros: 0

| Coluna | Tipo |
|---------|---------|
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

## time_bank_balances_foundation

Registros: 3

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| client_id | uuid |
| employee_profile_id | uuid |
| reference_date | date |
| balance_minutes | integer |
| credit_minutes | integer |
| debit_minutes | integer |
| created_at | timestamp with time zone |
| updated_at | timestamp with time zone |

## time_records

Registros: 0

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| tenant_id | character varying |
| employee_id | character varying |
| latitude | numeric |
| longitude | numeric |
| timestamp | timestamp without time zone |

## users

Registros: 2

| Coluna | Tipo |
|---------|---------|
| id | uuid |
| tenant_id | uuid |
| email | character varying |
| passwordHash | character varying |
| isActive | boolean |
| last_login_at | timestamp without time zone |
| created_at | timestamp without time zone |
| updated_at | timestamp without time zone |
| role | character varying |

## Foreign Keys

- clock_events|tenant_id|tenants|id
- clock_events_foundation|event_type_id|clock_event_types|id
- clock_events_foundation|client_id|saas_clients|id
- clock_events_foundation|employee_profile_id|hr_employee_profiles|id
- clock_justifications_foundation|client_id|saas_clients|id
- clock_justifications_foundation|clock_event_id|clock_events_foundation|id
- clock_justifications_foundation|employee_profile_id|hr_employee_profiles|id
- clock_policies|client_id|saas_clients|id
- clock_policy_event_types|policy_id|clock_policies|id
- clock_policy_event_types|event_type_id|clock_event_types|id
- document_recipients_foundation|employee_profile_id|hr_employee_profiles|id
- document_recipients_foundation|document_id|documents_foundation|id
- documents_foundation|client_id|saas_clients|id
- employee_schedules|schedule_id|schedules|id
- employees|tenant_id|tenants|id
- employees|user_id|users|id
- hr_branches|client_id|saas_clients|id
- hr_branches|company_id|hr_companies|id
- hr_companies|client_id|saas_clients|id
- hr_cost_centers|client_id|saas_clients|id
- hr_departments|client_id|saas_clients|id
- hr_employee_profiles|client_id|saas_clients|id
- hr_employee_profiles|department_id|hr_departments|id
- hr_employee_profiles|job_position_id|hr_job_positions|id
- hr_employee_profiles|job_function_id|hr_job_functions|id
- hr_geofences|client_id|saas_clients|id
- hr_geofences|work_location_id|hr_work_locations|id
- hr_job_functions|client_id|saas_clients|id
- hr_job_positions|client_id|saas_clients|id
- hr_work_locations|client_id|saas_clients|id
- layer|topology_id|topology|id
- location_tracking_points|employee_profile_id|hr_employee_profiles|id
- location_tracking_points|device_id|mobile_devices|id
- location_tracking_points|client_id|saas_clients|id
- mobile_app_settings|client_id|saas_clients|id
- mobile_devices|employee_profile_id|hr_employee_profiles|id
- mobile_devices|client_id|saas_clients|id
- mobile_sync_batches|employee_profile_id|hr_employee_profiles|id
- mobile_sync_batches|device_id|mobile_devices|id
- mobile_sync_batches|client_id|saas_clients|id
- payslips_foundation|employee_profile_id|hr_employee_profiles|id
- payslips_foundation|client_id|saas_clients|id
- saas_clients|plan_id|saas_plans|id
- tenant_module_flags|client_id|saas_clients|id
- time_bank_balances_foundation|employee_profile_id|hr_employee_profiles|id
- time_bank_balances_foundation|client_id|saas_clients|id
- users|tenant_id|tenants|id