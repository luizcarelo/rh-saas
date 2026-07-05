# SuperAdmin-A4-E5-B-FIX1B — Ajustar CLIENT_CREATE_ENDPOINT_CANDIDATES

Data: 20260705_031416

## Status

```text
ENDPOINT_CREATE_CLIENT_AJUSTADO_BUILD_OK
```

## Resumo

```text
TSC_STATUS=TSC_OK
BUILD_STATUS=BUILD_OK
HAS_ENDPOINT_REAL=SIM
FIRST_ENDPOINT=/v1/super-admin/clients
FIRST_ENDPOINT_OK=SIM
HAS_CREATE=SIM
HAS_EXPORT_CREATE=SIM
CONCLUSION=ENDPOINT_CREATE_CLIENT_AJUSTADO_BUILD_OK
```

## Arquivo alterado

```text
/opt/rh-saas/frontend-web/src/services/superAdminClientsService.ts
```

## Endpoint priorizado

```text
POST /v1/super-admin/clients
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
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_B_FIX1B_ajustar_endpoint_create_20260705_031416/patch.log
```

Service check:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_B_FIX1B_ajustar_endpoint_create_20260705_031416/service_check.txt
```

TypeScript:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_B_FIX1B_ajustar_endpoint_create_20260705_031416/frontend_tsc.log
```

Build:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_B_FIX1B_ajustar_endpoint_create_20260705_031416/frontend_build.log
```

Diretório:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_E5_B_FIX1B_ajustar_endpoint_create_20260705_031416
```

## Backup

```text
/opt/rh-saas/backups/superadmin_A4_E5_B_FIX1B_ajustar_endpoint_create_20260705_031416
```

## Regras

- Nenhum POST foi executado.
- Nenhum cliente foi criado.
- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhum container foi reiniciado.

## Próximo passo recomendado

Repetir SuperAdmin-A4-E5-D — Teste controlado de criação com cliente de homologação.
