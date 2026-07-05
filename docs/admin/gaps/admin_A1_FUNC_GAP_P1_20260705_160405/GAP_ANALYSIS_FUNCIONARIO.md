# GAP Analysis — Módulo Funcionário

## Situação Atual

### Existe

✅ employees

✅ users

✅ vínculo funcionário ⇄ usuário

✅ auditoria básica

✅ tenantId

✅ CRUD básico de funcionários

✅ documentos simplificados

---

## Não existe

❌ dados pessoais avançados

❌ endereço

❌ contrato estruturado

❌ jornada

❌ dependentes

❌ benefícios

❌ financeiro

❌ saúde e segurança

❌ pendências

❌ notificações

❌ status operacional

❌ mobile-ready

❌ documentos corporativos completos

---

# GAP 1 — Status do Funcionário

Atual:

- isActive

Planejado:

- DRAFT
- PENDING_COMPLETION
- ACTIVE
- INACTIVE
- TERMINATED

Prioridade: ALTA

---

# GAP 2 — Estrutura modular da ficha

Atual:

- employees

Planejado:

- employee_personal_data
- employee_addresses
- employee_contracts
- employee_work_settings

Prioridade: ALTA

---

# GAP 3 — Documentos corporativos

Atual:

- filename
- path
- isSigned

Planejado:

- tipo
- validade
- versionamento
- aprovação
- rejeição
- vencimento
- pendências

Prioridade: MUITO ALTA

---

# GAP 4 — Tipos de documento

Atual:

- inexistente

Planejado:

- employee_document_types

Prioridade: MUITO ALTA

---

# GAP 5 — Pendências

Atual:

- inexistente

Planejado:

- employee_pending_actions

Prioridade: MUITO ALTA

---

# GAP 6 — Notificações

Atual:

- inexistente

Planejado:

- employee_notifications

Prioridade: MÉDIA

---

# GAP 7 — Mobile Ready

Atual:

- inexistente

Planejado:

- /v1/me/profile
- /v1/me/documents
- /v1/me/pending-actions
- /v1/me/document-pendencies

Prioridade: MÉDIA

---

# Conclusão

A fundação do módulo Funcionário já existe.

O maior GAP identificado está na camada:

1. documentos
2. pendências
3. estrutura modular da ficha
4. status operacional
5. mobile ready

Nenhuma implementação deve ocorrer antes da definição do roadmap.
