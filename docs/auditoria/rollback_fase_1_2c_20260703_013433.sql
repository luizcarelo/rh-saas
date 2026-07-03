-- ROLLBACK DOCUMENTAL - FASE 1.2C
-- NAO EXECUTAR sem aceite formal.
-- Backup completo antes da fase:
-- /opt/rh-saas/backups/fase_1_2c_colaboradores_teste/rh_saas_db_backup_fase_1_2c_20260703_013433.sql

-- Remover colaboradores teste:
-- DELETE FROM hr_employee_profiles
-- WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste')
-- AND employee_external_ref IN ('TESTE-001', 'TESTE-002', 'TESTE-003');

-- Remover registro da migration:
-- DELETE FROM rh_saas_schema_migrations
-- WHERE migration_key = 'fase_1_2c_colaboradores_teste';
