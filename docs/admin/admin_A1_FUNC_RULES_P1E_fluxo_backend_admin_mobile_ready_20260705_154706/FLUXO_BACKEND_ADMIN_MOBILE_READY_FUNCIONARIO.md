# Módulo Funcionário — Fluxo backend, admin web e mobile-ready

## Regra principal

O módulo Funcionário deverá funcionar com separação clara entre:

- backend como fonte oficial das regras;
- banco de dados como estrutura modular e auditável;
- app admin web como interface principal desta etapa;
- app mobile como consumidor futuro preparado por contratos e pendências.

Nesta etapa, não será implementado app mobile. O objetivo é deixar backend e banco preparados para o consumo futuro.

---

## 1. Fluxo de criação do funcionário no admin web

Fluxo previsto:

1. Usuário autorizado acessa o app admin web.
2. Acessa Funcionários > Novo funcionário.
3. Preenche cadastro mínimo operacional.
4. Admin web envia dados ao backend.
5. Backend valida campos obrigatórios.
6. Backend aplica tenantId pelo contexto autenticado.
7. Backend cria registro em employees.
8. Backend registra auditoria.
9. Backend retorna o funcionário criado.
10. Admin web redireciona para detalhes/complementação da ficha.

Cadastro mínimo operacional atual:

- firstName;
- lastName;
- cpf;
- email;
- department;
- jobTitle;
- admissionDate.

Endpoint atual mapeado:

- POST /v1/employees.

---

## 2. Fluxo de listagem no admin web

Fluxo previsto:

1. Usuário autorizado acessa Funcionários.
2. Admin web chama backend.
3. Backend filtra por tenantId do usuário autenticado.
4. Backend retorna lista de funcionários.
5. Admin web exibe status, dados básicos e pendências.

Endpoint atual mapeado:

- GET /v1/employees.

---

## 3. Fluxo de detalhes do funcionário

Fluxo previsto:

1. Usuário autorizado abre detalhes do funcionário.
2. Admin web chama backend por ID.
3. Backend valida tenantId e permissão.
4. Backend retorna dados do funcionário e vínculos principais.
5. Admin web exibe abas/seções da ficha.

Endpoint atual mapeado:

- GET /v1/employees/:id.

---

## 4. Fluxo de complemento da ficha

A ficha do funcionário deverá ser complementada por etapas.

Etapas previstas:

- dados pessoais;
- endereço;
- contrato;
- jornada e ponto;
- documentos;
- dependentes;
- benefícios;
- financeiro e bancário;
- saúde e segurança;
- usuário vinculado.

Regras:

- cada etapa poderá ter salvamento próprio;
- o backend deverá validar regras por etapa;
- o admin web deverá exibir checklist de completude;
- dados sensíveis deverão exigir permissão específica.

---

## 5. Fluxo de vínculo com usuário

Fluxo previsto:

1. Funcionário é criado.
2. Usuário pode ser criado ou selecionado separadamente.
3. RH vincula usuário ao funcionário.
4. Backend valida tenantId, employeeId e userId.
5. Backend registra vínculo.
6. Backend registra auditoria.
7. Admin web passa a mostrar usuário vinculado.

Endpoints atuais mapeados:

- PUT /v1/employees/:id/link-user;
- DELETE /v1/employees/:id/link-user.

Regra:

- funcionário pode existir sem usuário;
- usuário vinculado prepara acesso futuro ao portal/app mobile.

---

## 6. Fluxo de documentos no admin web

Fluxo previsto:

1. RH abre Funcionário > Documentos.
2. Admin web lista documentos exigidos e enviados.
3. RH seleciona tipo de documento.
4. RH envia arquivo.
5. Backend valida tipo, tamanho e permissão.
6. Backend salva arquivo em storage privado.
7. Backend salva metadados do documento.
8. Backend define status inicial.
9. Backend registra auditoria.
10. Admin web exibe documento e status.

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

## 7. Fluxo de aprovação e rejeição de documentos

Aprovação:

1. RH acessa documento em UNDER_REVIEW.
2. RH aprova.
3. Backend altera status para APPROVED.
4. Backend substitui versão anterior, se houver.
5. Backend registra auditoria.
6. Backend resolve pendência relacionada.

Rejeição:

1. RH acessa documento em UNDER_REVIEW.
2. RH informa motivo de rejeição.
3. Backend altera status para REJECTED.
4. Backend registra rejectionReason.
5. Backend cria pendência para novo envio.
6. Futuramente o app mobile exibirá a pendência ao funcionário.

---

## 8. Fluxo de vencimento de documentos

Fluxo previsto:

1. Rotina futura verifica documentos com expirationDate.
2. Backend identifica documentos vencidos ou a vencer.
3. Backend atualiza status ou cria pendências.
4. Backend registra auditoria quando aplicável.
5. Admin web exibe documentos vencidos/a vencer.
6. App mobile futuro exibirá alerta ao funcionário.

Janelas sugeridas:

- a vencer: 30 dias;
- crítico: 7 dias;
- vencido: data menor que hoje.

---

## 9. Fluxo de pendências

Pendências deverão ser criadas no backend e armazenadas no banco.

Tipos previstos:

- COMPLETE_PROFILE;
- COMPLETE_ADDRESS;
- UPLOAD_DOCUMENT;
- DOCUMENT_EXPIRED;
- DOCUMENT_EXPIRING_SOON;
- DOCUMENT_REJECTED;
- DOCUMENT_PENDING_REVIEW;
- CONFIGURE_SCHEDULE;
- LINK_USER;
- REVIEW_REQUIRED.

Uso no admin web:

- exibir pendências na ficha do funcionário;
- filtrar funcionários com pendências;
- apoiar checklist de ativação.

Uso futuro no app mobile:

- exibir Minhas pendências;
- permitir ação do funcionário quando aplicável.

---

## 10. Fluxo mobile-ready

O app mobile será consumidor futuro dos endpoints `/v1/me/*`.

Regra principal:

- employeeId deve ser inferido pelo usuário autenticado;
- tenantId deve ser inferido pelo contexto autenticado;
- o app mobile não deve enviar employeeId arbitrário para acessar dados próprios.

Endpoints futuros previstos:

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

---

## 11. Fluxo de auditoria

Eventos que deverão gerar auditoria:

- funcionário criado;
- funcionário atualizado;
- funcionário ativado;
- funcionário inativado;
- documento enviado;
- documento aprovado;
- documento rejeitado;
- documento substituído;
- documento vencido;
- usuário vinculado;
- usuário desvinculado;
- dado sensível visualizado;
- dado financeiro visualizado;
- pendência criada;
- pendência resolvida.

---

## 12. Fluxo de permissões

O backend deverá aplicar permissões por perfil.

Áreas restritas:

- financeiro;
- bancário;
- saúde e segurança;
- documentos sensíveis;
- auditoria.

Perfis futuros sugeridos:

- SUPER_ADMIN;
- TENANT_ADMIN;
- RH_ADMIN;
- MANAGER;
- EMPLOYEE;
- SST_ADMIN;
- FINANCE_ADMIN.

---

## 13. Fluxo de ativação do funcionário

O funcionário só deverá ficar ativo quando regras mínimas forem atendidas.

Checklist futuro:

- cadastro mínimo preenchido;
- CPF válido;
- e-mail informado;
- departamento definido;
- cargo/função definidos;
- data de admissão preenchida;
- contrato completo, quando exigido;
- endereço completo, quando exigido;
- documentos obrigatórios aprovados, quando exigido;
- jornada configurada, quando módulo ponto estiver ativo;
- usuário vinculado, quando acesso ao app/portal for necessário.

---

## 14. Ordem futura de implementação

A implementação deverá seguir fases pequenas:

1. auditar sistema atual;
2. validar banco atual;
3. propor migrations;
4. criar modelo de documentos;
5. criar backend de documentos;
6. criar admin web de documentos;
7. criar pendências;
8. criar rotina de vencimento;
9. preparar endpoints mobile;
10. validar fluxo completo.

---

## Fora de escopo nesta parte

Esta parte não implementa:

- backend;
- frontend;
- banco;
- migrations;
- upload real;
- endpoints reais;
- app mobile;
- notificações reais.

Esta parte registra apenas o fluxo operacional backend/admin/mobile-ready.
