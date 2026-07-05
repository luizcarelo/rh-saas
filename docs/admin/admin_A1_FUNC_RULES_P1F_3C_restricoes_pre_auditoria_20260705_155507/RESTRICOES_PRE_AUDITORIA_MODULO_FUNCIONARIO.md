# Restrições pré-auditoria — Módulo Funcionário

## Regra principal

Antes da execução da fase:

Admin-A1-FUNC-AUDIT-P1

não deverão ser realizadas alterações funcionais no sistema.

## Restrições

Não criar:

- tabelas;
- migrations;
- entities;
- DTOs;
- services;
- controllers;
- endpoints novos.

Não alterar:

- backend;
- frontend;
- banco de dados;
- autenticação;
- permissões;
- storage.

Não implementar:

- upload real de documentos;
- validação operacional;
- notificações;
- app mobile;
- integração externa.

Não criar:

- funcionário de teste;
- dados fictícios;
- registros de homologação.

## Objetivo

Primeiro auditar.

Depois comparar:

- regra técnica definida;
- sistema atual existente;
- banco atual;
- app admin atual;
- módulo documents;
- módulo users;
- storage;
- preparação mobile.

Somente após a auditoria será permitida proposta de implementação.
