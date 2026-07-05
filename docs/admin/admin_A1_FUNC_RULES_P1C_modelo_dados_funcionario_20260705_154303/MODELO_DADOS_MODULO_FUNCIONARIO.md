# Módulo Funcionário — Modelo de dados conceitual

## Regra principal

O módulo Funcionário deverá evoluir com modelo de dados modular.

A tabela `employees` deverá ser o núcleo do funcionário, mas dados especializados devem ficar em estruturas próprias.

O objetivo é evitar uma tabela única gigante e permitir evolução por módulo, plano SaaS, permissão e finalidade.

---

## 1. Núcleo: employees

Finalidade:

- identificar o funcionário;
- manter vínculo com tenant;
- armazenar campos mínimos operacionais;
- controlar status principal;
- servir como raiz para os módulos complementares.

Campos conceituais:

- id;
- tenantId;
- firstName;
- lastName;
- cpf;
- email;
- department;
- jobTitle;
- admissionDate;
- isActive;
- status futuro;
- createdAt;
- updatedAt.

Contrato atual mapeado para criação:

- firstName;
- lastName;
- cpf;
- email;
- department;
- jobTitle;
- admissionDate.

---

## 2. Dados pessoais: employee_personal_data

Finalidade:

- guardar dados pessoais complementares;
- separar dados cadastrais do núcleo operacional.

Campos conceituais:

- employeeId;
- fullName;
- socialName;
- birthDate;
- gender;
- maritalStatus;
- nationality;
- birthCity;
- birthState;
- motherName;
- fatherName;
- personalEmail;
- mobilePhone;
- secondaryPhone;
- photoFileId.

---

## 3. Endereço: employee_addresses

Finalidade:

- registrar endereço residencial;
- permitir integração com CEP;
- apoiar admissão, documentos, benefícios e folha.

Campos conceituais:

- employeeId;
- cep;
- street;
- number;
- complement;
- district;
- city;
- state;
- country;
- ibgeCode;
- isPrimary;
- createdAt;
- updatedAt.

---

## 4. Contrato: employee_contracts

Finalidade:

- registrar dados contratuais e vínculo de trabalho.

Campos conceituais:

- employeeId;
- registrationNumber;
- contractType;
- admissionDate;
- terminationDate;
- department;
- jobTitle;
- jobFunction;
- costCenterId;
- branchId;
- managerEmployeeId;
- workMode;
- status;
- createdAt;
- updatedAt.

---

## 5. Jornada e ponto: employee_work_settings

Finalidade:

- armazenar configurações necessárias para ponto, jornada, escala e banco de horas.

Campos conceituais:

- employeeId;
- scheduleId;
- workJourneyId;
- expectedMinutesPerDay;
- toleranceMinutes;
- workLocationId;
- geofenceId;
- timeTrackingEnabled;
- liveTrackingEnabled;
- createdAt;
- updatedAt.

---

## 6. Tipos de documentos: employee_document_types

Finalidade:

- configurar tipos de documentos exigidos pelo tenant;
- definir obrigatoriedade, validade, aprovação e visibilidade mobile.

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

## 7. Documentos: employee_documents

Finalidade:

- armazenar metadados de arquivos enviados;
- controlar versão, validade, aprovação e substituição.

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

Status sugeridos:

- PENDING;
- UPLOADED;
- UNDER_REVIEW;
- APPROVED;
- REJECTED;
- EXPIRED;
- REPLACED;
- CANCELED.

---

## 8. Dependentes: employee_dependents

Finalidade:

- registrar dependentes e familiares necessários para benefícios, folha e documentos.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- name;
- cpf;
- birthDate;
- relationship;
- isIncomeTaxDependent;
- isHealthPlanDependent;
- documentFileId;
- createdAt;
- updatedAt.

---

## 9. Benefícios: employee_benefits

Finalidade:

- controlar benefícios concedidos ao funcionário.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- benefitType;
- provider;
- startDate;
- endDate;
- employeeCost;
- companyCost;
- status;
- notes;
- createdAt;
- updatedAt.

---

## 10. Dados bancários: employee_bank_accounts

Finalidade:

- registrar dados bancários com acesso restrito.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- bankCode;
- bankName;
- agency;
- accountNumber;
- accountDigit;
- accountType;
- pixKey;
- holderName;
- holderDocument;
- isPrimary;
- createdAt;
- updatedAt.

---

## 11. Histórico salarial: employee_salary_history

Finalidade:

- controlar salário e reajustes com acesso restrito.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- salaryAmount;
- salaryType;
- effectiveDate;
- reason;
- approvedByUserId;
- createdAt;
- updatedAt.

---

## 12. Saúde e segurança: employee_health_records

Finalidade:

- registrar dados de SST e saúde ocupacional com permissão especial.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- recordType;
- documentId;
- issueDate;
- expirationDate;
- status;
- notes;
- restrictedAccess;
- createdAt;
- updatedAt.

---

## 13. Vínculo com usuário: employee_user_links

Finalidade:

- registrar vínculo entre funcionário e usuário do sistema;
- preparar acesso ao portal/app.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- userId;
- linkedAt;
- unlinkedAt;
- status;
- createdAt;
- updatedAt.

Observação:

O contrato atual já possui endpoints para vínculo:

- PUT /v1/employees/:id/link-user;
- DELETE /v1/employees/:id/link-user.

---

## 14. Auditoria: employee_audit_logs

Finalidade:

- registrar eventos relevantes da ficha do funcionário.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- actorUserId;
- action;
- entityType;
- entityId;
- beforeData;
- afterData;
- metadata;
- createdAt.

Eventos sugeridos:

- EMPLOYEE_CREATED;
- EMPLOYEE_UPDATED;
- EMPLOYEE_ACTIVATED;
- EMPLOYEE_INACTIVATED;
- DOCUMENT_UPLOADED;
- DOCUMENT_APPROVED;
- DOCUMENT_REJECTED;
- DOCUMENT_EXPIRED;
- USER_LINKED;
- USER_UNLINKED;
- SENSITIVE_DATA_VIEWED.

---

## 15. Pendências: employee_pending_actions

Finalidade:

- registrar pendências operacionais para admin web e app mobile futuro.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- type;
- title;
- description;
- severity;
- dueDate;
- relatedEntityType;
- relatedEntityId;
- status;
- resolvedAt;
- createdAt;
- updatedAt.

Tipos sugeridos:

- COMPLETE_PROFILE;
- COMPLETE_ADDRESS;
- UPLOAD_DOCUMENT;
- DOCUMENT_EXPIRED;
- DOCUMENT_EXPIRING_SOON;
- DOCUMENT_REJECTED;
- CONFIGURE_SCHEDULE;
- LINK_USER;
- REVIEW_REQUIRED.

---

## 16. Notificações: employee_notifications

Finalidade:

- preparar notificações futuras para admin web e app mobile.

Campos conceituais:

- id;
- tenantId;
- employeeId;
- userId;
- type;
- channel;
- title;
- message;
- status;
- readAt;
- sentAt;
- createdAt.

Canais futuros:

- in_app;
- push;
- email.

---

## 17. Regras gerais do modelo

- Toda tabela operacional deve possuir tenantId quando aplicável.
- Dados sensíveis devem ficar separados e protegidos por permissão.
- Documentos devem usar storage privado.
- Arquivos devem ser versionados.
- Alterações críticas devem gerar auditoria.
- Pendências devem ser armazenadas no backend/banco, mesmo antes do app mobile.
- O modelo deve permitir evolução por módulo e por plano SaaS.

---

## Fora de escopo nesta parte

Esta parte não cria tabelas reais, migrations, endpoints ou telas.

Esta parte registra apenas o modelo de dados conceitual do módulo Funcionário.
