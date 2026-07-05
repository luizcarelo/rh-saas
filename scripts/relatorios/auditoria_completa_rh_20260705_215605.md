# AUDITORIA COMPLETA RH SAAS

05/07/2026 21:56:05

# INFORMACOES GERAIS

Container: rh_saas_postgres
Banco: rh_saas_db
Usuario: admin_rh_saas

## SCHEMAS

- information_schema
- pg_catalog
- pg_temp_3
- pg_temp_4
- pg_toast
- pg_toast_temp_3
- pg_toast_temp_4
- public
- tiger
- tiger_data
- topology

## EXTENSIONS

- fuzzystrmatch
- pgcrypto
- plpgsql
- postgis
- postgis_tiger_geocoder
- postgis_topology
- uuid-ossp

## TABELAS PUBLIC

- audit_events
- audit_logs
- audit_logs_unified
- clock_event_types
- clock_events
- clock_events_foundation
- clock_justifications_foundation
- clock_policies
- clock_policy_event_types
- document_recipients_foundation
- documents
- documents_foundation
- employee_schedules
- employees
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
- rh_saas_schema_migrations
- saas_clients
- saas_plans
- schedules
- spatial_ref_sys
- super_admin_users
- tenant_client_audit
- tenant_module_audit
- tenant_module_flags
- tenants
- time_bank
- time_bank_balances_foundation
- time_records
- users

# CONTAGEM DE REGISTROS

audit_events: 74
audit_logs: 18
audit_logs_unified: 6
clock_event_types: 18
clock_events: 0
clock_events_foundation: 0
clock_justifications_foundation: 1
clock_policies: 1
clock_policy_event_types: 4
document_recipients_foundation: 3
documents: 0
documents_foundation: 1
employee_schedules: 0
employees: 2
hr_branches: 0
hr_companies: 3
hr_cost_centers: 3
hr_departments: 3
hr_employee_profiles: 3
hr_geofences: 1
hr_job_functions: 4
hr_job_positions: 5
hr_work_locations: 1
location_tracking_points: 29
mobile_app_settings: 1
mobile_devices: 4
mobile_sync_batches: 0
payslips_foundation: 1
rh_saas_schema_migrations: 7
saas_clients: 3
saas_plans: 3
schedules: 0
spatial_ref_sys: 8500
super_admin_users: 1
tenant_client_audit: 0
tenant_module_audit: 2
tenant_module_flags: 11
tenants: 3
time_bank: 0
time_bank_balances_foundation: 3
time_records: 14
users: 2

# ESTRUTURA RH


## employees

- id (uuid)
- tenant_id (uuid)
- firstName (character varying)
- lastName (character varying)
- cpf (character varying)
- email (character varying)
- department (character varying)
- jobTitle (character varying)
- admissionDate (date)
- isActive (boolean)
- createdAt (timestamp without time zone)
- updatedAt (timestamp without time zone)
- user_id (uuid)

## hr_employee_profiles

- id (uuid)
- client_id (uuid)
- employee_external_ref (text)
- first_name (text)
- last_name (text)
- cpf (text)
- email (text)
- department_id (uuid)
- job_position_id (uuid)
- job_function_id (uuid)
- admission_date (date)
- status (text)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

## documents

- id (uuid)
- tenant_id (character varying)
- employee_id (character varying)
- filename (character varying)
- path (character varying)
- isSigned (boolean)
- createdAt (timestamp without time zone)

## documents_foundation

- id (uuid)
- client_id (uuid)
- title (text)
- document_type (text)
- status (text)
- requires_signature (boolean)
- requires_selfie (boolean)
- requires_location (boolean)
- file_path (text)
- hash_sha256 (text)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

## employee_schedules

- id (uuid)
- tenant_id (character varying)
- employee_id (character varying)
- schedule_id (uuid)
- start_date (date)
- end_date (date)

## clock_events_foundation

- id (uuid)
- client_id (uuid)
- employee_profile_id (uuid)
- event_type_id (uuid)
- local_event_id (text)
- event_datetime (timestamp with time zone)
- server_received_at (timestamp with time zone)
- source (text)
- sync_status (text)
- latitude (numeric)
- longitude (numeric)
- accuracy_meters (numeric)
- address (text)
- inside_geofence (boolean)
- selfie_required (boolean)
- selfie_file_id (uuid)
- local_hash (text)
- server_hash (text)
- nsr (bigint)
- metadata (jsonb)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

## clock_policies

- id (uuid)
- client_id (uuid)
- name (text)
- description (text)
- gps_required (boolean)
- min_accuracy_meters (integer)
- geofence_required (boolean)
- allow_outside_geofence_with_justification (boolean)
- offline_allowed (boolean)
- max_offline_hours (integer)
- selfie_required (boolean)
- telemetry_enabled (boolean)
- telemetry_interval_minutes (integer)
- is_default (boolean)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

## time_bank

- id (uuid)
- tenant_id (character varying)
- employee_id (character varying)
- date (date)
- expected_minutes (integer)
- worked_minutes (integer)
- balance_minutes (integer)
- status (character varying)
- created_at (timestamp without time zone)
- updated_at (timestamp without time zone)

## time_bank_balances_foundation

- id (uuid)
- client_id (uuid)
- employee_profile_id (uuid)
- reference_date (date)
- balance_minutes (integer)
- credit_minutes (integer)
- debit_minutes (integer)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

# ANALISE TENANT E CLIENT


audit_events
 - tenant_id

audit_logs_unified
 - tenant_id
 - client_id

clock_events
 - tenant_id

clock_events_foundation
 - client_id

clock_justifications_foundation
 - client_id

clock_policies
 - client_id

documents
 - tenant_id

documents_foundation
 - client_id

employee_schedules
 - tenant_id

employees
 - tenant_id

hr_branches
 - client_id

hr_companies
 - client_id

hr_cost_centers
 - client_id

hr_departments
 - client_id

hr_employee_profiles
 - client_id

hr_geofences
 - client_id

hr_job_functions
 - client_id

hr_job_positions
 - client_id

hr_work_locations
 - client_id

location_tracking_points
 - client_id

mobile_app_settings
 - client_id

mobile_devices
 - client_id

mobile_sync_batches
 - client_id

payslips_foundation
 - client_id

saas_clients
 - tenant_id

schedules
 - tenant_id

tenant_client_audit
 - client_id

tenant_module_audit
 - client_id

tenant_module_flags
 - client_id

time_bank
 - tenant_id

time_bank_balances_foundation
 - client_id

time_records
 - tenant_id

users
 - tenant_id

# FOREIGN KEYS

clock_events.tenant_id -> tenants
clock_events_foundation.event_type_id -> clock_event_types
clock_events_foundation.client_id -> saas_clients
clock_events_foundation.employee_profile_id -> hr_employee_profiles
clock_justifications_foundation.client_id -> saas_clients
clock_justifications_foundation.clock_event_id -> clock_events_foundation
clock_justifications_foundation.employee_profile_id -> hr_employee_profiles
clock_policies.client_id -> saas_clients
clock_policy_event_types.policy_id -> clock_policies
clock_policy_event_types.event_type_id -> clock_event_types
document_recipients_foundation.employee_profile_id -> hr_employee_profiles
document_recipients_foundation.document_id -> documents_foundation
documents_foundation.client_id -> saas_clients
employee_schedules.schedule_id -> schedules
employees.tenant_id -> tenants
employees.user_id -> users
hr_branches.client_id -> saas_clients
hr_branches.company_id -> hr_companies
hr_companies.client_id -> saas_clients
hr_cost_centers.client_id -> saas_clients
hr_departments.client_id -> saas_clients
hr_employee_profiles.client_id -> saas_clients
hr_employee_profiles.department_id -> hr_departments
hr_employee_profiles.job_position_id -> hr_job_positions
hr_employee_profiles.job_function_id -> hr_job_functions
hr_geofences.client_id -> saas_clients
hr_geofences.work_location_id -> hr_work_locations
hr_job_functions.client_id -> saas_clients
hr_job_positions.client_id -> saas_clients
hr_work_locations.client_id -> saas_clients
layer.topology_id -> topology
location_tracking_points.employee_profile_id -> hr_employee_profiles
location_tracking_points.device_id -> mobile_devices
location_tracking_points.client_id -> saas_clients
mobile_app_settings.client_id -> saas_clients
mobile_devices.employee_profile_id -> hr_employee_profiles
mobile_devices.client_id -> saas_clients
mobile_sync_batches.employee_profile_id -> hr_employee_profiles
mobile_sync_batches.device_id -> mobile_devices
mobile_sync_batches.client_id -> saas_clients
payslips_foundation.employee_profile_id -> hr_employee_profiles
payslips_foundation.client_id -> saas_clients
saas_clients.plan_id -> saas_plans
tenant_module_flags.client_id -> saas_clients
time_bank_balances_foundation.employee_profile_id -> hr_employee_profiles
time_bank_balances_foundation.client_id -> saas_clients
users.tenant_id -> tenants

# VALIDACAO DE CONSOLIDACAO

VALIDAR: employees
VALIDAR: hr_employee_profiles
VALIDAR: documents
VALIDAR: documents_foundation
VALIDAR: time_bank
VALIDAR: time_bank_balances_foundation