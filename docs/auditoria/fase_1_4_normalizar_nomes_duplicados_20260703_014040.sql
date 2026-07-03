BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO rh_saas_schema_migrations (
    migration_key,
    description,
    metadata
)
VALUES (
    'fase_1_4_normalizar_nomes_duplicados',
    'Normalizacao dos nomes duplicados com e sem acento na base de teste empresa-teste.',
    jsonb_build_object(
        'fase', '1.4',
        'slug_cliente', 'empresa-teste'
    )
)
ON CONFLICT (migration_key) DO UPDATE SET
    description = EXCLUDED.description,
    metadata = EXCLUDED.metadata,
    executed_at = now();

-- Departamentos: Operacoes deve ser o registro canonico.
WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT d.id
    FROM hr_departments d
    JOIN c ON c.id = d.client_id
    WHERE d.name = 'Operacoes'
    LIMIT 1
),
dup AS (
    SELECT d.id
    FROM hr_departments d
    JOIN c ON c.id = d.client_id
    WHERE d.name = 'Operações'
)
UPDATE hr_employee_profiles e
SET
    department_id = canon.id,
    updated_at = now()
FROM canon, dup
WHERE e.department_id = dup.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT d.id
    FROM hr_departments d
    JOIN c ON c.id = d.client_id
    WHERE d.name = 'Operacoes'
    LIMIT 1
)
DELETE FROM hr_departments d
USING c, canon
WHERE d.client_id = c.id
AND d.name = 'Operações'
AND d.id <> canon.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
UPDATE hr_departments d
SET
    name = 'Operacoes',
    description = 'Departamento operacional de teste.',
    updated_at = now()
FROM c
WHERE d.client_id = c.id
AND d.name = 'Operações'
AND NOT EXISTS (
    SELECT 1
    FROM hr_departments d2
    WHERE d2.client_id = c.id
    AND d2.name = 'Operacoes'
);

-- Cargos: Tecnico Externo deve ser o registro canonico.
WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Tecnico Externo'
    LIMIT 1
),
dup AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Técnico Externo'
)
UPDATE hr_employee_profiles e
SET
    job_position_id = canon.id,
    updated_at = now()
FROM canon, dup
WHERE e.job_position_id = dup.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Tecnico Externo'
    LIMIT 1
)
DELETE FROM hr_job_positions jp
USING c, canon
WHERE jp.client_id = c.id
AND jp.name = 'Técnico Externo'
AND jp.id <> canon.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
UPDATE hr_job_positions jp
SET
    name = 'Tecnico Externo',
    description = 'Cargo com atividades externas.',
    updated_at = now()
FROM c
WHERE jp.client_id = c.id
AND jp.name = 'Técnico Externo'
AND NOT EXISTS (
    SELECT 1
    FROM hr_job_positions jp2
    WHERE jp2.client_id = c.id
    AND jp2.name = 'Tecnico Externo'
);

-- Cargos: Gestor de Operacoes deve ser o registro canonico.
WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Gestor de Operacoes'
    LIMIT 1
),
dup AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Gestor de Operações'
)
UPDATE hr_employee_profiles e
SET
    job_position_id = canon.id,
    updated_at = now()
FROM canon, dup
WHERE e.job_position_id = dup.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jp.id
    FROM hr_job_positions jp
    JOIN c ON c.id = jp.client_id
    WHERE jp.name = 'Gestor de Operacoes'
    LIMIT 1
)
DELETE FROM hr_job_positions jp
USING c, canon
WHERE jp.client_id = c.id
AND jp.name = 'Gestor de Operações'
AND jp.id <> canon.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
UPDATE hr_job_positions jp
SET
    name = 'Gestor de Operacoes',
    description = 'Cargo de gestao operacional.',
    updated_at = now()
FROM c
WHERE jp.client_id = c.id
AND jp.name = 'Gestor de Operações'
AND NOT EXISTS (
    SELECT 1
    FROM hr_job_positions jp2
    WHERE jp2.client_id = c.id
    AND jp2.name = 'Gestor de Operacoes'
);

-- Funcoes: Administrativo Padrao deve ser o registro canonico.
WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Administrativo Padrao'
    LIMIT 1
),
dup AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Administrativo Padrão'
)
UPDATE hr_employee_profiles e
SET
    job_function_id = canon.id,
    updated_at = now()
FROM canon, dup
WHERE e.job_function_id = dup.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Administrativo Padrao'
    LIMIT 1
)
DELETE FROM hr_job_functions jf
USING c, canon
WHERE jf.client_id = c.id
AND jf.name = 'Administrativo Padrão'
AND jf.id <> canon.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
UPDATE hr_job_functions jf
SET
    name = 'Administrativo Padrao',
    description = 'Fluxo padrao de jornada com intervalo.',
    updated_at = now()
FROM c
WHERE jf.client_id = c.id
AND jf.name = 'Administrativo Padrão'
AND NOT EXISTS (
    SELECT 1
    FROM hr_job_functions jf2
    WHERE jf2.client_id = c.id
    AND jf2.name = 'Administrativo Padrao'
);

-- Funcoes: Tecnico Externo deve ser o registro canonico.
WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Tecnico Externo'
    LIMIT 1
),
dup AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Técnico Externo'
)
UPDATE hr_employee_profiles e
SET
    job_function_id = canon.id,
    updated_at = now()
FROM canon, dup
WHERE e.job_function_id = dup.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
canon AS (
    SELECT jf.id
    FROM hr_job_functions jf
    JOIN c ON c.id = jf.client_id
    WHERE jf.name = 'Tecnico Externo'
    LIMIT 1
)
DELETE FROM hr_job_functions jf
USING c, canon
WHERE jf.client_id = c.id
AND jf.name = 'Técnico Externo'
AND jf.id <> canon.id;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
UPDATE hr_job_functions jf
SET
    name = 'Tecnico Externo',
    description = 'Permite visita externa e deslocamentos.',
    updated_at = now()
FROM c
WHERE jf.client_id = c.id
AND jf.name = 'Técnico Externo'
AND NOT EXISTS (
    SELECT 1
    FROM hr_job_functions jf2
    WHERE jf2.client_id = c.id
    AND jf2.name = 'Tecnico Externo'
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
    'script-fase-1-4@rh-saas.local',
    'SYSTEM',
    'FASE_1_4_NORMALIZACAO_NOMES_DUPLICADOS_APLICADA',
    'SAAS_CLIENT',
    sc.slug,
    jsonb_build_object(
        'fase', '1.4',
        'descricao', 'Normalizacao de nomes duplicados com e sem acento aplicada.',
        'slug', sc.slug
    )
FROM saas_clients sc
WHERE sc.slug = 'empresa-teste';

COMMIT;
