# SuperAdmin-A4-E5-D-FIX1 — Teste controlado de criação com senha via env

Data: 20260705_031947

## Status

```text
CLIENTE_HOMOLOGACAO_NAO_CRIADO_POST_ERRO
```

## Resumo

```text
SERVICE_OK=SIM
APP_OK=SIM
PAGE_OK=SIM
TSC_STATUS=TSC_OK
BUILD_STATUS=BUILD_OK
LOGIN_STATUS=200
SUPER_ROLE=SUPER_ADMIN
SUPER_HAS_TOKEN=True
CLIENT_NAME=Cliente Homologação RH SaaS 20260705_031947
CLIENT_SLUG=cliente-homologacao-rh-saas-20260705_031947
CLIENT_EMAIL=homologacao+20260705_031947@rh-saas.local
CREATE_OK=NAO
SELECTED_ENDPOINT=
CREATE_STATUS=
CREATED_ID=nao localizado
CREATED_SLUG=nao localizado
CREATED_EMAIL=nao localizado
VERIFY_FOUND=NAO
CONCLUSION=CLIENTE_HOMOLOGACAO_NAO_CRIADO_POST_ERRO
```

## Payload usado

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/create_payload_redacted.json
```

## Tentativas de criação

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/create_attempts.tsv
```

## Resposta redigida da criação

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/create_response_redacted.json
```

## Análise da criação

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/create_analysis.txt
```

## Verificação por GET

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/verify_get_attempts.tsv
```

Resultado:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/verify_result.txt
```

## Plano de rollback/inativação

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/ROLLBACK_INATIVACAO_CLIENTE_HOMOLOGACAO.md
```

## Logs

TypeScript:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/frontend_tsc.log
```

Build:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/frontend_build.log
```

Login response redigida:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/login_response_redacted.json
```

Login analysis:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947/login_analysis.txt
```

Diretório:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947
```

## Backup

```text
/opt/rh-saas/backups/superadmin_A4_E5_D_FIX1_teste_criacao_com_env_20260705_031947
```

## Regras

- POST real foi executado apenas se login/build/precondições estavam OK.
- Nenhum backend foi alterado.
- Nenhum banco foi alterado diretamente.
- Nenhuma migration foi executada.
- Nenhum container foi reiniciado.
- Senha e token não foram gravados no relatório.

## Próximo passo recomendado

Se o cliente foi criado, verificar visualmente em Clientes SaaS e decidir se será mantido como homologação ou inativado em fase controlada.
