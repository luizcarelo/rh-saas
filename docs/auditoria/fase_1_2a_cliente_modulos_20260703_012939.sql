BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO rh_saas_schema_migrations (
    migration_key,
    description,
    metadata
)
VALUES (
    'fase_1_2a_cliente_modulos',
    'Criacao e atualizacao de planos SaaS, cliente exemplo e modulos ativos.',
    jsonb_build_object(
        'fase', '1.2A',
        'slug_cliente', 'empresa-teste'
    )
)
ON CONFLICT (migration_key) DO UPDATE SET
    description = EXCLUDED.description,
    metadata = EXCLUDED.metadata,
    executed_at = now();

INSERT INTO saas_plans (
    code,
    name,
    description,
    is_active
)
VALUES
(
    'TRIAL',
    'Teste',
    'Plano de teste para validacao interna.',
    TRUE
),
(
    'ENTERPRISE_TEST',
    'Enterprise Teste',
    'Plano completo para cliente exemplo e homologacao interna.',
    TRUE
),
(
    'ENTERPRISE',
    'Enterprise',
    'Plano completo para clientes de producao.',
    TRUE
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    is_active = EXCLUDED.is_active,
    updated_at = now();

WITH plan AS (
    SELECT id
    FROM saas_plans
    WHERE code = 'ENTERPRISE_TEST'
),
client_upsert AS (
    INSERT INTO saas_clients (
        plan_id,
        slug,
        trade_name,
        legal_name,
        document_number,
        status,
        timezone,
        default_locale,
        notes
    )
    SELECT
        plan.id,
        'empresa-teste',
        'Empresa Teste RH SaaS',
        'SAAS RH PRO EMPRESA TESTE LTDA',
        '11222333000181',
        'ACTIVE',
        'America/Sao_Paulo',
        'pt-BR',
        'Cliente exemplo criado para testes controlados do RH SaaS.'
    FROM plan
    ON CONFLICT (slug) DO UPDATE SET
        plan_id = EXCLUDED.plan_id,
        trade_name = EXCLUDED.trade_name,
        legal_name = EXCLUDED.legal_name,
        document_number = EXCLUDED.document_number,
        status = EXCLUDED.status,
        timezone = EXCLUDED.timezone,
        default_locale = EXCLUDED.default_locale,
        notes = EXCLUDED.notes,
        updated_at = now()
    RETURNING id, tenant_id, slug
)
INSERT INTO tenant_module_flags (
    client_id,
    module_code,
    enabled,
    settings
)
SELECT
    client_upsert.id,
    modules.module_code,
    TRUE,
    '{}'::jsonb
FROM client_upsert
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
    enabled = TRUE,
    settings = EXCLUDED.settings,
    updated_at = now();

INSERT INTO super_admin_users (
    email,
    full_name,
    is_active,
    notes
)
VALUES (
    'superadmin@rh-saas.local',
    'Super Admin Teste',
    TRUE,
    'Usuario logico de referencia criado para testes. O login real sera integrado em fase posterior.'
)
ON CONFLICT (email) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    is_active = EXCLUDED.is_active,
    notes = EXCLUDED.notes,
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
    'script-fase-1-2a@rh-saas.local',
    'SYSTEM',
    'FASE_1_2A_CLIENTE_MODULOS_APLICADA',
    'SAAS_CLIENT',
    sc.slug,
    jsonb_build_object(
        'fase', '1.2A',
        'descricao', 'Plano, cliente exemplo e modulos aplicados.',
        'slug', sc.slug
    )
FROM saas_clients sc
WHERE sc.slug = 'empresa-teste';

COMMIT;
