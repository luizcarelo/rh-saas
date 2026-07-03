-- ROLLBACK DOCUMENTAL - FASE 1.4
-- NAO EXECUTAR sem aceite formal.
-- Backup completo antes da fase:
-- /opt/rh-saas/backups/fase_1_4_normalizar_nomes_duplicados/rh_saas_db_backup_fase_1_4_20260703_014040.sql

-- Esta fase normalizou nomes duplicados na base de teste.
-- Para rollback completo, preferir restaurar o backup acima.

-- Operacoes -> Operações
-- Tecnico Externo -> Técnico Externo
-- Gestor de Operacoes -> Gestor de Operações
-- Administrativo Padrao -> Administrativo Padrão

-- Remover registro da migration:
-- DELETE FROM rh_saas_schema_migrations
-- WHERE migration_key = 'fase_1_4_normalizar_nomes_duplicados';
