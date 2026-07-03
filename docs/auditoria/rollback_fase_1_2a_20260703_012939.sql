-- ROLLBACK DOCUMENTAL - FASE 1.2A
-- NAO EXECUTAR sem aceite formal.
-- Backup completo antes da fase:
-- /opt/rh-saas/backups/fase_1_2a_cliente_modulos/rh_saas_db_backup_fase_1_2a_20260703_012939.sql

-- Remover cliente exemplo e dados ligados por chave estrangeira:
-- DELETE FROM saas_clients WHERE slug = 'empresa-teste';

-- Remover usuario logico Super Admin de teste:
-- DELETE FROM super_admin_users WHERE email = 'superadmin@rh-saas.local';

-- Remover registro da migration:
-- DELETE FROM rh_saas_schema_migrations
-- WHERE migration_key = 'fase_1_2a_cliente_modulos';
