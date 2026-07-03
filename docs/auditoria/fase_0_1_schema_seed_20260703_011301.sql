
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS saas_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS saas_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    plan_id UUID REFERENCES saas_plans(id),
    slug TEXT NOT NULL UNIQUE,
    trade_name TEXT NOT NULL,
    legal_name TEXT NOT NULL,
    document_number TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    timezone TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    default_locale TEXT NOT NULL DEFAULT 'pt-BR',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT saas_clients_status_chk CHECK (status IN ('ACTIVE', 'SUSPENDED', 'TRIAL', 'CANCELED'))
);

CREATE TABLE IF NOT EXISTS tenant_module_flags (
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    module_code TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (client_id, module_code)
);

CREATE TABLE IF NOT EXISTS super_admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs_unified (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID,
    client_id UUID,
    actor_user_id UUID,
    actor_email TEXT,
    actor_role TEXT,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_unified_tenant_created
ON audit_logs_unified (tenant_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_logs_unified_client_created
ON audit_logs_unified (client_id, created_at DESC);

CREATE TABLE IF NOT EXISTS hr_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    legal_name TEXT NOT NULL,
    trade_name TEXT NOT NULL,
    document_number TEXT,
    state_registration TEXT,
    municipal_registration TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hr_branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    company_id UUID REFERENCES hr_companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    document_number TEXT,
    address_line TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hr_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, name)
);

CREATE TABLE IF NOT EXISTS hr_cost_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, code)
);

CREATE TABLE IF NOT EXISTS hr_job_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, name)
);

CREATE TABLE IF NOT EXISTS hr_job_functions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    allows_external_visit BOOLEAN NOT NULL DEFAULT FALSE,
    allows_travel BOOLEAN NOT NULL DEFAULT FALSE,
    allows_overtime BOOLEAN NOT NULL DEFAULT FALSE,
    allows_on_call BOOLEAN NOT NULL DEFAULT FALSE,
    allows_shift_duty BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, name)
);

CREATE TABLE IF NOT EXISTS hr_work_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address_line TEXT,
    city TEXT,
    state TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, name)
);

CREATE TABLE IF NOT EXISTS hr_geofences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    work_location_id UUID REFERENCES hr_work_locations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    radius_meters INTEGER NOT NULL DEFAULT 100,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hr_employee_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_external_ref TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    cpf TEXT,
    email TEXT,
    department_id UUID REFERENCES hr_departments(id),
    job_position_id UUID REFERENCES hr_job_positions(id),
    job_function_id UUID REFERENCES hr_job_functions(id),
    admission_date DATE,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, email),
    CONSTRAINT hr_employee_profiles_status_chk CHECK (status IN ('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED'))
);

CREATE TABLE IF NOT EXISTS clock_event_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    pair_code TEXT,
    category TEXT NOT NULL DEFAULT 'WORK',
    default_order INTEGER NOT NULL DEFAULT 0,
    active_by_default BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clock_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    gps_required BOOLEAN NOT NULL DEFAULT TRUE,
    min_accuracy_meters INTEGER NOT NULL DEFAULT 30,
    geofence_required BOOLEAN NOT NULL DEFAULT FALSE,
    allow_outside_geofence_with_justification BOOLEAN NOT NULL DEFAULT TRUE,
    offline_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    max_offline_hours INTEGER NOT NULL DEFAULT 48,
    selfie_required BOOLEAN NOT NULL DEFAULT FALSE,
    telemetry_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    telemetry_interval_minutes INTEGER NOT NULL DEFAULT 10,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, name)
);

CREATE TABLE IF NOT EXISTS clock_policy_event_types (
    policy_id UUID NOT NULL REFERENCES clock_policies(id) ON DELETE CASCADE,
    event_type_id UUID NOT NULL REFERENCES clock_event_types(id) ON DELETE CASCADE,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    requires_selfie BOOLEAN NOT NULL DEFAULT FALSE,
    requires_geofence BOOLEAN NOT NULL DEFAULT FALSE,
    requires_justification BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (policy_id, event_type_id)
);

CREATE TABLE IF NOT EXISTS mobile_app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    min_supported_version TEXT,
    force_update BOOLEAN NOT NULL DEFAULT FALSE,
    allow_offline BOOLEAN NOT NULL DEFAULT TRUE,
    show_address_before_clock BOOLEAN NOT NULL DEFAULT TRUE,
    show_pending_sync_count BOOLEAN NOT NULL DEFAULT TRUE,
    privacy_notice_required BOOLEAN NOT NULL DEFAULT TRUE,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id)
);

CREATE TABLE IF NOT EXISTS mobile_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE SET NULL,
    device_uid TEXT NOT NULL,
    platform TEXT,
    model TEXT,
    app_version TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_seen_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, device_uid)
);

CREATE TABLE IF NOT EXISTS mobile_sync_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE SET NULL,
    device_id UUID REFERENCES mobile_devices(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'RECEIVED',
    received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at TIMESTAMPTZ,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    CONSTRAINT mobile_sync_batches_status_chk CHECK (status IN ('RECEIVED', 'PROCESSING', 'PROCESSED', 'FAILED'))
);

CREATE TABLE IF NOT EXISTS clock_events_foundation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE SET NULL,
    event_type_id UUID REFERENCES clock_event_types(id),
    local_event_id TEXT,
    event_datetime TIMESTAMPTZ NOT NULL,
    server_received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    source TEXT NOT NULL DEFAULT 'MOBILE',
    sync_status TEXT NOT NULL DEFAULT 'SYNCED',
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    accuracy_meters NUMERIC(10, 2),
    address TEXT,
    inside_geofence BOOLEAN,
    selfie_required BOOLEAN NOT NULL DEFAULT FALSE,
    selfie_file_id UUID,
    local_hash TEXT,
    server_hash TEXT,
    nsr BIGSERIAL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, local_event_id),
    CONSTRAINT clock_events_foundation_source_chk CHECK (source IN ('MOBILE', 'WEB', 'IMPORT', 'ADJUSTMENT', 'SYNC')),
    CONSTRAINT clock_events_foundation_sync_status_chk CHECK (sync_status IN ('PENDING', 'SYNCING', 'SYNCED', 'FAILED', 'REJECTED'))
);

CREATE INDEX IF NOT EXISTS idx_clock_events_foundation_client_employee_datetime
ON clock_events_foundation (client_id, employee_profile_id, event_datetime DESC);

CREATE TABLE IF NOT EXISTS location_tracking_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE SET NULL,
    device_id UUID REFERENCES mobile_devices(id) ON DELETE SET NULL,
    tracked_at TIMESTAMPTZ NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    accuracy_meters NUMERIC(10, 2),
    address TEXT,
    source TEXT NOT NULL DEFAULT 'MOBILE',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_location_tracking_points_client_tracked
ON location_tracking_points (client_id, tracked_at DESC);

CREATE TABLE IF NOT EXISTS documents_foundation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    document_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    requires_signature BOOLEAN NOT NULL DEFAULT FALSE,
    requires_selfie BOOLEAN NOT NULL DEFAULT FALSE,
    requires_location BOOLEAN NOT NULL DEFAULT FALSE,
    file_path TEXT,
    hash_sha256 TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT documents_foundation_status_chk CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

CREATE TABLE IF NOT EXISTS document_recipients_foundation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents_foundation(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'PENDING',
    viewed_at TIMESTAMPTZ,
    signed_at TIMESTAMPTZ,
    evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT document_recipients_foundation_status_chk CHECK (status IN ('PENDING', 'VIEWED', 'SIGNED', 'REFUSED', 'EXPIRED'))
);

CREATE TABLE IF NOT EXISTS payslips_foundation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE CASCADE,
    reference_month INTEGER NOT NULL,
    reference_year INTEGER NOT NULL,
    title TEXT NOT NULL,
    file_path TEXT,
    hash_sha256 TEXT,
    acknowledged_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS time_bank_balances_foundation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE CASCADE,
    reference_date DATE NOT NULL,
    balance_minutes INTEGER NOT NULL DEFAULT 0,
    credit_minutes INTEGER NOT NULL DEFAULT 0,
    debit_minutes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (client_id, employee_profile_id, reference_date)
);

CREATE TABLE IF NOT EXISTS clock_justifications_foundation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES saas_clients(id) ON DELETE CASCADE,
    employee_profile_id UUID REFERENCES hr_employee_profiles(id) ON DELETE CASCADE,
    clock_event_id UUID REFERENCES clock_events_foundation(id) ON DELETE SET NULL,
    justification_type TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    attachment_path TEXT,
    reviewed_by TEXT,
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT clock_justifications_foundation_status_chk CHECK (status IN ('PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'CANCELED'))
);

INSERT INTO saas_plans (code, name, description)
VALUES
('TRIAL', 'Teste', 'Plano de teste para validação interna'),
('ENTERPRISE_TEST', 'Enterprise Teste', 'Plano completo para cliente exemplo'),
('ENTERPRISE', 'Enterprise', 'Plano completo para clientes de produção')
ON CONFLICT (code) DO NOTHING;

INSERT INTO clock_event_types (code, name, description, pair_code, category, default_order, active_by_default)
VALUES
('ENTRY', 'Entrada', 'Início da jornada de trabalho.', 'EXIT', 'WORK', 10, TRUE),
('EXIT', 'Saída', 'Encerramento da jornada.', 'ENTRY', 'WORK', 20, TRUE),
('BREAK_START', 'Início de Intervalo', 'Saída para almoço, refeição ou descanso.', 'BREAK_END', 'BREAK', 30, TRUE),
('BREAK_END', 'Fim de Intervalo', 'Retorno do intervalo.', 'BREAK_START', 'BREAK', 40, TRUE),
('OVERTIME_START', 'Início de Hora Extra', 'Início de atividades além da jornada normal.', 'OVERTIME_END', 'OVERTIME', 50, FALSE),
('OVERTIME_END', 'Fim de Hora Extra', 'Encerramento das horas extras.', 'OVERTIME_START', 'OVERTIME', 60, FALSE),
('EXTERNAL_VISIT_START', 'Saída para Visita Externa', 'Saída para cliente, fornecedor ou atividade externa.', 'EXTERNAL_VISIT_END', 'EXTERNAL', 70, FALSE),
('EXTERNAL_VISIT_END', 'Retorno de Visita Externa', 'Retorno à empresa.', 'EXTERNAL_VISIT_START', 'EXTERNAL', 80, FALSE),
('ON_CALL_START', 'Início de Sobreaviso', 'Funcionário fica disponível para ser acionado.', 'ON_CALL_END', 'ON_CALL', 90, FALSE),
('ON_CALL_END', 'Fim de Sobreaviso', 'Encerramento do período de sobreaviso.', 'ON_CALL_START', 'ON_CALL', 100, FALSE),
('SHIFT_DUTY_START', 'Início de Plantão', 'Início de turno especial ou plantão.', 'SHIFT_DUTY_END', 'SHIFT', 110, FALSE),
('SHIFT_DUTY_END', 'Fim de Plantão', 'Encerramento do plantão.', 'SHIFT_DUTY_START', 'SHIFT', 120, FALSE),
('TECH_PAUSE_START', 'Pausa Técnica', 'Parada para treinamentos, reuniões ou atividades específicas.', 'TECH_PAUSE_END', 'PAUSE', 130, FALSE),
('TECH_PAUSE_END', 'Retorno da Pausa Técnica', 'Retorno às atividades normais.', 'TECH_PAUSE_START', 'PAUSE', 140, FALSE),
('PERSONAL_EXIT_START', 'Saída Particular', 'Ausência temporária para assuntos pessoais autorizados.', 'PERSONAL_EXIT_END', 'PERSONAL', 150, FALSE),
('PERSONAL_EXIT_END', 'Retorno de Saída Particular', 'Retorno após a saída autorizada.', 'PERSONAL_EXIT_START', 'PERSONAL', 160, FALSE),
('TRAVEL_START', 'Início de Viagem', 'Início de deslocamento a trabalho.', 'TRAVEL_END', 'TRAVEL', 170, FALSE),
('TRAVEL_END', 'Fim de Viagem', 'Retorno ou encerramento da viagem.', 'TRAVEL_START', 'TRAVEL', 180, FALSE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    pair_code = EXCLUDED.pair_code,
    category = EXCLUDED.category,
    default_order = EXCLUDED.default_order;

WITH enterprise_plan AS (
    SELECT id FROM saas_plans WHERE code = 'ENTERPRISE_TEST'
),
upsert_client AS (
    INSERT INTO saas_clients (
        plan_id,
        slug,
        trade_name,
        legal_name,
        document_number,
        status,
        notes
    )
    SELECT
        enterprise_plan.id,
        'empresa-teste',
        'Empresa Teste RH SaaS',
        'SAAS RH PRO EMPRESA TESTE LTDA',
        '11222333000181',
        'ACTIVE',
        'Cliente exemplo criado na Fase 0 + 1 para testes controlados.'
    FROM enterprise_plan
    ON CONFLICT (slug) DO UPDATE SET
        trade_name = EXCLUDED.trade_name,
        legal_name = EXCLUDED.legal_name,
        document_number = EXCLUDED.document_number,
        status = EXCLUDED.status,
        plan_id = EXCLUDED.plan_id,
        updated_at = now()
    RETURNING id
)
INSERT INTO tenant_module_flags (client_id, module_code, enabled, settings)
SELECT id, module_code, TRUE, '{}'::jsonb
FROM upsert_client
CROSS JOIN (
    VALUES
    ('PONTO_MOBILE'),
    ('DOCUMENTOS'),
    ('HOLERITES'),
    ('BANCO_HORAS'),
    ('JUSTIFICATIVAS'),
    ('TELEMETRIA'),
    ('MAPA'),
    ('SELFIE'),
    ('AFD_EXPORTACOES'),
    ('ASSINATURA_ELETRONICA'),
    ('SUPER_ADMIN_TESTE')
) AS modules(module_code)
ON CONFLICT (client_id, module_code) DO UPDATE SET
    enabled = EXCLUDED.enabled,
    updated_at = now();

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO hr_companies (client_id, legal_name, trade_name, document_number)
SELECT id, 'SAAS RH PRO EMPRESA TESTE LTDA', 'Empresa Teste RH SaaS', '11222333000181'
FROM c
WHERE NOT EXISTS (
    SELECT 1 FROM hr_companies hc WHERE hc.client_id = c.id AND hc.document_number = '11222333000181'
);

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO hr_departments (client_id, name, description)
SELECT c.id, v.name, v.description
FROM c
CROSS JOIN (
    VALUES
    ('Administrativo', 'Departamento administrativo de teste'),
    ('Operações', 'Departamento operacional de teste'),
    ('Tecnologia', 'Departamento de tecnologia de teste')
) AS v(name, description)
ON CONFLICT (client_id, name) DO NOTHING;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO hr_cost_centers (client_id, code, name)
SELECT c.id, v.code, v.name
FROM c
CROSS JOIN (
    VALUES
    ('ADM', 'Administrativo'),
    ('OPS', 'Operações'),
    ('TEC', 'Tecnologia')
) AS v(code, name)
ON CONFLICT (client_id, code) DO NOTHING;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO hr_job_positions (client_id, name, description)
SELECT c.id, v.name, v.description
FROM c
CROSS JOIN (
    VALUES
    ('Analista Administrativo', 'Cargo administrativo padrão'),
    ('Técnico Externo', 'Cargo com atividades externas'),
    ('Gestor de Operações', 'Cargo de gestão operacional'),
    ('Assistente de RH', 'Cargo de apoio ao RH'),
    ('Desenvolvedor', 'Cargo técnico de tecnologia')
) AS v(name, description)
ON CONFLICT (client_id, name) DO NOTHING;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO hr_job_functions (
    client_id,
    name,
    description,
    allows_external_visit,
    allows_travel,
    allows_overtime,
    allows_on_call,
    allows_shift_duty
)
SELECT c.id, v.name, v.description, v.external_visit, v.travel, v.overtime, v.on_call, v.shift_duty
FROM c
CROSS JOIN (
    VALUES
    ('Administrativo Padrão', 'Fluxo padrão de jornada com intervalo.', FALSE, FALSE, TRUE, FALSE, FALSE),
    ('Técnico Externo', 'Permite visita externa e deslocamentos.', TRUE, TRUE, TRUE, FALSE, FALSE),
    ('Plantonista', 'Permite plantão e sobreaviso.', FALSE, FALSE, TRUE, TRUE, TRUE),
    ('Gestor', 'Permite funções ampliadas de operação.', TRUE, TRUE, TRUE, TRUE, TRUE)
) AS v(name, description, external_visit, travel, overtime, on_call, shift_duty)
ON CONFLICT (client_id, name) DO UPDATE SET
    description = EXCLUDED.description,
    allows_external_visit = EXCLUDED.allows_external_visit,
    allows_travel = EXCLUDED.allows_travel,
    allows_overtime = EXCLUDED.allows_overtime,
    allows_on_call = EXCLUDED.allows_on_call,
    allows_shift_duty = EXCLUDED.allows_shift_duty;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO hr_work_locations (
    client_id,
    name,
    address_line,
    city,
    state,
    latitude,
    longitude
)
SELECT
    c.id,
    'Matriz Empresa Teste',
    'Endereço de teste para validação interna',
    'Rio de Janeiro',
    'RJ',
    -22.9068000,
    -43.1729000
FROM c
ON CONFLICT (client_id, name) DO NOTHING;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
),
wl AS (
    SELECT id AS work_location_id, client_id
    FROM hr_work_locations
    WHERE name = 'Matriz Empresa Teste'
)
INSERT INTO hr_geofences (
    client_id,
    work_location_id,
    name,
    latitude,
    longitude,
    radius_meters
)
SELECT
    wl.client_id,
    wl.work_location_id,
    'Geocerca Matriz Empresa Teste',
    -22.9068000,
    -43.1729000,
    150
FROM wl
ON CONFLICT DO NOTHING;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
),
dep_adm AS (
    SELECT id FROM hr_departments WHERE name = 'Administrativo' AND client_id = (SELECT id FROM c)
),
dep_ops AS (
    SELECT id FROM hr_departments WHERE name = 'Operações' AND client_id = (SELECT id FROM c)
),
dep_tec AS (
    SELECT id FROM hr_departments WHERE name = 'Tecnologia' AND client_id = (SELECT id FROM c)
),
pos_adm AS (
    SELECT id FROM hr_job_positions WHERE name = 'Analista Administrativo' AND client_id = (SELECT id FROM c)
),
pos_ext AS (
    SELECT id FROM hr_job_positions WHERE name = 'Técnico Externo' AND client_id = (SELECT id FROM c)
),
pos_dev AS (
    SELECT id FROM hr_job_positions WHERE name = 'Desenvolvedor' AND client_id = (SELECT id FROM c)
),
fn_adm AS (
    SELECT id FROM hr_job_functions WHERE name = 'Administrativo Padrão' AND client_id = (SELECT id FROM c)
),
fn_ext AS (
    SELECT id FROM hr_job_functions WHERE name = 'Técnico Externo' AND client_id = (SELECT id FROM c)
)
INSERT INTO hr_employee_profiles (
    client_id,
    employee_external_ref,
    first_name,
    last_name,
    cpf,
    email,
    department_id,
    job_position_id,
    job_function_id,
    admission_date
)
SELECT * FROM (
    SELECT (SELECT id FROM c), 'TESTE-001', 'Ana', 'Colaboradora Teste', '10000000001', 'ana.teste@empresa-teste.local', (SELECT id FROM dep_adm), (SELECT id FROM pos_adm), (SELECT id FROM fn_adm), DATE '2026-07-01'
    UNION ALL
    SELECT (SELECT id FROM c), 'TESTE-002', 'Bruno', 'Técnico Teste', '10000000002', 'bruno.teste@empresa-teste.local', (SELECT id FROM dep_ops), (SELECT id FROM pos_ext), (SELECT id FROM fn_ext), DATE '2026-07-01'
    UNION ALL
    SELECT (SELECT id FROM c), 'TESTE-003', 'Carla', 'Dev Teste', '10000000003', 'carla.teste@empresa-teste.local', (SELECT id FROM dep_tec), (SELECT id FROM pos_dev), (SELECT id FROM fn_adm), DATE '2026-07-01'
) AS rows(
    client_id,
    employee_external_ref,
    first_name,
    last_name,
    cpf,
    email,
    department_id,
    job_position_id,
    job_function_id,
    admission_date
)
ON CONFLICT (client_id, email) DO NOTHING;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
),
policy AS (
    INSERT INTO clock_policies (
        client_id,
        name,
        description,
        gps_required,
        min_accuracy_meters,
        geofence_required,
        allow_outside_geofence_with_justification,
        offline_allowed,
        max_offline_hours,
        selfie_required,
        telemetry_enabled,
        telemetry_interval_minutes,
        is_default
    )
    SELECT
        c.id,
        'Política Mobile Padrão',
        'Política inicial para validação do app mobile.',
        TRUE,
        30,
        FALSE,
        TRUE,
        TRUE,
        48,
        FALSE,
        FALSE,
        10,
        TRUE
    FROM c
    ON CONFLICT (client_id, name) DO UPDATE SET
        gps_required = EXCLUDED.gps_required,
        min_accuracy_meters = EXCLUDED.min_accuracy_meters,
        geofence_required = EXCLUDED.geofence_required,
        offline_allowed = EXCLUDED.offline_allowed,
        updated_at = now()
    RETURNING id
)
INSERT INTO clock_policy_event_types (
    policy_id,
    event_type_id,
    enabled,
    display_order
)
SELECT
    policy.id,
    cet.id,
    TRUE,
    cet.default_order
FROM policy
JOIN clock_event_types cet ON cet.code IN ('ENTRY', 'BREAK_START', 'BREAK_END', 'EXIT')
ON CONFLICT (policy_id, event_type_id) DO UPDATE SET
    enabled = TRUE,
    display_order = EXCLUDED.display_order;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO mobile_app_settings (
    client_id,
    min_supported_version,
    force_update,
    allow_offline,
    show_address_before_clock,
    show_pending_sync_count,
    privacy_notice_required,
    settings
)
SELECT
    c.id,
    '1.0.0',
    FALSE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    jsonb_build_object(
        'idioma', 'pt-BR',
        'tema', 'frontend-web',
        'observacao', 'Configuração inicial criada na Fase 0 + 1'
    )
FROM c
ON CONFLICT (client_id) DO UPDATE SET
    min_supported_version = EXCLUDED.min_supported_version,
    allow_offline = EXCLUDED.allow_offline,
    show_address_before_clock = EXCLUDED.show_address_before_clock,
    show_pending_sync_count = EXCLUDED.show_pending_sync_count,
    privacy_notice_required = EXCLUDED.privacy_notice_required;

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
)
INSERT INTO documents_foundation (
    client_id,
    title,
    document_type,
    status,
    requires_signature,
    requires_selfie,
    requires_location
)
SELECT
    c.id,
    'Termo de Ciência de Ponto Mobile - Teste',
    'TERMO_CIENCIA',
    'PUBLISHED',
    TRUE,
    FALSE,
    TRUE
FROM c
WHERE NOT EXISTS (
    SELECT 1 FROM documents_foundation d
    WHERE d.client_id = c.id
    AND d.title = 'Termo de Ciência de Ponto Mobile - Teste'
);

WITH c AS (
    SELECT id FROM saas_clients WHERE slug = 'empresa-teste'
),
e AS (
    SELECT id AS employee_profile_id, client_id
    FROM hr_employee_profiles
    WHERE email = 'ana.teste@empresa-teste.local'
)
INSERT INTO payslips_foundation (
    client_id,
    employee_profile_id,
    reference_month,
    reference_year,
    title,
    file_path
)
SELECT
    e.client_id,
    e.employee_profile_id,
    7,
    2026,
    'Holerite Fictício Julho/2026',
    '/arquivos/teste/holerite_julho_2026.pdf'
FROM e
WHERE NOT EXISTS (
    SELECT 1 FROM payslips_foundation p
    WHERE p.employee_profile_id = e.employee_profile_id
    AND p.reference_month = 7
    AND p.reference_year = 2026
);

INSERT INTO super_admin_users (
    email,
    full_name,
    notes
)
VALUES (
    'superadmin@rh-saas.local',
    'Super Admin Teste',
    'Usuário lógico de referência criado para a Fase 0 + 1. O login real será integrado em fase posterior.'
)
ON CONFLICT (email) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    notes = EXCLUDED.notes,
    updated_at = now();

INSERT INTO audit_logs_unified (
    client_id,
    actor_email,
    actor_role,
    action,
    entity_type,
    metadata
)
SELECT
    id,
    'script-fase-0-1@rh-saas.local',
    'SYSTEM',
    'FASE_0_1_APLICADA',
    'SAAS_CLIENT',
    jsonb_build_object(
        'fase', '0+1',
        'descricao', 'Criação de documentação, tabelas fundacionais e cliente exemplo',
        'slug', slug
    )
FROM saas_clients
WHERE slug = 'empresa-teste';
