-- ROLLBACK DOCUMENTAL - FASE 1.2E
-- NAO EXECUTAR sem aceite formal.
-- Backup completo antes da fase:
-- /opt/rh-saas/backups/fase_1_2e_documentos_holerite_complementos/rh_saas_db_backup_fase_1_2e_20260703_013705.sql

-- Remover documento de teste e destinatarios ligados:
-- DELETE FROM documents_foundation
-- WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste')
-- AND title = 'Termo de Ciencia de Ponto Mobile - Teste';

-- Remover holerite ficticio:
-- DELETE FROM payslips_foundation
-- WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste')
-- AND reference_month = 7
-- AND reference_year = 2026
-- AND title = 'Holerite Ficticio Julho/2026';

-- Remover saldos ficticios de banco de horas:
-- DELETE FROM time_bank_balances_foundation
-- WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste')
-- AND reference_date = DATE '2026-07-01';

-- Remover justificativa de teste:
-- DELETE FROM clock_justifications_foundation
-- WHERE client_id IN (SELECT id FROM saas_clients WHERE slug = 'empresa-teste')
-- AND justification_type = 'PROBLEMA_GPS'
-- AND status = 'PENDING';

-- Remover registro da migration:
-- DELETE FROM rh_saas_schema_migrations
-- WHERE migration_key = 'fase_1_2e_documentos_holerite_complementos';
