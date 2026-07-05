# Auditoria obrigatória — Módulo Funcionário

## Regra principal

Antes de qualquer implementação do módulo Funcionário deverá ser executada uma auditoria completa do sistema atual.

Nome oficial da fase:

Admin-A1-FUNC-AUDIT-P1 — Verificar sistema completo do módulo Funcionário

---

## Objetivo

Comparar:

- regra técnica documentada;
- sistema atualmente implementado;
- banco de dados atual;
- backend atual;
- app admin web atual;
- infraestrutura relacionada.

Identificar:

- aderências;
- divergências;
- gaps;
- riscos;
- necessidades de evolução.

---

## Escopo obrigatório de auditoria

### Backend

Verificar:

- módulos;
- entities;
- DTOs;
- services;
- controllers;
- guards;
- interceptors;
- validações;
- contratos de API.

### Banco de dados

Verificar:

- tabelas existentes;
- relacionamentos;
- índices;
- chaves;
- constraints;
- migrations existentes.

### Funcionários

Verificar:

- cadastro atual;
- campos atuais;
- status atuais;
- endpoints existentes;
- vínculo com usuários.

### Documentos

Verificar:

- módulo documents;
- storage;
- upload existente;
- metadados;
- versionamento;
- permissões.

### Usuários

Verificar:

- módulo users;
- autenticação;
- autorização;
- employee_user_links;
- preparação mobile.

### App admin web

Verificar:

- telas existentes;
- rotas;
- páginas;
- components;
- services;
- integração com APIs.

---

## Resultado esperado

Ao final da auditoria deverá existir:

- mapeamento completo do estado atual;
- relatório de aderência;
- relatório de gaps;
- proposta de evolução;
- plano de implementação por fases.

---

## Regra de implementação

Nenhuma implementação deverá ocorrer antes da conclusão da auditoria.
