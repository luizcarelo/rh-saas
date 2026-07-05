# Admin-A1-FUNC-MIG-P4C — Aplicar conteúdo real nas migrations 001 e 002

Data: 20260705_164425

## Status

```text
ADMIN_A1_FUNC_MIG_P4C_VALIDACAO_FALHOU
```

## Arquivos atualizados

```text
/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4_20260705_162551/001-CreateEmployeeDocumentTypes.ts
/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4_20260705_162551/002-UpgradeDocuments.ts
```

## Análise

```text
MIG_DIR=/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4_20260705_162551
MIG_001=/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4_20260705_162551/001-CreateEmployeeDocumentTypes.ts
MIG_002=/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4_20260705_162551/002-UpgradeDocuments.ts

HAS_001_TABLE=SIM
HAS_001_UNIQUE=SIM
HAS_001_TENANT_INDEX=SIM
HAS_001_ACTIVE_INDEX=SIM
HAS_001_DOWN=SIM

HAS_002_CONVERT_TENANT=NAO
HAS_002_CONVERT_EMPLOYEE=NAO
HAS_002_DOCUMENT_TYPE=SIM
HAS_002_STATUS=SIM
HAS_002_VERSION=SIM
HAS_002_EXPIRATION=SIM
HAS_002_FK_EMPLOYEE=SIM
HAS_002_FK_TYPE=SIM
HAS_002_FK_REPLACED=SIM
HAS_002_INDEXES=SIM
HAS_002_DOWN=SIM

REPORT=/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4C_aplicar_001_002_20260705_164425/RELATORIO_ADMIN_A1_FUNC_MIG_P4C_APLICAR_001_002.md
OUTDIR=/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4C_aplicar_001_002_20260705_164425
BACKUP=/opt/rh-saas/backups/admin_A1_FUNC_MIG_P4C_aplicar_001_002_20260705_164425
CONCLUSION=ADMIN_A1_FUNC_MIG_P4C_VALIDACAO_FALHOU
```

## Backup

```text
/opt/rh-saas/backups/admin_A1_FUNC_MIG_P4C_aplicar_001_002_20260705_164425
```

## Regras

- Nenhuma migration foi executada.
- Nenhum banco foi alterado.
- Nenhum SQL foi executado.
- Nenhum backend foi alterado.
- Nenhum frontend foi alterado.
- Nenhum container foi reiniciado.

## Próximo passo

Executar novamente:

```text
Admin-A1-FUNC-MIG-P4B — Revisão de consistência das migrations 001 e 002
```
