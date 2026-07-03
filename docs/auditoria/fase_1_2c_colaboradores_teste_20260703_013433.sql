BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO rh_saas_schema_migrations (
    migration_key,
    description,
    metadata
)
VALUES (
    'fase_1_2c_colaboradores_teste',
    'Criacao e atualizacao dos colaboradores teste do cliente exemplo.',
    jsonb_build_object(
        'fase', '1.2C',
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
),
dep_adm AS (
    SELECT d.id
    FROM hr_departments d
    JOIN c ON c.id = d.client_id
    WHERE d.name = 'Administrativo'
),
dep_ops AS (
    SELECT d.id
    FROM hr_departments d
    JOIN c ON c.id = d.client_id
    WHERE d.name = 'Operacoes'
),
dep_tec AS (
    SELECT d.id
    FROM hr_departments d
    JOIN c ON c.id = d.client_id
    WHERE d.name = 'Tecnologia'
),
cargo_adm AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Analista Administrativo'
),
cargo_ext AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Tecnico Externo'
),
cargo_dev AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Desenvolvedor'
),
func_adm AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Administrativo Padrao'
),
func_ext AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Tecnico Externo'
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
    admission_date,
    status
)
SELECT
    c.id,
    data.employee_external_ref,
    data.first_name,
    data.last_name,
    data.cpf,
    data.email,
    data.department_id,
    data.job_position_id,
    data.job_function_id,
    data.admission_date,
    data.status
FROM c
CROSS JOIN (
    SELECT
        'TESTE-001' AS employee_external_ref,
        'Ana' AS first_name,
        'Colaboradora Teste' AS last_name,
        '10000000001' AS cpf,
        'ana.teste@empresa-teste.local' AS email,
        (SELECT id FROM dep_adm) AS department_id,
        (SELECT id FROM cargo_adm) AS job_position_id,
        (SELECT id FROM func_adm) AS job_function_id,
        DATE '2026-07-01' AS admission_date,
        'ACTIVE' AS status
    UNION ALL
    SELECT
        'TESTE-002',
        'Bruno',
        'Tecnico Teste',
        '10000000002',
        'bruno.teste@empresa-teste.local',
        (SELECT id FROM dep_ops),
        (SELECT id FROM cargo_ext),
        (SELECT id FROM func_ext),
        DATE '2026-07-01',
        'ACTIVE'
    UNION ALL
    SELECT
        'TESTE-003',
        'Carla',
        'Dev Teste',
        '10000000003',
        'carla.teste@empresa-teste.local',
        (SELECT id FROM dep_tec),
        (SELECT id FROM cargo_dev),
        (SELECT id FROM func_adm),
        DATE '2026-07-01',
        'ACTIVE'
) AS data
ON CONFLICT (client_id, email) DO UPDATE SET
    employee_external_ref = EXCLUDED.employee_external_ref,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    cpf = EXCLUDED.cpf,
    department_id = EXCLUDED.department_id,
    job_position_id = EXCLUDED.job_position_id,
    job_function_id = EXCLUDED.job_function_id,
    admission_date = EXCLUDED.admission_date,
    status = EXCLUDED.status,
    updated_at = now();

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
    'script-fase-1-2c@rh-saas.local',
    'SYSTEM',
    'FASE_1_2C_COLABORADORES_TESTE_APLICADA',
    'SAAS_CLIENT',
    sc.slug,
    jsonb_build_object(
        'fase', '1.2C',
        'descricao', 'Colaboradores teste aplicados.',
        'slug', sc.slug
    )
FROM saas_clients sc
WHERE sc.slug = 'empresa-teste';

COMMIT;
