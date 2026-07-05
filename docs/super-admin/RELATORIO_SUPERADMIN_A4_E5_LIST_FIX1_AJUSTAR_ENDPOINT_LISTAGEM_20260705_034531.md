# SuperAdmin-A4-E5-LIST-FIX1 — Ajustar endpoint real da listagem de Clientes SaaS

Data: 20260705_034531

## Status

```text
ENDPOINT_LIST_CLIENTES_AJUSTADO_BUILD_OK
```

## Resumo

```text
TSC_STATUS=TSC_OK
BUILD_STATUS=BUILD_OK
HAS_LIST_ENDPOINT_REAL=SIM
FIRST_LIST_ENDPOINT=/v1/super-admin/clients
FIRST_LIST_ENDPOINT_OK=SIM
HAS_LIST_FUNCTION=SIM
HAS_CREATE_ENDPOINT_REAL=SIM
CONCLUSION=ENDPOINT_LIST_CLIENTES_AJUSTADO_BUILD_OK
```

## Arquivo alterado

```text
/opt/rh-saas/frontend-web/src/services/superAdminClientsService.ts
```

## Endpoint de listagem priorizado

```text
GET /v1/super-admin/clients
```

## Fallbacks mantidos

```text
/v1/super-admin/clientes
/v1/super-admin/tenants
/v1/tenants
/v1/clients
```

## Logs

Patch:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_LIST_FIX1_ajustar_endpoint_listagem_20260705_034531/patch.log
```

Service check:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_LIST_FIX1_ajustar_endpoint_listagem_20260705_034531/service_check.txt
```

TypeScript:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_LIST_FIX1_ajustar_endpoint_listagem_20260705_034531/frontend_tsc.log
```

Build:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_LIST_FIX1_ajustar_endpoint_listagem_20260705_034531/frontend_build.log
```

Diretório:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_LIST_FIX1_ajustar_endpoint_listagem_20260705_034531
```

## Backup

```text
/opt/rh-saas/backups/superadmin_A4_E5_LIST_FIX1_ajustar_endpoint_listagem_20260705_034531
```

## Regras

- Nenhum POST foi executado.
- Nenhum cliente foi criado.
- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhum container foi reiniciado.

## Próximo passo recomendado

Publicar/reiniciar frontend-web e validar visualmente a tela Clientes SaaS e o botão Atualizar.
