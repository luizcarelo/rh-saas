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
-- Data for Name: clock_events; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.clock_events (id, tenant_id, employee_id, "timestamp", timezone, "eventType", latitude, longitude, is_inside_geofence, device_info, client_ip, "rowHash") FROM stdin;
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

COPY public.documents (id, tenant_id, employee_id, filename, path, "isSigned", "createdAt") FROM stdin;
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
-- Name: IDX_88dcc148d532384790ab874c3d; Type: INDEX; Schema: public; Owner: admin_rh_saas
--

CREATE INDEX "IDX_88dcc148d532384790ab874c3d" ON public.audit_logs USING btree ("timestamp");


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
-- PostgreSQL database dump complete
--

