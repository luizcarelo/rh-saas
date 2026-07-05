# Resumo consolidado — Regra técnica do módulo Funcionário

## 1. Escopo oficial

O módulo Funcionário será o núcleo operacional do RH SaaS.

Nesta etapa, o trabalho de implementação deverá ficar restrito a:

- backend;
- app admin web;
- banco de dados.

O app mobile não será implementado agora, mas backend e banco deverão ficar preparados para consumo futuro.

---

## 2. Cadastro progressivo

O cadastro do funcionário deverá ser progressivo e modular.

O funcionário poderá nascer com cadastro mínimo operacional e ter sua ficha complementada por etapas.

Cadastro mínimo atual:

- firstName;
- lastName;
- cpf;
- email;
- department;
- jobTitle;
- admissionDate.

Status sugeridos:

- DRAFT;
- PENDING_COMPLETION;
- ACTIVE;
- INACTIVE;
- TERMINATED.

---

## 3. Módulos funcionais da ficha

A ficha do funcionário deverá ser organizada em módulos funcionais:

- resumo;
- dados pessoais;
- endereço;
- contrato;
- jornada e ponto;
- documentos;
- dependentes;
- benefícios;
- financeiro e bancário;
- saúde e segurança;
- usuário vinculado;
- auditoria;
- pendências e notificações.

---

## 4. Responsabilidades por camada

Backend:

- fonte oficial de regras;
- validações;
- permissões;
- auditoria;
- documentos;
- pendências;
- preparação mobile.

Banco de dados:

- estrutura modular;
- tenantId nas estruturas aplicáveis;
- histórico;
- documentos;
- pendências;
- notificações;
- preparação mobile.

App admin web:

- interface principal nesta etapa;
- listagem;
- pré-cadastro;
- detalhes;
- abas/seções;
- documentos;
- pendências;
- vínculo com usuário;
- auditoria.

App mobile futuro:

- perfil;
- documentos;
- pendências;
- upload futuro;
- notificações futuras.

---

## 5. Modelo de dados conceitual

Estruturas conceituais principais:

- employees;
- employee_personal_data;
- employee_addresses;
- employee_contracts;
- employee_work_settings;
- employee_document_types;
- employee_documents;
- employee_dependents;
- employee_benefits;
- employee_bank_accounts;
- employee_salary_history;
- employee_health_records;
- employee_user_links;
- employee_audit_logs;
- employee_pending_actions;
- employee_notifications.

---

## 6. Documentos do funcionário

O módulo Funcionário deverá possuir sistema próprio de documentos.

Recursos previstos:

- tipos configuráveis;
- upload;
- validade;
- versionamento;
- aprovação;
- rejeição;
- pendências;
- avisos;
- auditoria;
- permissões.

Status previstos:

- PENDING;
- UPLOADED;
- UNDER_REVIEW;
- APPROVED;
- REJECTED;
- EXPIRED;
- REPLACED;
- CANCELED.

---

## 7. Endpoints mobile futuros

Contrato futuro `/v1/me/*`:

- GET /v1/me/profile;
- GET /v1/me/summary;
- GET /v1/me/pending-actions;
- GET /v1/me/documents;
- GET /v1/me/documents/:documentId;
- POST /v1/me/documents/:documentTypeId/upload;
- GET /v1/me/document-pendencies;
- GET /v1/me/notifications;
- PUT /v1/me/notifications/:notificationId/read;
- GET /v1/me/work-settings.

Regra principal:

- employeeId deve ser inferido pelo usuário autenticado;
- tenantId deve ser inferido pelo contexto autenticado;
- o app mobile não deve enviar employeeId arbitrário para acessar dados próprios.

---

## 8. Fluxo operacional

Fluxos registrados:

- criação do funcionário;
- listagem;
- detalhes;
- complemento da ficha;
- vínculo com usuário;
- documentos;
- aprovação/rejeição;
- vencimento;
- pendências;
- mobile-ready;
- auditoria;
- permissões;
- ativação do funcionário;
- ordem futura de implementação.

---

## 9. Regra de implementação futura

Antes de qualquer implementação real, deverá ser feita auditoria completa do sistema atual.

A implementação deverá ocorrer em fases pequenas e documentadas, priorizando:

1. auditoria completa;
2. banco/migrations;
3. backend;
4. app admin web;
5. documentos;
6. pendências;
7. preparação mobile;
8. validações controladas.
