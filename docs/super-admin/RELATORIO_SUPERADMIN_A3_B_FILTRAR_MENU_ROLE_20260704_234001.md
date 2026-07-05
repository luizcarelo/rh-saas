# Sprint SuperAdmin-A3-B - Filtrar menu por role SUPER_ADMIN

Data: 20260704_234001

## Status

```text
MENU_SUPER_ADMIN_FILTRADO_COM_BUILD_OK
```

## Resumo

```text
TSC_STATUS=TSC_OK
BUILD_STATUS=BUILD_OK
HAS_FILTER=SIM
HAS_SUPER_MENU=SIM
HAS_SPREAD_MENU_FOR_SUPER=NAO
CONCLUSION=MENU_SUPER_ADMIN_FILTRADO_COM_BUILD_OK
```

## Arquivo alterado

```text
/opt/rh-saas/frontend-web/src/layouts/AdminLayout.tsx
```

## Comportamento implementado

- Se role for `SUPER_ADMIN`, exibir somente:
  - Dashboard SaaS
  - Clientes SaaS
  - Planos SaaS
- Se role nao for `SUPER_ADMIN`, manter menu operacional atual.

## Logs

Patch log:

```text
/opt/rh-saas/docs/super-admin/superadmin_A3_B_filtrar_menu_role_20260704_234001/patch_adminlayout.log
```

TypeScript log:

```text
/opt/rh-saas/docs/super-admin/superadmin_A3_B_filtrar_menu_role_20260704_234001/frontend_tsc.log
```

Build log:

```text
/opt/rh-saas/docs/super-admin/superadmin_A3_B_filtrar_menu_role_20260704_234001/frontend_build.log
```

Diretorio:

```text
/opt/rh-saas/docs/super-admin/superadmin_A3_B_filtrar_menu_role_20260704_234001
```

## Backup

```text
/opt/rh-saas/backups/sprint_superadmin_A3_B_filtrar_menu_role_20260704_234001
```

## Regras

- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhum usuario/senha foi alterado.
- Nenhum container foi recriado.
- Nenhuma migration foi executada.
- Apenas AdminLayout.tsx foi alterado no frontend-web.

## Proximo passo recomendado

Publicar/reiniciar frontend se necessario e validar visualmente o menu com SUPER_ADMIN e ADMIN.
