# Módulo Funcionário — Regra de documentos, upload, validade e avisos

## Regra principal

O módulo Funcionário deverá possuir um sistema próprio para gestão de documentos do colaborador.

Esse sistema deverá permitir:

- cadastro de tipos de documentos;
- upload de arquivos;
- versionamento;
- controle de validade;
- aprovação e rejeição pelo RH;
- histórico de substituição;
- pendências;
- avisos para o app mobile futuro;
- auditoria;
- permissões por perfil.

Nesta etapa, a regra será registrada na ficha técnica. Nenhuma tabela, endpoint, tela ou migration será criada nesta parte.

---

## 1. Tipos de documentos previstos

O sistema deverá permitir configurar tipos de documentos por tenant.

Tipos iniciais recomendados:

- RG;
- CPF;
- CNH;
- certidão de nascimento;
- certidão de casamento;
- comprovante de residência;
- Carteira de Trabalho Digital;
- PIS/PASEP;
- título de eleitor;
- certificado militar;
- comprovante de escolaridade;
- certificados profissionais;
- contrato de trabalho;
- ASO admissional;
- ASO periódico;
- ASO demissional;
- exames ocupacionais;
- termos assinados;
- outros documentos.

---

## 2. Configuração do tipo de documento

Cada tipo de documento deverá possuir configurações próprias.

Campos conceituais:

- id;
- tenantId;
- code;
- name;
- description;
- category;
- isRequired;
- requiresExpirationDate;
- defaultValidityMonths;
- allowMultipleVersions;
- requiresApproval;
- employeeCanUpload;
- mobileVisible;
- blocksAdmission;
- blocksAppAccess;
- isSensitive;
- isActive;
- createdAt;
- updatedAt.

---

## 3. Categorias de documentos

Categorias sugeridas:

- identificação;
- endereço;
- contratação;
- escolaridade;
- benefícios;
- saúde e segurança;
- certificações;
- termos;
- outros.

---

## 4. Status do documento

Status sugeridos para documentos do funcionário:

- PENDING;
- UPLOADED;
- UNDER_REVIEW;
- APPROVED;
- REJECTED;
- EXPIRED;
- REPLACED;
- CANCELED.

Regra geral:

- PENDING: documento exigido, mas ainda não enviado.
- UPLOADED: arquivo enviado, aguardando regra interna.
- UNDER_REVIEW: documento enviado e aguardando aprovação do RH.
- APPROVED: documento aprovado.
- REJECTED: documento rejeitado, exigindo novo envio.
- EXPIRED: documento vencido.
- REPLACED: documento substituído por versão mais nova.
- CANCELED: documento cancelado administrativamente.

---

## 5. Dados do documento enviado

Cada documento enviado deverá guardar metadados e não apenas o arquivo.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- documentTypeId;
- fileId;
- storageKey;
- originalFileName;
- mimeType;
- fileSize;
- documentNumber;
- issueDate;
- expirationDate;
- status;
- version;
- uploadedByUserId;
- approvedByUserId;
- approvedAt;
- rejectedByUserId;
- rejectedAt;
- rejectionReason;
- replacedByDocumentId;
- createdAt;
- updatedAt.

---

## 6. Upload pelo app admin web

O app admin web deverá permitir que o RH envie documentos em nome do funcionário.

Fluxo:

- RH acessa Funcionário > Documentos.
- Seleciona o tipo de documento.
- Envia arquivo.
- Informa número, data de emissão e validade, quando aplicável.
- O documento entra em APPROVED ou UNDER_REVIEW conforme regra do tipo.
- O sistema registra auditoria.

---

## 7. Upload futuro pelo app mobile

O app mobile não será implementado agora.

Mesmo assim, o módulo deve ser preparado para o funcionário enviar documentos futuramente.

Fluxo futuro:

- funcionário acessa Minhas pendências;
- visualiza documento pendente, rejeitado, vencido ou a vencer;
- toca em Enviar nova versão;
- tira foto ou seleciona arquivo;
- envia para o backend;
- documento entra como UNDER_REVIEW;
- RH aprova ou rejeita;
- versão anterior vira REPLACED quando a nova for aprovada.

---

## 8. Validade e vencimento

Documentos com validade deverão possuir expirationDate.

Classificações futuras:

- vencido: expirationDate menor que a data atual;
- a vencer: expirationDate dentro da janela de aviso;
- crítico: expirationDate dentro de janela curta de alerta.

Janelas sugeridas:

- aviso padrão: 30 dias antes do vencimento;
- aviso crítico: 7 dias antes do vencimento.

---

## 9. Pendências automáticas

O sistema deverá gerar pendências quando houver documentos:

- obrigatórios pendentes;
- rejeitados;
- vencidos;
- próximos do vencimento;
- aguardando aprovação;
- bloqueando ativação;
- bloqueando acesso ao app, quando configurado.

Tipos sugeridos de pendência:

- DOCUMENT_PENDING_UPLOAD;
- DOCUMENT_PENDING_REVIEW;
- DOCUMENT_REJECTED;
- DOCUMENT_EXPIRED;
- DOCUMENT_EXPIRING_SOON;
- DOCUMENT_BLOCKS_ADMISSION;
- DOCUMENT_BLOCKS_APP_ACCESS.

---

## 10. Avisos para o app mobile futuro

O backend e o banco deverão preparar dados para alertas no app mobile.

Exemplos de mensagens futuras:

- Sua CNH está vencida. Envie uma nova versão válida.
- Seu comprovante de residência vence em breve.
- Seu documento foi rejeitado pelo RH. Verifique o motivo e envie novamente.
- Existe documento obrigatório pendente para completar sua ficha.

Canais futuros:

- notificação in-app;
- push notification;
- e-mail opcional;
- badge no menu Documentos.

---

## 11. Versionamento de documentos

Quando um funcionário enviar nova versão de um documento:

- a nova versão deve ser registrada com version incrementado;
- a versão anterior deve ser preservada;
- a versão anterior deve virar REPLACED quando a nova for aprovada;
- o histórico deve ser mantido;
- o vínculo replacedByDocumentId deve indicar substituição.

---

## 12. Aprovação e rejeição

Documentos que exigem aprovação deverão seguir fluxo:

- upload;
- UNDER_REVIEW;
- aprovação ou rejeição pelo RH;
- se aprovado: APPROVED;
- se rejeitado: REJECTED com rejectionReason;
- gerar pendência de novo envio quando rejeitado.

---

## 13. Segurança de arquivos

Regras recomendadas:

- storage privado;
- não expor arquivo por URL pública permanente;
- usar URL temporária para visualização/download;
- limitar tamanho do arquivo;
- aceitar inicialmente PDF, JPG e PNG;
- registrar auditoria de upload;
- registrar auditoria de download/visualização;
- controlar permissão por perfil;
- separar documentos sensíveis;
- mascarar informações em listagens quando necessário.

---

## 14. Documentos sensíveis

Documentos de saúde e segurança deverão ter permissão especial.

Exemplos:

- ASO;
- exames ocupacionais;
- restrições médicas;
- CAT;
- PCMSO;
- documentos de saúde.

Esses documentos deverão ficar visíveis apenas para perfis autorizados.

---

## 15. Endpoints futuros sugeridos

Admin web:

- GET /v1/employees/:employeeId/documents;
- POST /v1/employees/:employeeId/documents;
- GET /v1/employees/:employeeId/documents/:documentId;
- PUT /v1/employees/:employeeId/documents/:documentId/approve;
- PUT /v1/employees/:employeeId/documents/:documentId/reject;
- DELETE /v1/employees/:employeeId/documents/:documentId.

App mobile futuro:

- GET /v1/me/documents;
- POST /v1/me/documents/:documentTypeId/upload;
- GET /v1/me/document-pendencies.

Tipos de documentos:

- GET /v1/document-types;
- POST /v1/document-types;
- PUT /v1/document-types/:id;
- DELETE /v1/document-types/:id.

---

## 16. Regra de implementação futura

A implementação do módulo de documentos deverá ocorrer em fases separadas:

- auditar módulo documents existente;
- auditar storage atual;
- definir tabelas;
- criar migrations;
- criar entities;
- criar DTOs;
- criar services;
- criar controllers;
- criar admin web;
- validar upload admin;
- validar aprovação/rejeição;
- validar vencimentos;
- preparar pendências mobile.

---

## Fora de escopo nesta parte

Esta parte não implementa:

- tabelas;
- migrations;
- entities;
- DTOs;
- controllers;
- services;
- telas;
- upload real;
- notificações reais;
- app mobile.

Esta parte registra apenas a regra técnica de documentos do funcionário.
