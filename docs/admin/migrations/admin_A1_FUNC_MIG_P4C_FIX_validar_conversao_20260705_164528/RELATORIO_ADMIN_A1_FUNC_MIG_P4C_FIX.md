# Admin-A1-FUNC-MIG-P4C-FIX — Validar conversão na migration 002

Data: 20260705_164528

## Status

```text
ADMIN_A1_FUNC_MIG_P4C_FIX_CONVERSAO_NAO_ENCONTRADA
```

## Análise

```text
MIG_002=/opt/rh-saas/docs/admin/migrations/admin_A1_FUNC_MIG_P4_20260705_162551/002-UpgradeDocuments.ts
HAS_CONVERT_TENANT=NAO
HAS_CONVERT_EMPLOYEE=NAO
CONCLUSION=ADMIN_A1_FUNC_MIG_P4C_FIX_CONVERSAO_NAO_ENCONTRADA
```

## Trechos relevantes encontrados

```text
20:      - tenant_id   varchar
21:      - employee_id varchar
29: *    ALTER TABLE documents
30:      AL*ER COLUMN tenant_id TYPE uuid
31:    * USING NULLIF(tenant_id, '')::uuid*    `);
34:      ALTER TABLE documents
35:  *   ALTER COLUMN employee_id TYPE u*id
36:      USING NULLIF(employee_id,*'')::uuid
154:        columnNames: ['employee_id'],
190:        columnNames: ['tenant_id'],
198:        columnNames: ['employee_id'],
284:      ALTER TABLE documents
312:      ALTER TABLE documents
313:      ALTER COLUMN employee_id TYPE varchar
314:      USING employee_id::text
318:      ALTER TABLE documents
319:      ALTER COLUMN tenant_id TYPE varchar
320:      USING tenant_id::text
```

## Regras

- Nenhuma migration foi executada.
- Nenhum banco foi alterado.
- Nenhum SQL foi executado.
- Nenhum backend foi alterado.
- Nenhum frontend foi alterado.
