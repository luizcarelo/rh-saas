-- ROLLBACK DOCUMENTAL - FASE 1.2B
-- NAO EXECUTAR sem aceite formal.
-- Backup completo antes da fase:
-- /opt/rh-saas/backups/fase_1_2b_estrutura_rh/rh_saas_db_backup_fase_1_2b_20260703_013207.sql

-- Remover estrutura RH do cliente exemplo:
-- DELETE FROM hr_companies WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste');
-- DELETE FROM hr_departments WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste');
-- DELETE FROM hr_cost_centers WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste');
-- DELETE FROM hr_job_positions WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste');
-- DELETE FROM hr_job_functions WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste');
-- DELETE FROM hr_work_locations WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste');

-- Remover registro da migration:
-- DELETE FROM rh_saas_schema_migrations
-- WHERE migration_key = 'fase_1_2b_estrutura_rh';
