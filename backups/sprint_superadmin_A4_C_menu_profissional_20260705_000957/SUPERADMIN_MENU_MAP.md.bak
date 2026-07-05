# Super Admin — Mapa Oficial de Menu e Rotas

Data: 20260705_000814

## Objetivo

Definir a estrutura oficial do menu e das rotas do Super Admin para preparar a evolução profissional do painel SaaS, sem alterar código nesta fase.

## Base do diagnóstico

Relatório A4-A:

```text
/opt/rh-saas/docs/super-admin/RELATORIO_SUPERADMIN_A4_A_DIAG_ROTAS_PAGINAS_SERVICES_TABELAS_20260704_235939.md
```

Plano A4-A:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_A_diag_20260704_235939/SUPERADMIN_A4_A_PLANO_ESTRUTURA_PROFISSIONAL.md
```

Analysis A4-A:

```text
/opt/rh-saas/docs/super-admin/superadmin_A4_A_diag_20260704_235939/analysis.txt
```

## Diagnóstico resumido usado

| Item | Status |
|---|---|
| Rota Dashboard SaaS | SIM |
| Rota Clientes SaaS | SIM |
| Rota Planos SaaS | SIM |
| Rota Empresas/Filiais | NAO |
| Rota Módulos | NAO |
| Rota Usuários Admin | NAO |
| Rota Auditoria SaaS | NAO |
| Tabela tenant/clientes | SIM |
| Tabela planos | SIM |
| Tabela módulos/features | SIM |
| Tabela empresas/filiais | SIM |
| Tabela auditoria/logs | SIM |
| Backend tenant/clientes | SIM |
| Backend planos | SIM |
| Backend módulos/features | SIM |

---

# Menu Super Admin oficial proposto

## 1. Visão Geral

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Dashboard SaaS | /super-admin | Existente | Parcial/validar | Alta | Tela principal do Super Admin. |
| Dashboard de Clientes | /super-admin/clientes/dashboard | Placeholder futuro | Depende de métricas por tenant | Média | Indicadores por cliente SaaS. |

## 2. Clientes SaaS

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Clientes | /super-admin/clientes | Existente | Detectado/validar CRUD | Alta | Lista de clientes/tenants. |
| Novo Cliente | /super-admin/clientes/novo | Placeholder futuro | Depende de endpoint de criação | Alta | Cadastro de novo cliente SaaS. |
| Detalhes do Cliente | /super-admin/clientes/:id | Placeholder futuro | Depende de endpoint por ID | Alta | Visão completa do cliente. |
| Módulos do Cliente | /super-admin/clientes/:id/modulos | Placeholder futuro | Depende de módulos/features | Média | Ativar/desativar módulos por cliente. |
| Plano do Cliente | /super-admin/clientes/:id/plano | Placeholder futuro | Depende de planos | Média | Vincular plano ao cliente. |

## 3. Empresas e Filiais

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Empresas / Filiais | /super-admin/empresas | Ausente/placeholder | Tabelas detectadas | Alta | Gestão de matriz e filiais. |
| Nova Empresa | /super-admin/empresas/nova | Ausente/placeholder | Depende de endpoint | Alta | Cadastro de empresa matriz. |
| Nova Filial | /super-admin/filiais/nova | Ausente/placeholder | Depende de endpoint | Média | Cadastro de filial vinculada. |
| Endereços e CNPJ | /super-admin/empresas/:id/dados-fiscais | Futuro | Depende de modelo fiscal/endereço | Média | Dados cadastrais e endereço. |

## 4. Planos SaaS

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Planos | /super-admin/planos | Existente | Detectado/validar CRUD | Alta | Lista de planos. |
| Novo Plano | /super-admin/planos/novo | Placeholder futuro | Depende de endpoint de criação | Alta | Cadastro de plano detalhado. |
| Recursos dos Planos | /super-admin/planos/recursos | Placeholder futuro | Depende de módulos/features | Média | Definir recursos por plano. |
| Limites e Preços | /super-admin/planos/:id/limites | Futuro | Depende de modelo de cobrança | Média | Limites, valores e regras. |

## 5. Módulos SaaS

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Módulos | /super-admin/modulos | Ausente/placeholder | Backend detectado | Alta | Catálogo de módulos SaaS. |
| Módulos por Cliente | /super-admin/modulos/clientes | Ausente/placeholder | Depende de vínculo tenant/módulo | Alta | Habilitar módulos por cliente. |
| Feature Flags | /super-admin/feature-flags | Futuro | Depende de feature flags | Média | Controle granular por recurso. |

## 6. Usuários Administrativos

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Usuários Admin | /super-admin/usuarios | Ausente/placeholder | Users/roles existem | Alta | Gestão de SUPER_ADMIN, TENANT_ADMIN e RH_ADMIN. |
| Novo Usuário Admin | /super-admin/usuarios/novo | Ausente/placeholder | Depende de endpoint seguro | Alta | Cadastro de usuário administrativo. |
| Reset de Senha | /super-admin/usuarios/:id/reset-senha | Futuro | Depende de fluxo seguro | Média | Reset controlado e auditado. |
| Perfis e Permissões | /super-admin/perfis | Futuro | Depende de permissões | Média | Matriz de perfis e permissões. |

## 7. Auditoria SaaS

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Auditoria | /super-admin/auditoria | Ausente/placeholder | Tabela/logs detectados | Média | Visão geral de auditoria. |
| Logs Administrativos | /super-admin/auditoria/logs | Ausente/placeholder | Depende de endpoint de logs | Média | Logs filtráveis por usuário/cliente. |
| Eventos Críticos | /super-admin/auditoria/eventos-criticos | Futuro | Depende de classificação | Baixa | Segurança e eventos sensíveis. |

## 8. Configurações SaaS

| Item | Rota | Status | Backend | Prioridade | Observação |
|---|---|---|---|---|---|
| Configurações | /super-admin/configuracoes | Ausente/placeholder | Depende de backend | Média | Configurações gerais SaaS. |
| Parâmetros Globais | /super-admin/configuracoes/parametros | Futuro | Depende de parâmetros globais | Média | Limites e políticas globais. |
| Identidade Visual | /super-admin/configuracoes/identidade | Futuro | Depende de branding | Baixa | Marca padrão e recursos visuais. |
| Segurança | /super-admin/configuracoes/seguranca | Futuro | Depende de políticas | Média | Políticas de acesso e sessão. |

---

# Ordem de implementação recomendada

## Fase 1 — Estrutura e placeholders

1. SuperAdmin-A4-C — Atualizar menu Super Admin com estrutura profissional.
2. SuperAdmin-A4-D — Criar placeholders profissionais para rotas ausentes.
3. SuperAdmin-A4-D-VALIDATION — Publicar e validar navegação.

## Fase 2 — CRUDs prioritários

4. SuperAdmin-A4-E — CRUD real de Clientes SaaS.
5. SuperAdmin-A4-F — Empresas e Filiais.
6. SuperAdmin-A4-G — Planos detalhados.
7. SuperAdmin-A4-H — Módulos por Cliente.

## Fase 3 — Governança

8. SuperAdmin-A4-I — Usuários Administrativos.
9. SuperAdmin-A4-J — Auditoria SaaS.
10. SuperAdmin-A4-K — Configurações SaaS.

---

# Regras da evolução

- O menu do SUPER_ADMIN não deve mostrar operações internas de RH do tenant, como ponto, colaboradores ou live tracking operacional.
- O menu deve ser voltado para gestão SaaS global.
- Rotas sem backend completo devem iniciar como placeholders profissionais.
- CRUD real só deve ser implementado após diagnóstico de endpoints e tabelas.
- Toda fase deve atualizar documentação obrigatória.
