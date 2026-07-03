-- ROLLBACK DOCUMENTAL - FASE 1.2D
-- NAO EXECUTAR sem aceite formal.
-- Backup completo antes da fase:
-- /opt/rh-saas/backups/fase_1_2d_tipos_batida_politica_mobile/rh_saas_db_backup_fase_1_2d_20260703_013551.sql

-- Remover politica mobile do cliente exemplo:
-- DELETE FROM clock_policies
-- WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste')
-- AND name = 'Politica Mobile Padrao';

-- Remover configuracao mobile do cliente exemplo:
-- DELETE FROM mobile_app_settings
-- WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste');

-- Remover tipos de batida, somente se nao estiverem sendo utilizados:
-- DELETE FROM clock_event_types
-- WHERE code IN (
--   'ENTRY',
--   'EXIT',
--   'BREAK_START',
--   'BREAK_END',
--   'OVERTIME_START',
--   'OVERTIME_END',
--   'EXTERNAL_VISIT_START',
--   'EXTERNAL_VISIT_END',
--   'ON_CALL_START',
--   'ON_CALL_END',
--   'SHIFT_DUTY_START',
--   'SHIFT_DUTY_END',
--   'TECH_PAUSE_START',
--   'TECH_PAUSE_END',
--   'PERSONAL_EXIT_START',
--   'PERSONAL_EXIT_END',
--   'TRAVEL_START',
--   'TRAVEL_END'
-- );

-- Remover registro da migration:
-- DELETE FROM rh_saas_schema_migrations
-- WHERE migration_key = 'fase_1_2d_tipos_batida_politica_mobile';
