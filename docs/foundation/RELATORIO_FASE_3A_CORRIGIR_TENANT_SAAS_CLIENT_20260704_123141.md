# Sprint 4.6B-R - Fase 3A

Data: 20260704_123141

## Objetivo

Corrigir o vínculo entre `tenants` e `saas_clients` para permitir que os endpoints Foundation localizem o `client_id` a partir do `tenantId` do JWT.

## Status

TENANT_ID_ATUALIZADO

## Usuário base

```text
admin@empresa.com
```

## Tenant do usuário

```text
11446a8f-ed2c-468e-9be1-3409beb12d3c
```

## SaaS Client

```text
53df5639-7222-4336-ad36-9163ee3ffb12
```

## Tenant anterior do SaaS Client

```text
54860ba6-a97b-409b-95c2-eed488a724df
```

## Tenant atual do SaaS Client

```text
11446a8f-ed2c-468e-9be1-3409beb12d3c
```

## Backup

```text
/opt/rh-saas/backups/sprint_4_6B_R_fase3A_tenant_saas_client_20260704_123141
```

## Rollback

```text
/opt/rh-saas/backups/sprint_4_6B_R_fase3A_tenant_saas_client_20260704_123141/rollback_fase3A_tenant_saas_client.sql
```

## Validação depois da correção

```text
          email           |            user_tenant_id            |     corporate_name     |            saas_client_id            |    saas_trade_name    |        saas_client_tenant_id         | status_vinculo 
--------------------------+--------------------------------------+------------------------+--------------------------------------+-----------------------+--------------------------------------+----------------
 admin@empresa.com        | 11446a8f-ed2c-468e-9be1-3409beb12d3c | Empresa Administradora | 53df5639-7222-4336-ad36-9163ee3ffb12 | Empresa Teste RH SaaS | 11446a8f-ed2c-468e-9be1-3409beb12d3c | OK
 superadmin@rh-saas.local | 11446a8f-ed2c-468e-9be1-3409beb12d3c | Empresa Administradora | 53df5639-7222-4336-ad36-9163ee3ffb12 | Empresa Teste RH SaaS | 11446a8f-ed2c-468e-9be1-3409beb12d3c | OK
(2 rows)
```

## Observações

- Nenhuma tabela foi criada.
- Nenhum registro foi apagado.
- Apenas o campo `saas_clients.tenant_id` foi ajustado, se necessário.
- Próximo passo: reexecutar Fase 3 de validação dos endpoints Foundation.
