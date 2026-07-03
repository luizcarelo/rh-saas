BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO rh_saas_schema_migrations (
    migration_key,
    description,
    metadata
)
VALUES (
    'fase_1_2d_tipos_batida_politica_mobile',
    'Criacao e atualizacao dos tipos de batida e politica mobile padrao.',
    jsonb_build_object(
        'fase', '1.2D',
        'slug_cliente', 'empresa-teste'
    )
)
ON CONFLICT (migration_key) DO UPDATE SET
    description = EXCLUDED.description,
    metadata = EXCLUDED.metadata,
    executed_at = now();

INSERT INTO clock_event_types (
    code,
    name,
    description,
    pair_code,
    category,
    default_order,
    active_by_default
)
VALUES
(
    'ENTRY',
    'Entrada',
    'Inicio da jornada de trabalho.',
    'EXIT',
    'WORK',
    10,
    TRUE
),
(
    'EXIT',
    'Saida',
    'Encerramento da jornada.',
    'ENTRY',
    'WORK',
    20,
    TRUE
),
(
    'BREAK_START',
    'Inicio de Intervalo',
    'Saida para almoco, refeicao ou descanso.',
    'BREAK_END',
    'BREAK',
    30,
    TRUE
),
(
    'BREAK_END',
    'Fim de Intervalo',
    'Retorno do intervalo.',
    'BREAK_START',
    'BREAK',
    40,
    TRUE
),
(
    'OVERTIME_START',
    'Inicio de Hora Extra',
    'Inicio de atividades alem da jornada normal.',
    'OVERTIME_END',
    'OVERTIME',
    50,
    FALSE
),
(
    'OVERTIME_END',
    'Fim de Hora Extra',
    'Encerramento das horas extras.',
    'OVERTIME_START',
    'OVERTIME',
    60,
    FALSE
),
(
    'EXTERNAL_VISIT_START',
    'Saida para Visita Externa',
    'Saida para cliente, fornecedor ou atividade externa.',
    'EXTERNAL_VISIT_END',
    'EXTERNAL',
    70,
    FALSE
),
(
    'EXTERNAL_VISIT_END',
    'Retorno de Visita Externa',
    'Retorno a empresa.',
    'EXTERNAL_VISIT_START',
    'EXTERNAL',
    80,
    FALSE
),
(
    'ON_CALL_START',
    'Inicio de Sobreaviso',
    'Funcionario fica disponivel para ser acionado.',
    'ON_CALL_END',
    'ON_CALL',
    90,
    FALSE
),
(
    'ON_CALL_END',
    'Fim de Sobreaviso',
    'Encerramento do periodo de sobreaviso.',
    'ON_CALL_START',
    'ON_CALL',
    100,
    FALSE
),
(
    'SHIFT_DUTY_START',
    'Inicio de Plantao',
    'Inicio de turno especial ou plantao.',
    'SHIFT_DUTY_END',
    'SHIFT',
    110,
    FALSE
),
(
    'SHIFT_DUTY_END',
    'Fim de Plantao',
    'Encerramento do plantao.',
    'SHIFT_DUTY_START',
    'SHIFT',
    120,
    FALSE
),
(
    'TECH_PAUSE_START',
    'Pausa Tecnica',
    'Parada para treinamentos, reunioes ou atividades especificas.',
    'TECH_PAUSE_END',
    'PAUSE',
    130,
    FALSE
),
(
    'TECH_PAUSE_END',
    'Retorno da Pausa Tecnica',
    'Retorno as atividades normais.',
    'TECH_PAUSE_START',
    'PAUSE',
    140,
    FALSE
),
(
    'PERSONAL_EXIT_START',
    'Saida Particular',
    'Ausencia temporaria para assuntos pessoais autorizados.',
    'PERSONAL_EXIT_END',
    'PERSONAL',
    150,
    FALSE
),
(
    'PERSONAL_EXIT_END',
    'Retorno de Saida Particular',
    'Retorno apos a saida autorizada.',
    'PERSONAL_EXIT_START',
    'PERSONAL',
    160,
    FALSE
),
(
    'TRAVEL_START',
    'Inicio de Viagem',
    'Inicio de deslocamento a trabalho.',
    'TRAVEL_END',
    'TRAVEL',
    170,
    FALSE
),
(
    'TRAVEL_END',
    'Fim de Viagem',
    'Retorno ou encerramento da viagem.',
    'TRAVEL_START',
    'TRAVEL',
    180,
    FALSE
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    pair_code = EXCLUDED.pair_code,
    category = EXCLUDED.category,
    default_order = EXCLUDED.default_order,
    active_by_default = EXCLUDED.active_by_default,
    updated_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
)
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
    'Politica Mobile Padrao',
    'Politica inicial para validacao do app mobile.',
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
    description = EXCLUDED.description,
    gps_required = EXCLUDED.gps_required,
    min_accuracy_meters = EXCLUDED.min_accuracy_meters,
    geofence_required = EXCLUDED.geofence_required,
    allow_outside_geofence_with_justification = EXCLUDED.allow_outside_geofence_with_justification,
    offline_allowed = EXCLUDED.offline_allowed,
    max_offline_hours = EXCLUDED.max_offline_hours,
    selfie_required = EXCLUDED.selfie_required,
    telemetry_enabled = EXCLUDED.telemetry_enabled,
    telemetry_interval_minutes = EXCLUDED.telemetry_interval_minutes,
    is_default = EXCLUDED.is_default,
    updated_at = now();

WITH policy AS (
    SELECT cp.id AS policy_id
    FROM clock_policies cp
    JOIN saas_clients sc ON sc.id = cp.client_id
    WHERE sc.slug = 'empresa-teste'
    AND cp.name = 'Politica Mobile Padrao'
),
event_types AS (
    SELECT id, default_order
    FROM clock_event_types
    WHERE code IN (
        'ENTRY',
        'BREAK_START',
        'BREAK_END',
        'EXIT'
    )
)
INSERT INTO clock_policy_event_types (
    policy_id,
    event_type_id,
    enabled,
    requires_selfie,
    requires_geofence,
    requires_justification,
    display_order
)
SELECT
    policy.policy_id,
    event_types.id,
    TRUE,
    FALSE,
    FALSE,
    FALSE,
    event_types.default_order
FROM policy
CROSS JOIN event_types
ON CONFLICT (policy_id, event_type_id) DO UPDATE SET
    enabled = TRUE,
    requires_selfie = FALSE,
    requires_geofence = FALSE,
    requires_justification = FALSE,
    display_order = EXCLUDED.display_order,
    updated_at = now();

WITH c AS (
    SELECT id
    FROM saas_clients
    WHERE slug = 'empresa-teste'
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
        'gpsPrecisaoMinimaMetros', 30,
        'exibirEnderecoAntesDaBatida', TRUE,
        'exibirPendenciasSincronizacao', TRUE,
        'observacao', 'Configuracao inicial criada na Fase 1.2D'
    )
FROM c
ON CONFLICT (client_id) DO UPDATE SET
    min_supported_version = EXCLUDED.min_supported_version,
    force_update = EXCLUDED.force_update,
    allow_offline = EXCLUDED.allow_offline,
    show_address_before_clock = EXCLUDED.show_address_before_clock,
    show_pending_sync_count = EXCLUDED.show_pending_sync_count,
    privacy_notice_required = EXCLUDED.privacy_notice_required,
    settings = EXCLUDED.settings,
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
    'script-fase-1-2d@rh-saas.local',
    'SYSTEM',
    'FASE_1_2D_TIPOS_BATIDA_POLITICA_MOBILE_APLICADA',
    'SAAS_CLIENT',
    sc.slug,
    jsonb_build_object(
        'fase', '1.2D',
        'descricao', 'Tipos de batida e politica mobile aplicados.',
        'slug', sc.slug
    )
FROM saas_clients sc
WHERE sc.slug = 'empresa-teste';

COMMIT;
