--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg110+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: admin_rh_saas
--

CREATE SCHEMA tiger;


ALTER SCHEMA tiger OWNER TO admin_rh_saas;

--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: admin_rh_saas
--

CREATE SCHEMA tiger_data;


ALTER SCHEMA tiger_data OWNER TO admin_rh_saas;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: admin_rh_saas
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO admin_rh_saas;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: admin_rh_saas
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder WITH SCHEMA tiger;


--
-- Name: EXTENSION postgis_tiger_geocoder; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_tiger_geocoder IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: clock_events_eventtype_enum; Type: TYPE; Schema: public; Owner: admin_rh_saas
--

CREATE TYPE public.clock_events_eventtype_enum AS ENUM (
    'ENTRADA',
    'SAIDA_INTERVALO',
    'RETORNO_INTERVALO',
    'SAIDA',
    'EXTRA'
);


ALTER TYPE public.clock_events_eventtype_enum OWNER TO admin_rh_saas;

--
-- Name: schedules_type_enum; Type: TYPE; Schema: public; Owner: admin_rh_saas
--

CREATE TYPE public.schedules_type_enum AS ENUM (
    'FIXED',
    'SHIFT_12X36'
);


ALTER TYPE public.schedules_type_enum OWNER TO admin_rh_saas;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.audit_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" character varying NOT NULL,
    action character varying NOT NULL,
    resource character varying NOT NULL,
    payload jsonb,
    "ipAddress" character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO admin_rh_saas;

--
-- Name: audit_logs_unified; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.audit_logs_unified (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tenant_id uuid,
    client_id uuid,
    actor_user_id uuid,
    actor_email text,
    actor_role text,
    action text NOT NULL,
    entity_type text,
    entity_id text,
    ip_address text,
    user_agent text,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.audit_logs_unified OWNER TO admin_rh_saas;

--
-- Name: clock_event_types; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.clock_event_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    pair_code text,
    category text DEFAULT 'WORK'::text NOT NULL,
    default_order integer DEFAULT 0 NOT NULL,
    active_by_default boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.clock_event_types OWNER TO admin_rh_saas;

--
-- Name: clock_events; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.clock_events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id uuid NOT NULL,
    employee_id character varying NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    timezone character varying DEFAULT 'UTC'::character varying NOT NULL,
    "eventType" public.clock_events_eventtype_enum NOT NULL,
    latitude double precision,
    longitude double precision,
    is_inside_geofence boolean DEFAULT true NOT NULL,
    device_info text,
    client_ip character varying(45),
    "rowHash" character varying(64) NOT NULL
);


ALTER TABLE public.clock_events OWNER TO admin_rh_saas;

--
-- Name: clock_events_foundation; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.clock_events_foundation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    employee_profile_id uuid,
    event_type_id uuid,
    local_event_id text,
    event_datetime timestamp with time zone NOT NULL,
    server_received_at timestamp with time zone DEFAULT now() NOT NULL,
    source text DEFAULT 'MOBILE'::text NOT NULL,
    sync_status text DEFAULT 'SYNCED'::text NOT NULL,
    latitude numeric(10,7),
    longitude numeric(10,7),
    accuracy_meters numeric(10,2),
    address text,
    inside_geofence boolean,
    selfie_required boolean DEFAULT false NOT NULL,
    selfie_file_id uuid,
    local_hash text,
    server_hash text,
    nsr bigint NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT clock_events_foundation_source_chk CHECK ((source = ANY (ARRAY['MOBILE'::text, 'WEB'::text, 'IMPORT'::text, 'ADJUSTMENT'::text, 'SYNC'::text]))),
    CONSTRAINT clock_events_foundation_sync_status_chk CHECK ((sync_status = ANY (ARRAY['PENDING'::text, 'SYNCING'::text, 'SYNCED'::text, 'FAILED'::text, 'REJECTED'::text])))
);


ALTER TABLE public.clock_events_foundation OWNER TO admin_rh_saas;

--
-- Name: clock_events_foundation_nsr_seq; Type: SEQUENCE; Schema: public; Owner: admin_rh_saas
--

CREATE SEQUENCE public.clock_events_foundation_nsr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clock_events_foundation_nsr_seq OWNER TO admin_rh_saas;

--
-- Name: clock_events_foundation_nsr_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_rh_saas
--

ALTER SEQUENCE public.clock_events_foundation_nsr_seq OWNED BY public.clock_events_foundation.nsr;


--
-- Name: clock_justifications_foundation; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.clock_justifications_foundation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    employee_profile_id uuid,
    clock_event_id uuid,
    justification_type text NOT NULL,
    description text NOT NULL,
    status text DEFAULT 'PENDING'::text NOT NULL,
    attachment_path text,
    reviewed_by text,
    reviewed_at timestamp with time zone,
    review_notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT clock_justifications_foundation_status_chk CHECK ((status = ANY (ARRAY['PENDING'::text, 'IN_REVIEW'::text, 'APPROVED'::text, 'REJECTED'::text, 'CANCELED'::text])))
);


ALTER TABLE public.clock_justifications_foundation OWNER TO admin_rh_saas;

--
-- Name: clock_policies; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.clock_policies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    gps_required boolean DEFAULT true NOT NULL,
    min_accuracy_meters integer DEFAULT 30 NOT NULL,
    geofence_required boolean DEFAULT false NOT NULL,
    allow_outside_geofence_with_justification boolean DEFAULT true NOT NULL,
    offline_allowed boolean DEFAULT true NOT NULL,
    max_offline_hours integer DEFAULT 48 NOT NULL,
    selfie_required boolean DEFAULT false NOT NULL,
    telemetry_enabled boolean DEFAULT false NOT NULL,
    telemetry_interval_minutes integer DEFAULT 10 NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.clock_policies OWNER TO admin_rh_saas;

--
-- Name: clock_policy_event_types; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.clock_policy_event_types (
    policy_id uuid NOT NULL,
    event_type_id uuid NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    requires_selfie boolean DEFAULT false NOT NULL,
    requires_geofence boolean DEFAULT false NOT NULL,
    requires_justification boolean DEFAULT false NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.clock_policy_event_types OWNER TO admin_rh_saas;

--
-- Name: document_recipients_foundation; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.document_recipients_foundation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    document_id uuid NOT NULL,
    employee_profile_id uuid,
    status text DEFAULT 'PENDING'::text NOT NULL,
    viewed_at timestamp with time zone,
    signed_at timestamp with time zone,
    evidence jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT document_recipients_foundation_status_chk CHECK ((status = ANY (ARRAY['PENDING'::text, 'VIEWED'::text, 'SIGNED'::text, 'REFUSED'::text, 'EXPIRED'::text])))
);


ALTER TABLE public.document_recipients_foundation OWNER TO admin_rh_saas;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.documents (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id character varying NOT NULL,
    employee_id character varying NOT NULL,
    filename character varying NOT NULL,
    path character varying NOT NULL,
    "isSigned" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.documents OWNER TO admin_rh_saas;

--
-- Name: documents_foundation; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.documents_foundation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    title text NOT NULL,
    document_type text NOT NULL,
    status text DEFAULT 'DRAFT'::text NOT NULL,
    requires_signature boolean DEFAULT false NOT NULL,
    requires_selfie boolean DEFAULT false NOT NULL,
    requires_location boolean DEFAULT false NOT NULL,
    file_path text,
    hash_sha256 text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT documents_foundation_status_chk CHECK ((status = ANY (ARRAY['DRAFT'::text, 'PUBLISHED'::text, 'ARCHIVED'::text])))
);


ALTER TABLE public.documents_foundation OWNER TO admin_rh_saas;

--
-- Name: employee_schedules; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.employee_schedules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id character varying NOT NULL,
    employee_id character varying NOT NULL,
    schedule_id uuid NOT NULL,
    start_date date NOT NULL,
    end_date date
);


ALTER TABLE public.employee_schedules OWNER TO admin_rh_saas;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.employees (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id uuid NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    cpf character varying(11) NOT NULL,
    email character varying NOT NULL,
    department character varying,
    "jobTitle" character varying,
    "admissionDate" date NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid
);


ALTER TABLE public.employees OWNER TO admin_rh_saas;

--
-- Name: hr_branches; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_branches (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    company_id uuid,
    name text NOT NULL,
    document_number text,
    address_line text,
    city text,
    state text,
    postal_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_branches OWNER TO admin_rh_saas;

--
-- Name: hr_companies; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_companies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    legal_name text NOT NULL,
    trade_name text NOT NULL,
    document_number text,
    state_registration text,
    municipal_registration text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_companies OWNER TO admin_rh_saas;

--
-- Name: hr_cost_centers; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_cost_centers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_cost_centers OWNER TO admin_rh_saas;

--
-- Name: hr_departments; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_departments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_departments OWNER TO admin_rh_saas;

--
-- Name: hr_employee_profiles; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_employee_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    employee_external_ref text,
    first_name text NOT NULL,
    last_name text NOT NULL,
    cpf text,
    email text,
    department_id uuid,
    job_position_id uuid,
    job_function_id uuid,
    admission_date date,
    status text DEFAULT 'ACTIVE'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT hr_employee_profiles_status_chk CHECK ((status = ANY (ARRAY['ACTIVE'::text, 'INACTIVE'::text, 'ON_LEAVE'::text, 'TERMINATED'::text])))
);


ALTER TABLE public.hr_employee_profiles OWNER TO admin_rh_saas;

--
-- Name: hr_geofences; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_geofences (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    work_location_id uuid,
    name text NOT NULL,
    latitude numeric(10,7) NOT NULL,
    longitude numeric(10,7) NOT NULL,
    radius_meters integer DEFAULT 100 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_geofences OWNER TO admin_rh_saas;

--
-- Name: hr_job_functions; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_job_functions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    allows_external_visit boolean DEFAULT false NOT NULL,
    allows_travel boolean DEFAULT false NOT NULL,
    allows_overtime boolean DEFAULT false NOT NULL,
    allows_on_call boolean DEFAULT false NOT NULL,
    allows_shift_duty boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_job_functions OWNER TO admin_rh_saas;

--
-- Name: hr_job_positions; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_job_positions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_job_positions OWNER TO admin_rh_saas;

--
-- Name: hr_work_locations; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.hr_work_locations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    name text NOT NULL,
    address_line text,
    city text,
    state text,
    latitude numeric(10,7),
    longitude numeric(10,7),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hr_work_locations OWNER TO admin_rh_saas;

--
-- Name: location_tracking_points; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.location_tracking_points (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    employee_profile_id uuid,
    device_id uuid,
    tracked_at timestamp with time zone NOT NULL,
    latitude numeric(10,7) NOT NULL,
    longitude numeric(10,7) NOT NULL,
    accuracy_meters numeric(10,2),
    address text,
    source text DEFAULT 'MOBILE'::text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.location_tracking_points OWNER TO admin_rh_saas;

--
-- Name: mobile_app_settings; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.mobile_app_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    min_supported_version text,
    force_update boolean DEFAULT false NOT NULL,
    allow_offline boolean DEFAULT true NOT NULL,
    show_address_before_clock boolean DEFAULT true NOT NULL,
    show_pending_sync_count boolean DEFAULT true NOT NULL,
    privacy_notice_required boolean DEFAULT true NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.mobile_app_settings OWNER TO admin_rh_saas;

--
-- Name: mobile_devices; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.mobile_devices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid,
    employee_profile_id uuid,
    device_uid text NOT NULL,
    platform text,
    model text,
    app_version text,
    is_active boolean DEFAULT true NOT NULL,
    last_seen_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.mobile_devices OWNER TO admin_rh_saas;

--
-- Name: mobile_sync_batches; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.mobile_sync_batches (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid,
    employee_profile_id uuid,
    device_id uuid,
    status text DEFAULT 'RECEIVED'::text NOT NULL,
    received_at timestamp with time zone DEFAULT now() NOT NULL,
    processed_at timestamp with time zone,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT mobile_sync_batches_status_chk CHECK ((status = ANY (ARRAY['RECEIVED'::text, 'PROCESSING'::text, 'PROCESSED'::text, 'FAILED'::text])))
);


ALTER TABLE public.mobile_sync_batches OWNER TO admin_rh_saas;

--
-- Name: payslips_foundation; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.payslips_foundation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    employee_profile_id uuid,
    reference_month integer NOT NULL,
    reference_year integer NOT NULL,
    title text NOT NULL,
    file_path text,
    hash_sha256 text,
    acknowledged_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payslips_foundation OWNER TO admin_rh_saas;

--
-- Name: rh_saas_schema_migrations; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.rh_saas_schema_migrations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    migration_key text NOT NULL,
    description text NOT NULL,
    executed_at timestamp with time zone DEFAULT now() NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE public.rh_saas_schema_migrations OWNER TO admin_rh_saas;

--
-- Name: saas_clients; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.saas_clients (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tenant_id uuid DEFAULT gen_random_uuid() NOT NULL,
    plan_id uuid,
    slug text NOT NULL,
    trade_name text NOT NULL,
    legal_name text NOT NULL,
    document_number text,
    status text DEFAULT 'ACTIVE'::text NOT NULL,
    timezone text DEFAULT 'America/Sao_Paulo'::text NOT NULL,
    default_locale text DEFAULT 'pt-BR'::text NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT saas_clients_status_chk CHECK ((status = ANY (ARRAY['ACTIVE'::text, 'SUSPENDED'::text, 'TRIAL'::text, 'CANCELED'::text])))
);


ALTER TABLE public.saas_clients OWNER TO admin_rh_saas;

--
-- Name: saas_plans; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.saas_plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.saas_plans OWNER TO admin_rh_saas;

--
-- Name: schedules; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.schedules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id character varying NOT NULL,
    name character varying NOT NULL,
    type public.schedules_type_enum DEFAULT 'FIXED'::public.schedules_type_enum NOT NULL,
    "workDays" jsonb,
    expected_minutes_per_day integer DEFAULT 480 NOT NULL,
    daily_tolerance_minutes integer DEFAULT 10 NOT NULL,
    entry1 character varying,
    exit1 character varying,
    entry2 character varying,
    exit2 character varying,
    expected_minutes integer DEFAULT 480 NOT NULL
);


ALTER TABLE public.schedules OWNER TO admin_rh_saas;

--
-- Name: super_admin_users; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.super_admin_users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    full_name text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.super_admin_users OWNER TO admin_rh_saas;

--
-- Name: tenant_module_flags; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.tenant_module_flags (
    client_id uuid NOT NULL,
    module_code text NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tenant_module_flags OWNER TO admin_rh_saas;

--
-- Name: tenants; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.tenants (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cnpj character varying(14) NOT NULL,
    corporate_name character varying(255) NOT NULL,
    trading_name character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tenants OWNER TO admin_rh_saas;

--
-- Name: time_bank; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.time_bank (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id character varying NOT NULL,
    employee_id character varying NOT NULL,
    date date NOT NULL,
    expected_minutes integer NOT NULL,
    worked_minutes integer DEFAULT 0 NOT NULL,
    balance_minutes integer DEFAULT 0 NOT NULL,
    status character varying DEFAULT 'OPEN'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.time_bank OWNER TO admin_rh_saas;

--
-- Name: time_bank_balances_foundation; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.time_bank_balances_foundation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    employee_profile_id uuid,
    reference_date date NOT NULL,
    balance_minutes integer DEFAULT 0 NOT NULL,
    credit_minutes integer DEFAULT 0 NOT NULL,
    debit_minutes integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.time_bank_balances_foundation OWNER TO admin_rh_saas;

--
-- Name: time_records; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.time_records (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id character varying NOT NULL,
    employee_id character varying,
    latitude numeric(10,7),
    longitude numeric(10,7),
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.time_records OWNER TO admin_rh_saas;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin_rh_saas
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id uuid NOT NULL,
    email character varying NOT NULL,
    "passwordHash" character varying NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    last_login_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    role character varying(30) DEFAULT 'EMPLOYEE'::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO admin_rh_saas;

--
-- Name: clock_events_foundation nsr; Type: DEFAULT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events_foundation ALTER COLUMN nsr SET DEFAULT nextval('public.clock_events_foundation_nsr_seq'::regclass);


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.audit_logs (id, "userId", action, resource, payload, "ipAddress", "timestamp") FROM stdin;
b977a912-32ac-4b60-b95f-f3a68bec9877	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	127.0.0.1	2026-07-02 22:09:41.962401
34dd43f4-0384-4494-a3c7-5372681719ea	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	127.0.0.1	2026-07-02 22:11:10.173479
876b6a69-fdaf-45a7-a59d-8a4766d93693	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	127.0.0.1	2026-07-02 22:13:33.748048
a50b36f4-509b-43d6-a7bc-630bb6a472d9	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	127.0.0.1	2026-07-02 22:14:48.412897
7caa8e9d-d9ec-4424-ae29-3cbf9fdc771e	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	127.0.0.1	2026-07-02 22:16:08.045156
2303df3b-e7c9-49cc-9d8a-fcbc747dc0e1	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	127.0.0.1	2026-07-02 22:17:53.472468
67184ffe-a0e6-4f32-97fa-1f3515529762	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	127.0.0.1	2026-07-02 22:19:13.353827
f44a790f-c002-4b3e-bfbd-e5bd19ba9fbd	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-02 23:22:54.579143
c4ae4426-6964-43af-a38d-7d5613f51090	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-02 23:24:31.573779
fb7ef6e9-959e-41cc-af6b-966ae04ea8f6	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-02 23:53:21.974861
9fe776f0-8a2c-43c1-8fbf-5d0a8c6bebb2	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-02 23:54:10.74715
0a67109c-7716-4440-aefb-a0c483f7e36b	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-02 23:54:14.175778
5eabab08-a780-4d38-ae17-ef1594c6be46	SYSTEM	POST	/v1/employees	{"cpf": "05607553760", "email": "luizcarelo@hotmail.com", "jobTitle": "anals", "lastName": "Ferreira Carelo", "firstName": "Luiz", "department": "log", "admissionDate": "2026-07-02"}	172.19.0.2	2026-07-02 23:54:39.478169
0ed72a92-4aee-4ad0-b0c0-6879bb3b5ed7	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-02 23:57:25.28957
ee863de8-29d7-4b4d-a90d-3decd1db4c4c	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-02 23:59:00.54844
fe683572-206e-406f-a2c4-a5dc2b40ee8d	SYSTEM	POST	/v1/employees	{"cpf": "17830367554", "email": "colaborador.17830367554@empresa.com", "jobTitle": "Analista", "lastName": "Teste", "firstName": "Colaborador", "department": "TI", "admissionDate": "2026-07-02"}	172.19.0.2	2026-07-02 23:59:15.532771
3c24b98d-e710-4bf4-8a52-b4d623212e8b	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-03 00:08:13.699423
242b83b1-5e5d-4035-baa2-ee2cf3f2f3fd	SYSTEM	POST	/v1/auth/login	{"email": "admin@empresa.com", "password": "Admin@123"}	172.19.0.2	2026-07-03 00:14:05.781011
\.


--
-- Data for Name: audit_logs_unified; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.audit_logs_unified (id, tenant_id, client_id, actor_user_id, actor_email, actor_role, action, entity_type, entity_id, ip_address, user_agent, metadata, created_at) FROM stdin;
0b0ff732-a908-4573-808b-5e599ea854d0	54860ba6-a97b-409b-95c2-eed488a724df	53df5639-7222-4336-ad36-9163ee3ffb12	\N	script-fase-1-2a@rh-saas.local	SYSTEM	FASE_1_2A_CLIENTE_MODULOS_APLICADA	SAAS_CLIENT	empresa-teste	\N	\N	{"fase": "1.2A", "slug": "empresa-teste", "descricao": "Plano, cliente exemplo e modulos aplicados."}	2026-07-03 01:29:40.15815+00
c86f6096-6df7-4fa4-a1c1-e465ce1fce5a	54860ba6-a97b-409b-95c2-eed488a724df	53df5639-7222-4336-ad36-9163ee3ffb12	\N	script-fase-1-2b@rh-saas.local	SYSTEM	FASE_1_2B_ESTRUTURA_RH_APLICADA	SAAS_CLIENT	empresa-teste	\N	\N	{"fase": "1.2B", "slug": "empresa-teste", "descricao": "Estrutura RH base aplicada."}	2026-07-03 01:32:08.461775+00
58b5b1dd-f79e-437f-a8d4-dfef9b92af39	54860ba6-a97b-409b-95c2-eed488a724df	53df5639-7222-4336-ad36-9163ee3ffb12	\N	script-fase-1-2c@rh-saas.local	SYSTEM	FASE_1_2C_COLABORADORES_TESTE_APLICADA	SAAS_CLIENT	empresa-teste	\N	\N	{"fase": "1.2C", "slug": "empresa-teste", "descricao": "Colaboradores teste aplicados."}	2026-07-03 01:34:34.146029+00
\.


--
-- Data for Name: clock_event_types; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.clock_event_types (id, code, name, description, pair_code, category, default_order, active_by_default, created_at, updated_at) FROM stdin;
a2c17e16-dde8-4e1b-bb85-2581851529b8	ENTRY	Entrada	Início da jornada de trabalho.	EXIT	WORK	10	t	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
a4d68e17-d06d-4b4d-87de-e4ef099304d1	EXIT	Saída	Encerramento da jornada.	ENTRY	WORK	20	t	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
0802f7ce-c0d6-45d2-88b0-dc33b14efa27	BREAK_START	Início de Intervalo	Saída para almoço, refeição ou descanso.	BREAK_END	BREAK	30	t	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
e4e398b3-b153-476c-a749-e90bf495791e	BREAK_END	Fim de Intervalo	Retorno do intervalo.	BREAK_START	BREAK	40	t	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
ebd99379-4d3f-4952-8781-c53aa3028f63	OVERTIME_START	Início de Hora Extra	Início de atividades além da jornada normal.	OVERTIME_END	OVERTIME	50	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
7c82a55e-e9f7-449a-8f89-4f2a15aaafe8	OVERTIME_END	Fim de Hora Extra	Encerramento das horas extras.	OVERTIME_START	OVERTIME	60	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
df698b57-1c2e-4dff-aec6-65f80a41e49c	EXTERNAL_VISIT_START	Saída para Visita Externa	Saída para cliente, fornecedor ou atividade externa.	EXTERNAL_VISIT_END	EXTERNAL	70	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
f0ec6cb8-2204-443e-be0c-9779782426f3	EXTERNAL_VISIT_END	Retorno de Visita Externa	Retorno à empresa.	EXTERNAL_VISIT_START	EXTERNAL	80	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
6ee1ae18-ea7e-47dc-a644-ff62e14cd12f	ON_CALL_START	Início de Sobreaviso	Funcionário fica disponível para ser acionado.	ON_CALL_END	ON_CALL	90	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
0571650a-7072-471e-ba9e-24479074813d	ON_CALL_END	Fim de Sobreaviso	Encerramento do período de sobreaviso.	ON_CALL_START	ON_CALL	100	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
98a68f73-774e-4220-926a-572fafdb1376	SHIFT_DUTY_START	Início de Plantão	Início de turno especial ou plantão.	SHIFT_DUTY_END	SHIFT	110	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
9e71c0e8-e54a-4c6c-bd2e-9f716e2f12ee	SHIFT_DUTY_END	Fim de Plantão	Encerramento do plantão.	SHIFT_DUTY_START	SHIFT	120	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
3de76d1f-6188-47e5-9e42-98a746ed92b5	TECH_PAUSE_START	Pausa Técnica	Parada para treinamentos, reuniões ou atividades específicas.	TECH_PAUSE_END	PAUSE	130	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
4cd866ef-ad40-426a-a43b-35c97a506137	TECH_PAUSE_END	Retorno da Pausa Técnica	Retorno às atividades normais.	TECH_PAUSE_START	PAUSE	140	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
3bebee2b-25ed-4a34-8ecc-a450fe3af089	PERSONAL_EXIT_START	Saída Particular	Ausência temporária para assuntos pessoais autorizados.	PERSONAL_EXIT_END	PERSONAL	150	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
ea1b36b0-d908-4eed-b9cb-c1fd8a371e0b	PERSONAL_EXIT_END	Retorno de Saída Particular	Retorno após a saída autorizada.	PERSONAL_EXIT_START	PERSONAL	160	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
e089aab7-f6b4-4047-b60a-39a497ab7b81	TRAVEL_START	Início de Viagem	Início de deslocamento a trabalho.	TRAVEL_END	TRAVEL	170	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
61d45bac-1099-4131-9157-c4604bf3fb38	TRAVEL_END	Fim de Viagem	Retorno ou encerramento da viagem.	TRAVEL_START	TRAVEL	180	f	2026-07-03 01:13:03.396352+00	2026-07-03 01:24:01.294279+00
\.


--
-- Data for Name: clock_events; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.clock_events (id, tenant_id, employee_id, "timestamp", timezone, "eventType", latitude, longitude, is_inside_geofence, device_info, client_ip, "rowHash") FROM stdin;
\.


--
-- Data for Name: clock_events_foundation; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.clock_events_foundation (id, client_id, employee_profile_id, event_type_id, local_event_id, event_datetime, server_received_at, source, sync_status, latitude, longitude, accuracy_meters, address, inside_geofence, selfie_required, selfie_file_id, local_hash, server_hash, nsr, metadata, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: clock_justifications_foundation; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.clock_justifications_foundation (id, client_id, employee_profile_id, clock_event_id, justification_type, description, status, attachment_path, reviewed_by, reviewed_at, review_notes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: clock_policies; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.clock_policies (id, client_id, name, description, gps_required, min_accuracy_meters, geofence_required, allow_outside_geofence_with_justification, offline_allowed, max_offline_hours, selfie_required, telemetry_enabled, telemetry_interval_minutes, is_default, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: clock_policy_event_types; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.clock_policy_event_types (policy_id, event_type_id, enabled, requires_selfie, requires_geofence, requires_justification, display_order, updated_at) FROM stdin;
\.


--
-- Data for Name: document_recipients_foundation; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.document_recipients_foundation (id, document_id, employee_profile_id, status, viewed_at, signed_at, evidence, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.documents (id, tenant_id, employee_id, filename, path, "isSigned", "createdAt") FROM stdin;
\.


--
-- Data for Name: documents_foundation; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.documents_foundation (id, client_id, title, document_type, status, requires_signature, requires_selfie, requires_location, file_path, hash_sha256, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: employee_schedules; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.employee_schedules (id, tenant_id, employee_id, schedule_id, start_date, end_date) FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.employees (id, tenant_id, "firstName", "lastName", cpf, email, department, "jobTitle", "admissionDate", "isActive", "createdAt", "updatedAt", user_id) FROM stdin;
17c885d7-6253-4811-9199-553cf7038739	11446a8f-ed2c-468e-9be1-3409beb12d3c	Luiz	Ferreira Carelo	05607553760	luizcarelo@hotmail.com	log	anals	2026-07-02	t	2026-07-02 23:54:39.496952	2026-07-02 23:54:39.496952	\N
65d6d3de-7fca-41cb-8e14-6e610c54da8b	11446a8f-ed2c-468e-9be1-3409beb12d3c	Colaborador	Teste	17830367554	colaborador.17830367554@empresa.com	TI	Analista	2026-07-02	t	2026-07-02 23:59:15.54002	2026-07-02 23:59:15.54002	\N
\.


--
-- Data for Name: hr_branches; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_branches (id, client_id, company_id, name, document_number, address_line, city, state, postal_code, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: hr_companies; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_companies (id, client_id, legal_name, trade_name, document_number, state_registration, municipal_registration, created_at, updated_at) FROM stdin;
0355b1d2-3938-4a36-9f63-34c3f45351b7	53df5639-7222-4336-ad36-9163ee3ffb12	SAAS RH PRO EMPRESA TESTE LTDA	Empresa Teste RH SaaS	11222333000181	\N	\N	2026-07-03 01:13:03.407027+00	2026-07-03 01:32:08.461775+00
\.


--
-- Data for Name: hr_cost_centers; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_cost_centers (id, client_id, code, name, created_at, updated_at) FROM stdin;
46d188de-9c6f-4223-9bc2-f8066fedcd84	53df5639-7222-4336-ad36-9163ee3ffb12	ADM	Administrativo	2026-07-03 01:13:03.416539+00	2026-07-03 01:32:08.461775+00
ec5def34-ae99-4474-b79c-541e83c6a60e	53df5639-7222-4336-ad36-9163ee3ffb12	OPS	Operacoes	2026-07-03 01:13:03.416539+00	2026-07-03 01:32:08.461775+00
21cacbb3-1656-4cff-9966-048788127d79	53df5639-7222-4336-ad36-9163ee3ffb12	TEC	Tecnologia	2026-07-03 01:13:03.416539+00	2026-07-03 01:32:08.461775+00
\.


--
-- Data for Name: hr_departments; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_departments (id, client_id, name, description, created_at, updated_at) FROM stdin;
420676bd-5ff3-4796-ae82-a3b6ac240e6b	53df5639-7222-4336-ad36-9163ee3ffb12	Operações	Departamento operacional de teste	2026-07-03 01:13:03.411377+00	2026-07-03 01:24:01.294279+00
f0e77144-f152-4f7e-8a74-9922d1309f65	53df5639-7222-4336-ad36-9163ee3ffb12	Administrativo	Departamento administrativo de teste.	2026-07-03 01:13:03.411377+00	2026-07-03 01:32:08.461775+00
ba175471-cee6-4298-b9f7-77aab9af867d	53df5639-7222-4336-ad36-9163ee3ffb12	Operacoes	Departamento operacional de teste.	2026-07-03 01:32:08.461775+00	2026-07-03 01:32:08.461775+00
7ab1c24e-07ba-4608-a902-c3ce456541d3	53df5639-7222-4336-ad36-9163ee3ffb12	Tecnologia	Departamento de tecnologia de teste.	2026-07-03 01:13:03.411377+00	2026-07-03 01:32:08.461775+00
\.


--
-- Data for Name: hr_employee_profiles; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_employee_profiles (id, client_id, employee_external_ref, first_name, last_name, cpf, email, department_id, job_position_id, job_function_id, admission_date, status, created_at, updated_at) FROM stdin;
2eaaf7bc-9b59-4fb3-b68e-7aadf580994b	53df5639-7222-4336-ad36-9163ee3ffb12	TESTE-001	Ana	Colaboradora Teste	10000000001	ana.teste@empresa-teste.local	f0e77144-f152-4f7e-8a74-9922d1309f65	a261fbb7-1003-4170-bc09-62b6cbe448ad	8ebc5dbb-86bc-4690-a329-1cbde80b0ccc	2026-07-01	ACTIVE	2026-07-03 01:13:03.440352+00	2026-07-03 01:34:34.146029+00
ef23525f-c621-472d-a0bf-d75c83407a2a	53df5639-7222-4336-ad36-9163ee3ffb12	TESTE-002	Bruno	Tecnico Teste	10000000002	bruno.teste@empresa-teste.local	ba175471-cee6-4298-b9f7-77aab9af867d	3ab8840c-b316-4c62-bbb4-fc3fde3daf61	4792048b-fd26-4b30-874c-fd8816f6ba87	2026-07-01	ACTIVE	2026-07-03 01:13:03.440352+00	2026-07-03 01:34:34.146029+00
bb2e4ec1-f9b4-4960-a6c6-21412cc0d215	53df5639-7222-4336-ad36-9163ee3ffb12	TESTE-003	Carla	Dev Teste	10000000003	carla.teste@empresa-teste.local	7ab1c24e-07ba-4608-a902-c3ce456541d3	a1134d67-e7b5-4ec2-8e76-bf89fd33c49f	8ebc5dbb-86bc-4690-a329-1cbde80b0ccc	2026-07-01	ACTIVE	2026-07-03 01:13:03.440352+00	2026-07-03 01:34:34.146029+00
\.


--
-- Data for Name: hr_geofences; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_geofences (id, client_id, work_location_id, name, latitude, longitude, radius_meters, is_active, created_at, updated_at) FROM stdin;
e1bb89ca-672b-4b9d-9b43-83178b1ba3e4	53df5639-7222-4336-ad36-9163ee3ffb12	aa514b1d-20a1-4711-b874-8bb346a5cf86	Geocerca Matriz Empresa Teste	-22.9068000	-43.1729000	150	t	2026-07-03 01:13:03.435414+00	2026-07-03 01:32:08.461775+00
\.


--
-- Data for Name: hr_job_functions; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_job_functions (id, client_id, name, description, allows_external_visit, allows_travel, allows_overtime, allows_on_call, allows_shift_duty, created_at, updated_at) FROM stdin;
68d5a101-6089-4211-973c-87a85c3200be	53df5639-7222-4336-ad36-9163ee3ffb12	Administrativo Padrão	Fluxo padrão de jornada com intervalo.	f	f	t	f	f	2026-07-03 01:13:03.426313+00	2026-07-03 01:24:01.294279+00
7054af55-e3eb-4ab5-b42f-7ecd671d8954	53df5639-7222-4336-ad36-9163ee3ffb12	Técnico Externo	Permite visita externa e deslocamentos.	t	t	t	f	f	2026-07-03 01:13:03.426313+00	2026-07-03 01:24:01.294279+00
8ebc5dbb-86bc-4690-a329-1cbde80b0ccc	53df5639-7222-4336-ad36-9163ee3ffb12	Administrativo Padrao	Fluxo padrao de jornada com intervalo.	f	f	t	f	f	2026-07-03 01:32:08.461775+00	2026-07-03 01:32:08.461775+00
4792048b-fd26-4b30-874c-fd8816f6ba87	53df5639-7222-4336-ad36-9163ee3ffb12	Tecnico Externo	Permite visita externa e deslocamentos.	t	t	t	f	f	2026-07-03 01:32:08.461775+00	2026-07-03 01:32:08.461775+00
42b1b97a-81e3-4bac-a5a4-ffc656e54293	53df5639-7222-4336-ad36-9163ee3ffb12	Plantonista	Permite plantao e sobreaviso.	f	f	t	t	t	2026-07-03 01:13:03.426313+00	2026-07-03 01:32:08.461775+00
f7a0504f-cb0b-4465-96a2-4d0889207a03	53df5639-7222-4336-ad36-9163ee3ffb12	Gestor	Permite funcoes ampliadas de operacao.	t	t	t	t	t	2026-07-03 01:13:03.426313+00	2026-07-03 01:32:08.461775+00
\.


--
-- Data for Name: hr_job_positions; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_job_positions (id, client_id, name, description, created_at, updated_at) FROM stdin;
83948d8a-f50e-4d61-9c52-fd5591c56297	53df5639-7222-4336-ad36-9163ee3ffb12	Técnico Externo	Cargo com atividades externas	2026-07-03 01:13:03.421309+00	2026-07-03 01:24:01.294279+00
b626142c-94c5-45fb-931d-de9d4efe4754	53df5639-7222-4336-ad36-9163ee3ffb12	Gestor de Operações	Cargo de gestão operacional	2026-07-03 01:13:03.421309+00	2026-07-03 01:24:01.294279+00
a261fbb7-1003-4170-bc09-62b6cbe448ad	53df5639-7222-4336-ad36-9163ee3ffb12	Analista Administrativo	Cargo administrativo padrao.	2026-07-03 01:13:03.421309+00	2026-07-03 01:32:08.461775+00
3ab8840c-b316-4c62-bbb4-fc3fde3daf61	53df5639-7222-4336-ad36-9163ee3ffb12	Tecnico Externo	Cargo com atividades externas.	2026-07-03 01:32:08.461775+00	2026-07-03 01:32:08.461775+00
1189a7c9-894f-4dbb-8695-bc3cc9964df5	53df5639-7222-4336-ad36-9163ee3ffb12	Gestor de Operacoes	Cargo de gestao operacional.	2026-07-03 01:32:08.461775+00	2026-07-03 01:32:08.461775+00
1b5dbf3f-2501-4b23-b15a-661bfb3885d9	53df5639-7222-4336-ad36-9163ee3ffb12	Assistente de RH	Cargo de apoio ao RH.	2026-07-03 01:13:03.421309+00	2026-07-03 01:32:08.461775+00
a1134d67-e7b5-4ec2-8e76-bf89fd33c49f	53df5639-7222-4336-ad36-9163ee3ffb12	Desenvolvedor	Cargo tecnico de tecnologia.	2026-07-03 01:13:03.421309+00	2026-07-03 01:32:08.461775+00
\.


--
-- Data for Name: hr_work_locations; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.hr_work_locations (id, client_id, name, address_line, city, state, latitude, longitude, created_at, updated_at) FROM stdin;
aa514b1d-20a1-4711-b874-8bb346a5cf86	53df5639-7222-4336-ad36-9163ee3ffb12	Matriz Empresa Teste	Endereco de teste para validacao interna	Rio de Janeiro	RJ	-22.9068000	-43.1729000	2026-07-03 01:13:03.43147+00	2026-07-03 01:32:08.461775+00
\.


--
-- Data for Name: location_tracking_points; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.location_tracking_points (id, client_id, employee_profile_id, device_id, tracked_at, latitude, longitude, accuracy_meters, address, source, metadata, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mobile_app_settings; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.mobile_app_settings (id, client_id, min_supported_version, force_update, allow_offline, show_address_before_clock, show_pending_sync_count, privacy_notice_required, settings, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mobile_devices; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.mobile_devices (id, client_id, employee_profile_id, device_uid, platform, model, app_version, is_active, last_seen_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mobile_sync_batches; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.mobile_sync_batches (id, client_id, employee_profile_id, device_id, status, received_at, processed_at, metadata, updated_at) FROM stdin;
\.


--
-- Data for Name: payslips_foundation; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.payslips_foundation (id, client_id, employee_profile_id, reference_month, reference_year, title, file_path, hash_sha256, acknowledged_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: rh_saas_schema_migrations; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.rh_saas_schema_migrations (id, migration_key, description, executed_at, metadata) FROM stdin;
705c70ce-0043-4546-9c53-263bf2770372	fase_1_1_diagnostico_normalizacao_v2	Diagnóstico e normalização segura do banco parcial após falha na coluna updated_at de clock_policies.	2026-07-03 01:24:01.294279+00	{"fase": "1.1", "tipo": "normalizacao_segura", "script": "rh_saas_fase_1_1_diagnostico_normalizacao_v2.py", "erro_original": "column updated_at of relation clock_policies does not exist"}
a0a994ff-b203-454c-ad97-2987c5520f18	fase_1_2a_cliente_modulos	Criacao e atualizacao de planos SaaS, cliente exemplo e modulos ativos.	2026-07-03 01:29:40.15815+00	{"fase": "1.2A", "slug_cliente": "empresa-teste"}
b6878078-9632-407c-b84b-bfe35eda2e1b	fase_1_2b_estrutura_rh	Criacao e atualizacao da estrutura RH base do cliente exemplo.	2026-07-03 01:32:08.461775+00	{"fase": "1.2B", "slug_cliente": "empresa-teste"}
2e2e9c14-6221-4af9-a4c5-9f5fa75d6b7c	fase_1_2c_colaboradores_teste	Criacao e atualizacao dos colaboradores teste do cliente exemplo.	2026-07-03 01:34:34.146029+00	{"fase": "1.2C", "slug_cliente": "empresa-teste"}
\.


--
-- Data for Name: saas_clients; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.saas_clients (id, tenant_id, plan_id, slug, trade_name, legal_name, document_number, status, timezone, default_locale, notes, created_at, updated_at) FROM stdin;
53df5639-7222-4336-ad36-9163ee3ffb12	54860ba6-a97b-409b-95c2-eed488a724df	de2acf21-fad0-4c57-9533-0258343dfb60	empresa-teste	Empresa Teste RH SaaS	SAAS RH PRO EMPRESA TESTE LTDA	11222333000181	ACTIVE	America/Sao_Paulo	pt-BR	Cliente exemplo criado para testes controlados do RH SaaS.	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
\.


--
-- Data for Name: saas_plans; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.saas_plans (id, code, name, description, is_active, created_at, updated_at) FROM stdin;
e77eadb1-ad13-4f6c-8192-43134aa54a81	TRIAL	Teste	Plano de teste para validacao interna.	t	2026-07-03 01:13:03.392209+00	2026-07-03 01:29:40.15815+00
de2acf21-fad0-4c57-9533-0258343dfb60	ENTERPRISE_TEST	Enterprise Teste	Plano completo para cliente exemplo e homologacao interna.	t	2026-07-03 01:13:03.392209+00	2026-07-03 01:29:40.15815+00
20dc3472-8a7e-4091-a763-04904d876d02	ENTERPRISE	Enterprise	Plano completo para clientes de producao.	t	2026-07-03 01:13:03.392209+00	2026-07-03 01:29:40.15815+00
\.


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.schedules (id, tenant_id, name, type, "workDays", expected_minutes_per_day, daily_tolerance_minutes, entry1, exit1, entry2, exit2, expected_minutes) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: super_admin_users; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.super_admin_users (id, email, full_name, is_active, notes, created_at, updated_at) FROM stdin;
d0f0ae66-cae2-48eb-9388-9a812068aabf	superadmin@rh-saas.local	Super Admin Teste	t	Usuario logico de referencia criado para testes. O login real sera integrado em fase posterior.	2026-07-03 01:29:40.15815+00	2026-07-03 01:29:40.15815+00
\.


--
-- Data for Name: tenant_module_flags; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.tenant_module_flags (client_id, module_code, enabled, settings, created_at, updated_at) FROM stdin;
53df5639-7222-4336-ad36-9163ee3ffb12	PONTO_MOBILE	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	DOCUMENTOS	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	HOLERITES	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	BANCO_HORAS	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	JUSTIFICATIVAS	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	TELEMETRIA	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	MAPA	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	SELFIE	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	AFD_EXPORTACOES	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	ASSINATURA_ELETRONICA	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
53df5639-7222-4336-ad36-9163ee3ffb12	SUPER_ADMIN_TESTE	t	{}	2026-07-03 01:13:03.402138+00	2026-07-03 01:29:40.15815+00
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.tenants (id, cnpj, corporate_name, trading_name, is_active, created_at, updated_at) FROM stdin;
11446a8f-ed2c-468e-9be1-3409beb12d3c	00000000000000	Empresa Administradora	Empresa Administradora	t	2026-07-02 22:03:16.016496	2026-07-02 22:09:41.269267
\.


--
-- Data for Name: time_bank; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.time_bank (id, tenant_id, employee_id, date, expected_minutes, worked_minutes, balance_minutes, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: time_bank_balances_foundation; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.time_bank_balances_foundation (id, client_id, employee_profile_id, reference_date, balance_minutes, credit_minutes, debit_minutes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: time_records; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.time_records (id, tenant_id, employee_id, latitude, longitude, "timestamp") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.users (id, tenant_id, email, "passwordHash", "isActive", last_login_at, created_at, updated_at, role) FROM stdin;
5ee2bff9-27d9-42bc-aef5-d82147ced930	11446a8f-ed2c-468e-9be1-3409beb12d3c	admin@empresa.com	$2b$10$hhwGJ/qZ8lDR3S3Jr4rNJuXEPETeVD8ibHGHfYfw8.kHyL97ddy6y	t	\N	2026-07-02 22:14:42.8704	2026-07-02 22:14:42.8704	ADMIN
\.


--
-- Data for Name: geocode_settings; Type: TABLE DATA; Schema: tiger; Owner: admin_rh_saas
--

COPY tiger.geocode_settings (name, setting, unit, category, short_desc) FROM stdin;
\.


--
-- Data for Name: pagc_gaz; Type: TABLE DATA; Schema: tiger; Owner: admin_rh_saas
--

COPY tiger.pagc_gaz (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_lex; Type: TABLE DATA; Schema: tiger; Owner: admin_rh_saas
--

COPY tiger.pagc_lex (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_rules; Type: TABLE DATA; Schema: tiger; Owner: admin_rh_saas
--

COPY tiger.pagc_rules (id, rule, is_custom) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: admin_rh_saas
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: admin_rh_saas
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: clock_events_foundation_nsr_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_rh_saas
--

SELECT pg_catalog.setval('public.clock_events_foundation_nsr_seq', 1, false);


--
-- Name: topology_id_seq; Type: SEQUENCE SET; Schema: topology; Owner: admin_rh_saas
--

SELECT pg_catalog.setval('topology.topology_id_seq', 1, false);


--
-- Name: clock_events PK_08ee1d588f22ec11fc7771c6a87; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events
    ADD CONSTRAINT "PK_08ee1d588f22ec11fc7771c6a87" PRIMARY KEY (id);


--
-- Name: time_records PK_0d2985ead4ba3604143eee43f90; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.time_records
    ADD CONSTRAINT "PK_0d2985ead4ba3604143eee43f90" PRIMARY KEY (id);


--
-- Name: audit_logs PK_1bb179d048bbc581caa3b013439; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY (id);


--
-- Name: tenants PK_53be67a04681c66b87ee27c9321; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY (id);


--
-- Name: time_bank PK_759e043b872f2266397f194b714; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.time_bank
    ADD CONSTRAINT "PK_759e043b872f2266397f194b714" PRIMARY KEY (id);


--
-- Name: schedules PK_7e33fc2ea755a5765e3564e66dd; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: employee_schedules PK_a82f7aa2134e860b889d1cf78b3; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.employee_schedules
    ADD CONSTRAINT "PK_a82f7aa2134e860b889d1cf78b3" PRIMARY KEY (id);


--
-- Name: documents PK_ac51aa5181ee2036f5ca482857c; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY (id);


--
-- Name: employees PK_b9535a98350d5b26e7eb0c26af4; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY (id);


--
-- Name: employees UQ_0ac9216832e4dda06946c37cb73; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "UQ_0ac9216832e4dda06946c37cb73" UNIQUE (cpf);


--
-- Name: tenants UQ_26fe9e78b4ffef8482a18369d2e; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT "UQ_26fe9e78b4ffef8482a18369d2e" UNIQUE (cnpj);


--
-- Name: employees UQ_2d83c53c3e553a48dadb9722e38; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "UQ_2d83c53c3e553a48dadb9722e38" UNIQUE (user_id);


--
-- Name: clock_events UQ_ec2cf4478e6f20cb3d0ba4719ec; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events
    ADD CONSTRAINT "UQ_ec2cf4478e6f20cb3d0ba4719ec" UNIQUE ("rowHash");


--
-- Name: audit_logs_unified audit_logs_unified_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.audit_logs_unified
    ADD CONSTRAINT audit_logs_unified_pkey PRIMARY KEY (id);


--
-- Name: clock_event_types clock_event_types_code_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_event_types
    ADD CONSTRAINT clock_event_types_code_key UNIQUE (code);


--
-- Name: clock_event_types clock_event_types_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_event_types
    ADD CONSTRAINT clock_event_types_pkey PRIMARY KEY (id);


--
-- Name: clock_events_foundation clock_events_foundation_client_id_local_event_id_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events_foundation
    ADD CONSTRAINT clock_events_foundation_client_id_local_event_id_key UNIQUE (client_id, local_event_id);


--
-- Name: clock_events_foundation clock_events_foundation_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events_foundation
    ADD CONSTRAINT clock_events_foundation_pkey PRIMARY KEY (id);


--
-- Name: clock_justifications_foundation clock_justifications_foundation_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_justifications_foundation
    ADD CONSTRAINT clock_justifications_foundation_pkey PRIMARY KEY (id);


--
-- Name: clock_policies clock_policies_client_id_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_policies
    ADD CONSTRAINT clock_policies_client_id_name_key UNIQUE (client_id, name);


--
-- Name: clock_policies clock_policies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_policies
    ADD CONSTRAINT clock_policies_pkey PRIMARY KEY (id);


--
-- Name: clock_policy_event_types clock_policy_event_types_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_policy_event_types
    ADD CONSTRAINT clock_policy_event_types_pkey PRIMARY KEY (policy_id, event_type_id);


--
-- Name: document_recipients_foundation document_recipients_foundation_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.document_recipients_foundation
    ADD CONSTRAINT document_recipients_foundation_pkey PRIMARY KEY (id);


--
-- Name: documents_foundation documents_foundation_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.documents_foundation
    ADD CONSTRAINT documents_foundation_pkey PRIMARY KEY (id);


--
-- Name: hr_branches hr_branches_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_branches
    ADD CONSTRAINT hr_branches_pkey PRIMARY KEY (id);


--
-- Name: hr_companies hr_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_companies
    ADD CONSTRAINT hr_companies_pkey PRIMARY KEY (id);


--
-- Name: hr_cost_centers hr_cost_centers_client_id_code_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_cost_centers
    ADD CONSTRAINT hr_cost_centers_client_id_code_key UNIQUE (client_id, code);


--
-- Name: hr_cost_centers hr_cost_centers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_cost_centers
    ADD CONSTRAINT hr_cost_centers_pkey PRIMARY KEY (id);


--
-- Name: hr_departments hr_departments_client_id_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_departments
    ADD CONSTRAINT hr_departments_client_id_name_key UNIQUE (client_id, name);


--
-- Name: hr_departments hr_departments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_departments
    ADD CONSTRAINT hr_departments_pkey PRIMARY KEY (id);


--
-- Name: hr_employee_profiles hr_employee_profiles_client_id_email_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_employee_profiles
    ADD CONSTRAINT hr_employee_profiles_client_id_email_key UNIQUE (client_id, email);


--
-- Name: hr_employee_profiles hr_employee_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_employee_profiles
    ADD CONSTRAINT hr_employee_profiles_pkey PRIMARY KEY (id);


--
-- Name: hr_geofences hr_geofences_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_geofences
    ADD CONSTRAINT hr_geofences_pkey PRIMARY KEY (id);


--
-- Name: hr_job_functions hr_job_functions_client_id_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_job_functions
    ADD CONSTRAINT hr_job_functions_client_id_name_key UNIQUE (client_id, name);


--
-- Name: hr_job_functions hr_job_functions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_job_functions
    ADD CONSTRAINT hr_job_functions_pkey PRIMARY KEY (id);


--
-- Name: hr_job_positions hr_job_positions_client_id_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_job_positions
    ADD CONSTRAINT hr_job_positions_client_id_name_key UNIQUE (client_id, name);


--
-- Name: hr_job_positions hr_job_positions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_job_positions
    ADD CONSTRAINT hr_job_positions_pkey PRIMARY KEY (id);


--
-- Name: hr_work_locations hr_work_locations_client_id_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_work_locations
    ADD CONSTRAINT hr_work_locations_client_id_name_key UNIQUE (client_id, name);


--
-- Name: hr_work_locations hr_work_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_work_locations
    ADD CONSTRAINT hr_work_locations_pkey PRIMARY KEY (id);


--
-- Name: location_tracking_points location_tracking_points_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.location_tracking_points
    ADD CONSTRAINT location_tracking_points_pkey PRIMARY KEY (id);


--
-- Name: mobile_app_settings mobile_app_settings_client_id_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_app_settings
    ADD CONSTRAINT mobile_app_settings_client_id_key UNIQUE (client_id);


--
-- Name: mobile_app_settings mobile_app_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_app_settings
    ADD CONSTRAINT mobile_app_settings_pkey PRIMARY KEY (id);


--
-- Name: mobile_devices mobile_devices_client_id_device_uid_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_devices
    ADD CONSTRAINT mobile_devices_client_id_device_uid_key UNIQUE (client_id, device_uid);


--
-- Name: mobile_devices mobile_devices_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_devices
    ADD CONSTRAINT mobile_devices_pkey PRIMARY KEY (id);


--
-- Name: mobile_sync_batches mobile_sync_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_sync_batches
    ADD CONSTRAINT mobile_sync_batches_pkey PRIMARY KEY (id);


--
-- Name: payslips_foundation payslips_foundation_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.payslips_foundation
    ADD CONSTRAINT payslips_foundation_pkey PRIMARY KEY (id);


--
-- Name: rh_saas_schema_migrations rh_saas_schema_migrations_migration_key_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.rh_saas_schema_migrations
    ADD CONSTRAINT rh_saas_schema_migrations_migration_key_key UNIQUE (migration_key);


--
-- Name: rh_saas_schema_migrations rh_saas_schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.rh_saas_schema_migrations
    ADD CONSTRAINT rh_saas_schema_migrations_pkey PRIMARY KEY (id);


--
-- Name: saas_clients saas_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.saas_clients
    ADD CONSTRAINT saas_clients_pkey PRIMARY KEY (id);


--
-- Name: saas_clients saas_clients_slug_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.saas_clients
    ADD CONSTRAINT saas_clients_slug_key UNIQUE (slug);


--
-- Name: saas_clients saas_clients_tenant_id_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.saas_clients
    ADD CONSTRAINT saas_clients_tenant_id_key UNIQUE (tenant_id);


--
-- Name: saas_plans saas_plans_code_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.saas_plans
    ADD CONSTRAINT saas_plans_code_key UNIQUE (code);


--
-- Name: saas_plans saas_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.saas_plans
    ADD CONSTRAINT saas_plans_pkey PRIMARY KEY (id);


--
-- Name: super_admin_users super_admin_users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.super_admin_users
    ADD CONSTRAINT super_admin_users_email_key UNIQUE (email);


--
-- Name: super_admin_users super_admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.super_admin_users
    ADD CONSTRAINT super_admin_users_pkey PRIMARY KEY (id);


--
-- Name: tenant_module_flags tenant_module_flags_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.tenant_module_flags
    ADD CONSTRAINT tenant_module_flags_pkey PRIMARY KEY (client_id, module_code);


--
-- Name: time_bank_balances_foundation time_bank_balances_foundation_client_id_employee_profile_id_key; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.time_bank_balances_foundation
    ADD CONSTRAINT time_bank_balances_foundation_client_id_employee_profile_id_key UNIQUE (client_id, employee_profile_id, reference_date);


--
-- Name: time_bank_balances_foundation time_bank_balances_foundation_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.time_bank_balances_foundation
    ADD CONSTRAINT time_bank_balances_foundation_pkey PRIMARY KEY (id);


--
-- Name: IDX_88dcc148d532384790ab874c3d; Type: INDEX; Schema: public; Owner: admin_rh_saas
--

CREATE INDEX "IDX_88dcc148d532384790ab874c3d" ON public.audit_logs USING btree ("timestamp");


--
-- Name: idx_audit_logs_unified_client_created; Type: INDEX; Schema: public; Owner: admin_rh_saas
--

CREATE INDEX idx_audit_logs_unified_client_created ON public.audit_logs_unified USING btree (client_id, created_at DESC);


--
-- Name: idx_audit_logs_unified_tenant_created; Type: INDEX; Schema: public; Owner: admin_rh_saas
--

CREATE INDEX idx_audit_logs_unified_tenant_created ON public.audit_logs_unified USING btree (tenant_id, created_at DESC);


--
-- Name: idx_clock_events_foundation_client_employee_datetime; Type: INDEX; Schema: public; Owner: admin_rh_saas
--

CREATE INDEX idx_clock_events_foundation_client_employee_datetime ON public.clock_events_foundation USING btree (client_id, employee_profile_id, event_datetime DESC);


--
-- Name: idx_location_tracking_points_client_tracked; Type: INDEX; Schema: public; Owner: admin_rh_saas
--

CREATE INDEX idx_location_tracking_points_client_tracked ON public.location_tracking_points USING btree (client_id, tracked_at DESC);


--
-- Name: users FK_109638590074998bb72a2f2cf08; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_109638590074998bb72a2f2cf08" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);


--
-- Name: employee_schedules FK_2055bf1458f7e754d3a7c7c2d8c; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.employee_schedules
    ADD CONSTRAINT "FK_2055bf1458f7e754d3a7c7c2d8c" FOREIGN KEY (schedule_id) REFERENCES public.schedules(id);


--
-- Name: employees FK_2d83c53c3e553a48dadb9722e38; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: employees FK_588d18aeef0504067e40c682788; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_588d18aeef0504067e40c682788" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);


--
-- Name: clock_events FK_e4e1f2d19ea40688586075494d7; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events
    ADD CONSTRAINT "FK_e4e1f2d19ea40688586075494d7" FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE RESTRICT;


--
-- Name: clock_events_foundation clock_events_foundation_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events_foundation
    ADD CONSTRAINT clock_events_foundation_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: clock_events_foundation clock_events_foundation_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events_foundation
    ADD CONSTRAINT clock_events_foundation_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE SET NULL;


--
-- Name: clock_events_foundation clock_events_foundation_event_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_events_foundation
    ADD CONSTRAINT clock_events_foundation_event_type_id_fkey FOREIGN KEY (event_type_id) REFERENCES public.clock_event_types(id);


--
-- Name: clock_justifications_foundation clock_justifications_foundation_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_justifications_foundation
    ADD CONSTRAINT clock_justifications_foundation_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: clock_justifications_foundation clock_justifications_foundation_clock_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_justifications_foundation
    ADD CONSTRAINT clock_justifications_foundation_clock_event_id_fkey FOREIGN KEY (clock_event_id) REFERENCES public.clock_events_foundation(id) ON DELETE SET NULL;


--
-- Name: clock_justifications_foundation clock_justifications_foundation_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_justifications_foundation
    ADD CONSTRAINT clock_justifications_foundation_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE CASCADE;


--
-- Name: clock_policies clock_policies_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_policies
    ADD CONSTRAINT clock_policies_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: clock_policy_event_types clock_policy_event_types_event_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_policy_event_types
    ADD CONSTRAINT clock_policy_event_types_event_type_id_fkey FOREIGN KEY (event_type_id) REFERENCES public.clock_event_types(id) ON DELETE CASCADE;


--
-- Name: clock_policy_event_types clock_policy_event_types_policy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.clock_policy_event_types
    ADD CONSTRAINT clock_policy_event_types_policy_id_fkey FOREIGN KEY (policy_id) REFERENCES public.clock_policies(id) ON DELETE CASCADE;


--
-- Name: document_recipients_foundation document_recipients_foundation_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.document_recipients_foundation
    ADD CONSTRAINT document_recipients_foundation_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents_foundation(id) ON DELETE CASCADE;


--
-- Name: document_recipients_foundation document_recipients_foundation_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.document_recipients_foundation
    ADD CONSTRAINT document_recipients_foundation_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE CASCADE;


--
-- Name: documents_foundation documents_foundation_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.documents_foundation
    ADD CONSTRAINT documents_foundation_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_branches hr_branches_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_branches
    ADD CONSTRAINT hr_branches_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_branches hr_branches_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_branches
    ADD CONSTRAINT hr_branches_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.hr_companies(id) ON DELETE CASCADE;


--
-- Name: hr_companies hr_companies_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_companies
    ADD CONSTRAINT hr_companies_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_cost_centers hr_cost_centers_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_cost_centers
    ADD CONSTRAINT hr_cost_centers_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_departments hr_departments_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_departments
    ADD CONSTRAINT hr_departments_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_employee_profiles hr_employee_profiles_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_employee_profiles
    ADD CONSTRAINT hr_employee_profiles_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_employee_profiles hr_employee_profiles_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_employee_profiles
    ADD CONSTRAINT hr_employee_profiles_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.hr_departments(id);


--
-- Name: hr_employee_profiles hr_employee_profiles_job_function_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_employee_profiles
    ADD CONSTRAINT hr_employee_profiles_job_function_id_fkey FOREIGN KEY (job_function_id) REFERENCES public.hr_job_functions(id);


--
-- Name: hr_employee_profiles hr_employee_profiles_job_position_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_employee_profiles
    ADD CONSTRAINT hr_employee_profiles_job_position_id_fkey FOREIGN KEY (job_position_id) REFERENCES public.hr_job_positions(id);


--
-- Name: hr_geofences hr_geofences_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_geofences
    ADD CONSTRAINT hr_geofences_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_geofences hr_geofences_work_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_geofences
    ADD CONSTRAINT hr_geofences_work_location_id_fkey FOREIGN KEY (work_location_id) REFERENCES public.hr_work_locations(id) ON DELETE CASCADE;


--
-- Name: hr_job_functions hr_job_functions_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_job_functions
    ADD CONSTRAINT hr_job_functions_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_job_positions hr_job_positions_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_job_positions
    ADD CONSTRAINT hr_job_positions_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: hr_work_locations hr_work_locations_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.hr_work_locations
    ADD CONSTRAINT hr_work_locations_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: location_tracking_points location_tracking_points_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.location_tracking_points
    ADD CONSTRAINT location_tracking_points_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: location_tracking_points location_tracking_points_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.location_tracking_points
    ADD CONSTRAINT location_tracking_points_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.mobile_devices(id) ON DELETE SET NULL;


--
-- Name: location_tracking_points location_tracking_points_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.location_tracking_points
    ADD CONSTRAINT location_tracking_points_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE SET NULL;


--
-- Name: mobile_app_settings mobile_app_settings_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_app_settings
    ADD CONSTRAINT mobile_app_settings_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: mobile_devices mobile_devices_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_devices
    ADD CONSTRAINT mobile_devices_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: mobile_devices mobile_devices_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_devices
    ADD CONSTRAINT mobile_devices_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE SET NULL;


--
-- Name: mobile_sync_batches mobile_sync_batches_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_sync_batches
    ADD CONSTRAINT mobile_sync_batches_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: mobile_sync_batches mobile_sync_batches_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_sync_batches
    ADD CONSTRAINT mobile_sync_batches_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.mobile_devices(id) ON DELETE SET NULL;


--
-- Name: mobile_sync_batches mobile_sync_batches_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.mobile_sync_batches
    ADD CONSTRAINT mobile_sync_batches_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE SET NULL;


--
-- Name: payslips_foundation payslips_foundation_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.payslips_foundation
    ADD CONSTRAINT payslips_foundation_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: payslips_foundation payslips_foundation_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.payslips_foundation
    ADD CONSTRAINT payslips_foundation_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE CASCADE;


--
-- Name: saas_clients saas_clients_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.saas_clients
    ADD CONSTRAINT saas_clients_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.saas_plans(id);


--
-- Name: tenant_module_flags tenant_module_flags_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.tenant_module_flags
    ADD CONSTRAINT tenant_module_flags_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: time_bank_balances_foundation time_bank_balances_foundation_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.time_bank_balances_foundation
    ADD CONSTRAINT time_bank_balances_foundation_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.saas_clients(id) ON DELETE CASCADE;


--
-- Name: time_bank_balances_foundation time_bank_balances_foundation_employee_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_rh_saas
--

ALTER TABLE ONLY public.time_bank_balances_foundation
    ADD CONSTRAINT time_bank_balances_foundation_employee_profile_id_fkey FOREIGN KEY (employee_profile_id) REFERENCES public.hr_employee_profiles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

