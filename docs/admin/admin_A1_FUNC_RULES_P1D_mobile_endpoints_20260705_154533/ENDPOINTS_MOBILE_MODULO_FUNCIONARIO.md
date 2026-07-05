# Módulo Funcionário — Endpoints mobile futuros

## Regra principal

O app mobile não será implementado nesta etapa.

Mesmo assim, o backend e o banco deverão ser preparados para expor endpoints futuros do tipo `/v1/me/*`, permitindo que o funcionário autenticado acesse seus próprios dados, documentos, pendências e notificações.

Estes endpoints são contrato técnico futuro e não representam implementação imediata nesta fase.

---

## 1. Perfil do funcionário

### GET /v1/me/profile

Finalidade:

- retornar dados básicos do funcionário autenticado;
- retornar vínculo com usuário;
- retornar status do funcionário;
- retornar informações seguras para exibição no app mobile.

Resposta futura sugerida:

- employeeId;
- userId;
- firstName;
- lastName;
- email;
- department;
- jobTitle;
- admissionDate;
- status;
- profileCompletionPercent.

---

## 2. Resumo mobile

### GET /v1/me/summary

Finalidade:

- retornar resumo operacional para tela inicial do app;
- consolidar pendências, documentos e status geral.

Resposta futura sugerida:

- profileStatus;
- pendingActionsCount;
- expiredDocumentsCount;
- expiringDocumentsCount;
- rejectedDocumentsCount;
- unreadNotificationsCount.

---

## 3. Pendências do funcionário

### GET /v1/me/pending-actions

Finalidade:

- listar pendências operacionais do funcionário autenticado;
- exibir pendências que exigem ação do funcionário ou acompanhamento.

Tipos futuros sugeridos:

- COMPLETE_PROFILE;
- COMPLETE_ADDRESS;
- UPLOAD_DOCUMENT;
- DOCUMENT_EXPIRED;
- DOCUMENT_EXPIRING_SOON;
- DOCUMENT_REJECTED;
- DOCUMENT_PENDING_REVIEW;
- LINK_USER;
- REVIEW_REQUIRED.

---

## 4. Documentos do funcionário

### GET /v1/me/documents

Finalidade:

- listar documentos do funcionário autenticado;
- mostrar status, validade e necessidade de nova versão.

Dados futuros sugeridos:

- documentId;
- documentTypeId;
- documentTypeName;
- status;
- issueDate;
- expirationDate;
- expiresInDays;
- canUploadNewVersion;
- rejectionReason;
- latestVersion.

---

## 5. Detalhe de documento

### GET /v1/me/documents/:documentId

Finalidade:

- consultar detalhe de um documento do próprio funcionário;
- permitir visualizar metadados e status.

Regras:

- funcionário só pode acessar documentos próprios;
- documentos sensíveis podem exigir regra especial;
- arquivo deve usar URL temporária, nunca URL pública permanente.

---

## 6. Upload de documento pelo funcionário

### POST /v1/me/documents/:documentTypeId/upload

Finalidade:

- permitir upload futuro pelo app mobile;
- permitir envio de nova versão válida;
- criar documento em UNDER_REVIEW quando exigir aprovação.

Regras futuras:

- aceitar inicialmente PDF, JPG e PNG;
- validar tamanho máximo;
- registrar uploadedByUserId;
- registrar version;
- gerar auditoria;
- gerar pendência de revisão para o RH;
- substituir versão anterior somente após aprovação.

---

## 7. Pendências documentais

### GET /v1/me/document-pendencies

Finalidade:

- listar pendências específicas de documentos.

Pendências futuras:

- documento obrigatório não enviado;
- documento vencido;
- documento a vencer;
- documento rejeitado;
- documento aguardando aprovação.

---

## 8. Notificações mobile

### GET /v1/me/notifications

Finalidade:

- listar notificações do funcionário autenticado.

Tipos futuros:

- DOCUMENT_EXPIRED;
- DOCUMENT_EXPIRING_SOON;
- DOCUMENT_REJECTED;
- DOCUMENT_APPROVED;
- PROFILE_INCOMPLETE;
- PENDING_ACTION_CREATED.

---

## 9. Marcar notificação como lida

### PUT /v1/me/notifications/:notificationId/read

Finalidade:

- marcar notificação como lida pelo funcionário.

Regras:

- funcionário só pode marcar notificações próprias;
- registrar readAt.

---

## 10. Configurações de jornada para mobile

### GET /v1/me/work-settings

Finalidade:

- retornar configurações de jornada, escala e ponto aplicáveis ao funcionário.

Uso futuro:

- app mobile de ponto;
- exibição de jornada;
- validação de geofence;
- live tracking.

---

## 11. Regras de segurança dos endpoints mobile

Regras obrigatórias futuras:

- autenticação obrigatória;
- escopo sempre limitado ao próprio funcionário;
- nunca aceitar employeeId arbitrário nos endpoints `/v1/me/*`;
- usar employeeId inferido pelo token/vínculo usuário-funcionário;
- aplicar tenantId inferido pelo contexto autenticado;
- auditar visualização e upload de documentos;
- proteger documentos por URL temporária;
- validar permissões para documentos sensíveis;
- não expor dados financeiros ou saúde sem regra específica.

---

## 12. Relação com banco de dados

Os endpoints mobile deverão consumir principalmente:

- employees;
- employee_documents;
- employee_document_types;
- employee_pending_actions;
- employee_notifications;
- employee_user_links;
- employee_work_settings.

---

## 13. Fora de escopo nesta parte

Esta parte não implementa:

- controllers;
- services;
- DTOs;
- guards;
- upload real;
- push notification real;
- app mobile;
- migrations;
- alterações no banco.

Esta parte registra apenas o contrato futuro dos endpoints mobile do módulo Funcionário.
