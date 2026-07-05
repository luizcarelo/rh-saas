# Sprint SuperAdmin-A2-B-FIX-HASH - Reset senha Super Admin usando bcrypt

Data: 20260704_233215

## Status

```text
RESET_SENHA_SUPER_ADMIN_OK_LOGIN_VALIDADO
```

## Usuario

```text
superadmin@rh-saas.local
```

## Resumo

```text
SUPER_EMAIL=superadmin@rh-saas.local
HASH_SOURCE=BACKEND_NODE
LOGIN_STATUS=200
EMAIL=superadmin@rh-saas.local
ROLE=SUPER_ADMIN
TENANT_ID=11446a8f-ed2c-468e-9be1-3409beb12d3c
HAS_TOKEN=True
CONCLUSION=RESET_SENHA_SUPER_ADMIN_OK_LOGIN_VALIDADO
```

## Evidencias

Usuario antes:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215/user_before_redacted.txt
```

Usuario depois:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215/user_after_redacted.txt
```

Metadata hash antes:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215/hash_metadata_before.txt
```

Metadata hash depois:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215/hash_metadata_after.txt
```

Resultado do update:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215/update_result.txt
```

Login response redigida:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215/login_response_redacted.json
```

Login analysis:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215/login_analysis.txt
```

Backup SQL da tabela public.users:

```text
/opt/rh-saas/backups/sprint_superadmin_A2_B_fix_hash_bcrypt_20260704_233215/public_users_before_bcrypt_reset_20260704_233215.sql
```

Diretorio:

```text
/opt/rh-saas/docs/super-admin/superadmin_A2_B_fix_hash_bcrypt_20260704_233215
```

## Backup documental

```text
/opt/rh-saas/backups/sprint_superadmin_A2_B_fix_hash_bcrypt_20260704_233215
```

## Regras

- Nenhum codigo frontend foi alterado.
- Nenhum codigo backend foi alterado.
- Nenhum mobile-app foi alterado.
- Nenhuma migration foi executada.
- Nenhum usuario foi criado.
- Role nao foi alterada.
- tenant_id nao foi alterado.
- Somente passwordHash, isActive e updated_at do usuario SUPER_ADMIN alvo foram alterados.
- Senha nao foi salva em relatorio.
- Hash completo nao foi salvo em relatorio.

## Proximo passo recomendado

Acessar o frontend-web com o usuario Super Admin e validar a rota/tela Super Admin.
