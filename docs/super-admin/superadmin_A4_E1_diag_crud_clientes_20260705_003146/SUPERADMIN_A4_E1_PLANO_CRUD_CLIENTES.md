# SuperAdmin-A4-E1 — Plano para CRUD real de Clientes SaaS

Data: 20260705_003146

## Diagnóstico resumido

| Item | Status |
|---|---|
| Rota frontend Clientes | SIM |
| Rota frontend Novo Cliente | SIM |
| Página frontend Clientes | SIM |
| Service frontend Clientes/Tenants | SIM |
| Endpoint backend Tenant/Cliente | SIM |
| Endpoint backend criação | SIM |
| Endpoint backend atualização | SIM |
| Tabela tenant/clientes | SIM |
| Tabela empresas | NAO |
| Tabela planos | SIM |
| Tabela módulos/features | SIM |

## Objetivo do CRUD real

Implementar gerenciamento operacional de Clientes SaaS no Super Admin.

## Funcionalidades previstas

### Lista de clientes

- listar clientes/tenants;
- filtrar por status;
- pesquisar por nome;
- exibir plano vinculado, se disponível;
- exibir módulos ativos, se disponível.

### Novo cliente

- nome do cliente;
- identificador/slug;
- e-mail administrativo inicial;
- plano inicial;
- módulos habilitados;
- status ativo/inativo.

### Detalhes do cliente

- dados cadastrais;
- empresas/filiais vinculadas;
- usuários administrativos;
- plano;
- módulos;
- indicadores;
- auditoria.

### Ativar/Inativar

- alterar status do cliente;
- registrar auditoria;
- preservar histórico.

## Ordem recomendada

1. SuperAdmin-A4-E2 — Diagnóstico detalhado dos endpoints/tabelas de tenant com campos exatos.
2. SuperAdmin-A4-E3 — Implementar service frontend para Clientes SaaS.
3. SuperAdmin-A4-E4 — Implementar listagem real de Clientes SaaS.
4. SuperAdmin-A4-E5 — Implementar criação de Cliente SaaS.
5. SuperAdmin-A4-E6 — Implementar detalhes/edição/status.
