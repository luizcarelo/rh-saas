BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO rh_saas_schema_migrations (
    migration_key,
    description,
    metadata
)
VALUES (
    'fase_1_2e_documentos_holerite_complementos',
    'Criacao e atualizacao de documentos, holerite, banco de horas e justificativa de teste.',
    jsonb_build_object(
        'fase', '1.2E',
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
UPDATE documents_foundation d
SET
    document_type = 'TERMO_CIENCIA',
    status = 'PUBLISHED',
    requires_signature = TRUE,
    requires_selfie = FALSE,
    requires_location = TRUE,
    file_path = '/arquivos/teste/termo_ciencia_ponto_mobile.pdf',
    updated_at = now()
FROM c
WHERE d.client_id = c.id
AND d.title = 'Termo de Ciencia de Ponto Mobile - Teste';

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
INSERT INTO documents_foundation (
    client_id,
    title,
    document_type,
    status,
    requires_signature,
    requires_selfie,
    requires_location,
    file_path
)
SELECT
    c.id,
    'Termo de Ciencia de Ponto Mobile - Teste',
    'TERMO_CIENCIA',
    'PUBLISHED',
    TRUE,
    FALSE,
    TRUE,
    '/arquivos/teste/termo_ciencia_ponto_mobile.pdf'
FROM c
WHERE NOT EXISTS (
    SELECT 1
    FROM documents_foundation d
    WHERE d.client_id = c.id
    AND d.title = 'Termo de Ciencia de Ponto Mobile - Teste'
);

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
doc AS (
    SELECT d.id AS document_id
    FROM documents_foundation d
    JOIN c ON c.id = d.client_id
    WHERE d.title = 'Termo de Ciencia de Ponto Mobile - Teste'
),
employees AS (
    SELECT e.id AS employee_profile_id
    FROM hr_employee_profiles e
    JOIN c ON c.id = e.client_id
    WHERE e.employee_external_ref IN ('TESTE-001', 'TESTE-002', 'TESTE-003')
)
INSERT INTO document_recipients_foundation (
    document_id,
    employee_profile_id,
    status
)
SELECT
    doc.document_id,
    employees.employee_profile_id,
    'PENDING'
FROM doc
CROSS JOIN employees
WHERE NOT EXISTS (
    SELECT 1
    FROM document_recipients_foundation dr
    WHERE dr.document_id = doc.document_id
    AND dr.employee_profile_id = employees.employee_profile_id
);

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
ana AS (
    SELECT e.id AS employee_profile_id, e.client_id
    FROM hr_employee_profiles e
    JOIN c ON c.id = e.client_id
    WHERE e.employee_external_ref = 'TESTE-001'
)
UPDATE payslips_foundation p
SET
    title = 'Holerite Ficticio Julho/2026',
    file_path = '/arquivos/teste/holerite_julho_2026.pdf',
    updated_at = now()
FROM ana
WHERE p.employee_profile_id = ana.employee_profile_id
AND p.reference_month = 7
AND p.reference_year = 2026;

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
ana AS (
    SELECT e.id AS employee_profile_id, e.client_id
    FROM hr_employee_profiles e
    JOIN c ON c.id = e.client_id
    WHERE e.employee_external_ref = 'TESTE-001'
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
    ana.client_id,
    ana.employee_profile_id,
    7,
    2026,
    'Holerite Ficticio Julho/2026',
    '/arquivos/teste/holerite_julho_2026.pdf'
FROM ana
WHERE NOT EXISTS (
    SELECT 1
    FROM payslips_foundation p
    WHERE p.employee_profile_id = ana.employee_profile_id
    AND p.reference_month = 7
    AND p.reference_year = 2026
);

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
balances AS (
    SELECT
        e.client_id,
        e.id AS employee_profile_id,
        DATE '2026-07-01' AS reference_date,
        CASE
            WHEN e.employee_external_ref = 'TESTE-001' THEN 120
            WHEN e.employee_external_ref = 'TESTE-002' THEN 0
            WHEN e.employee_external_ref = 'TESTE-003' THEN -45
            ELSE 0
        END AS balance_minutes,
        CASE
            WHEN e.employee_external_ref = 'TESTE-001' THEN 120
            ELSE 0
        END AS credit_minutes,
        CASE
            WHEN e.employee_external_ref = 'TESTE-003' THEN 45
            ELSE 0
        END AS debit_minutes
    FROM hr_employee_profiles e
    JOIN c ON c.id = e.client_id
    WHERE e.employee_external_ref IN ('TESTE-001', 'TESTE-002', 'TESTE-003')
)
INSERT INTO time_bank_balances_foundation (
    client_id,
    employee_profile_id,
    reference_date,
    balance_minutes,
    credit_minutes,
    debit_minutes
)
SELECT
    client_id,
    employee_profile_id,
    reference_date,
    balance_minutes,
    credit_minutes,
    debit_minutes
FROM balances
ON CONFLICT (client_id, employee_profile_id, reference_date) DO UPDATE SET
    balance_minutes = EXCLUDED.balance_minutes,
    credit_minutes = EXCLUDED.credit_minutes,
    debit_minutes = EXCLUDED.debit_minutes,
    updated_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
),
bruno AS (
    SELECT e.id AS employee_profile_id, e.client_id
    FROM hr_employee_profiles e
    JOIN c ON c.id = e.client_id
    WHERE e.employee_external_ref = 'TESTE-002'
)
INSERT INTO clock_justifications_foundation (
    client_id,
    employee_profile_id,
    justification_type,
    description,
    status
)
SELECT
    bruno.client_id,
    bruno.employee_profile_id,
    'PROBLEMA_GPS',
    'Justificativa de teste criada para validar fluxo de problema de GPS.',
    'PENDING'
FROM bruno
WHERE NOT EXISTS (
    SELECT 1
    FROM clock_justifications_foundation j
    WHERE j.employee_profile_id = bruno.employee_profile_id
    AND j.justification_type = 'PROBLEMA_GPS'
    AND j.status = 'PENDING'
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
    'script-fase-1-2e@rh-saas.local',
    'SYSTEM',
    'FASE_1_2E_DOCUMENTOS_HOLERITE_COMPLEMENTOS_APLICADA',
    'SAAS_CLIENT',
    sc.slug,
    jsonb_build_object(
        'fase', '1.2E',
        'descricao', 'Documentos, holerite, banco de horas e justificativa de teste aplicados.',
        'slug', sc.slug
    )
FROM saas_clients sc
WHERE sc.slug = 'empresa-teste';

COMMIT;
