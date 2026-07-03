BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO rh_saas_schema_migrations (
    migration_key,
    description,
    metadata
)
VALUES (
    'fase_1_2b_estrutura_rh',
    'Criacao e atualizacao da estrutura RH base do cliente exemplo.',
    jsonb_build_object(
        'fase', '1.2B',
        'slug_cliente', 'empresa-teste'
    )
)
ON CONFLICT (migration_key) DO UPDATE SET
    description = EXCLUDED.description,
    metadata = EXCLUDED.metadata,
    executed_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
UPDATE hr_companies hc
SET
    legal_name = 'SAAS RH PRO EMPRESA TESTE LTDA',
    trade_name = 'Empresa Teste RH SaaS',
    updated_at = now()
FROM c
WHERE hc.client_id = c.id
AND hc.document_number = '11222333000181';

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
INSERT INTO hr_companies (
    client_id,
    legal_name,
    trade_name,
    document_number
)
SELECT
    c.id,
    'SAAS RH PRO EMPRESA TESTE LTDA',
    'Empresa Teste RH SaaS',
    '11222333000181'
FROM c
WHERE NOT EXISTS (
    SELECT 1
    FROM hr_companies hc
    WHERE hc.client_id = c.id
    AND hc.document_number = '11222333000181'
);

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
INSERT INTO hr_departments (
    client_id,
    name,
    description
)
SELECT c.id, data.name, data.description
FROM c
CROSS JOIN (
    VALUES
    ('Administrativo', 'Departamento administrativo de teste.'),
    ('Operacoes', 'Departamento operacional de teste.'),
    ('Tecnologia', 'Departamento de tecnologia de teste.')
) AS data(name, description)
ON CONFLICT (client_id, name) DO UPDATE SET
    description = EXCLUDED.description,
    updated_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
INSERT INTO hr_cost_centers (
    client_id,
    code,
    name
)
SELECT c.id, data.code, data.name
FROM c
CROSS JOIN (
    VALUES
    ('ADM', 'Administrativo'),
    ('OPS', 'Operacoes'),
    ('TEC', 'Tecnologia')
) AS data(code, name)
ON CONFLICT (client_id, code) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
INSERT INTO hr_job_positions (
    client_id,
    name,
    description
)
SELECT c.id, data.name, data.description
FROM c
CROSS JOIN (
    VALUES
    ('Analista Administrativo', 'Cargo administrativo padrao.'),
    ('Tecnico Externo', 'Cargo com atividades externas.'),
    ('Gestor de Operacoes', 'Cargo de gestao operacional.'),
    ('Assistente de RH', 'Cargo de apoio ao RH.'),
    ('Desenvolvedor', 'Cargo tecnico de tecnologia.')
) AS data(name, description)
ON CONFLICT (client_id, name) DO UPDATE SET
    description = EXCLUDED.description,
    updated_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
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
SELECT
    c.id,
    data.name,
    data.description,
    data.allows_external_visit,
    data.allows_travel,
    data.allows_overtime,
    data.allows_on_call,
    data.allows_shift_duty
FROM c
CROSS JOIN (
    VALUES
    ('Administrativo Padrao', 'Fluxo padrao de jornada com intervalo.', FALSE, FALSE, TRUE, FALSE, FALSE),
    ('Tecnico Externo', 'Permite visita externa e deslocamentos.', TRUE, TRUE, TRUE, FALSE, FALSE),
    ('Plantonista', 'Permite plantao e sobreaviso.', FALSE, FALSE, TRUE, TRUE, TRUE),
    ('Gestor', 'Permite funcoes ampliadas de operacao.', TRUE, TRUE, TRUE, TRUE, TRUE)
) AS data(
    name,
    description,
    allows_external_visit,
    allows_travel,
    allows_overtime,
    allows_on_call,
    allows_shift_duty
)
ON CONFLICT (client_id, name) DO UPDATE SET
    description = EXCLUDED.description,
    allows_external_visit = EXCLUDED.allows_external_visit,
    allows_travel = EXCLUDED.allows_travel,
    allows_overtime = EXCLUDED.allows_overtime,
    allows_on_call = EXCLUDED.allows_on_call,
    allows_shift_duty = EXCLUDED.allows_shift_duty,
    updated_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
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
    'Endereco de teste para validacao interna',
    'Rio de Janeiro',
    'RJ',
    -22.9068000,
    -43.1729000
FROM c
ON CONFLICT (client_id, name) DO UPDATE SET
    address_line = EXCLUDED.address_line,
    city = EXCLUDED.city,
    state = EXCLUDED.state,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    updated_at = now();

WITH wl AS (
    SELECT
        id AS work_location_id,
        client_id
    FROM hr_work_locations
    WHERE name = 'Matriz Empresa Teste'
)
UPDATE hr_geofences g
SET
    latitude = -22.9068000,
    longitude = -43.1729000,
    radius_meters = 150,
    is_active = TRUE,
    updated_at = now()
FROM wl
WHERE g.client_id = wl.client_id
AND g.name = 'Geocerca Matriz Empresa Teste';

WITH wl AS (
    SELECT
        id AS work_location_id,
        client_id
    FROM hr_work_locations
    WHERE name = 'Matriz Empresa Teste'
)
INSERT INTO hr_geofences (
    client_id,
    work_location_id,
    name,
    latitude,
    longitude,
    radius_meters,
    is_active
)
SELECT
    wl.client_id,
    wl.work_location_id,
    'Geocerca Matriz Empresa Teste',
    -22.9068000,
    -43.1729000,
    150,
    TRUE
FROM wl
WHERE NOT EXISTS (
    SELECT 1
    FROM hr_geofences g
    WHERE g.client_id = wl.client_id
    AND g.name = 'Geocerca Matriz Empresa Teste'
);

INSERT INTO audit_logs_unified (
    client_id,
    tenant_id,
    actor_email,
    actor_role,
    action,
    entity_type,
    entity_id,
    metadata
)
SELECT
    sc.id,
    sc.tenant_id,
    'script-fase-1-2b@rh-saas.local',
    'SYSTEM',
    'FASE_1_2B_ESTRUTURA_RH_APLICADA',
    'SAAS_CLIENT',
    sc.slug,
    jsonb_build_object(
        'fase', '1.2B',
        'descricao', 'Estrutura RH base aplicada.',
        'slug', sc.slug
    )
FROM saas_clients sc
WHERE sc.slug = 'empresa-teste';

COMMIT;
