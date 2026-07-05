# Módulo Funcionário — Responsabilidades por camada

## Regra principal

O módulo Funcionário deverá separar claramente as responsabilidades entre:

- backend;
- banco de dados;
- app admin web;
- preparação futura para app mobile.

Nesta etapa do projeto, a implementação efetiva ficará restrita a backend, app admin web e banco de dados.

O app mobile será preparado por contratos, dados, endpoints futuros e estrutura de pendências, mas não será implementado agora.

---

## 1. Responsabilidades do backend

O backend será a fonte oficial das regras do módulo Funcionário.

Responsabilidades do backend:

- validar campos obrigatórios;
- validar formato de CPF, e-mail e datas;
- controlar tenantId;
- aplicar regras de permissão;
- aplicar regras de status do funcionário;
- aplicar regras de ativação;
- centralizar regras de documentos;
- controlar upload e metadados de documentos;
- controlar status de documentos;
- controlar validade e vencimento de documentos;
- gerar pendências operacionais;
- preparar dados para notificações futuras;
- registrar auditoria;
- expor endpoints para o app admin web;
- preparar endpoints futuros para app mobile.

O backend não deve depender exclusivamente do frontend para validar regras importantes.

---

## 2. Responsabilidades do banco de dados

O banco deverá representar o módulo Funcionário de forma modular.

Responsabilidades do banco:

- manter o núcleo do funcionário;
- manter dados complementares em tabelas próprias;
- evitar concentração de todos os dados em uma única tabela gigante;
- preservar tenantId nas entidades relacionadas;
- permitir auditoria e histórico;
- permitir versionamento de documentos;
- permitir controle de documentos vencidos;
- permitir pendências para o funcionário;
- permitir integração futura com app mobile.

Estrutura modular futura sugerida:

- employees;
- employee_personal_data;
- employee_addresses;
- employee_contracts;
- employee_documents;
- employee_document_types;
- employee_dependents;
- employee_benefits;
- employee_bank_accounts;
- employee_salary_history;
- employee_health_records;
- employee_user_links;
- employee_audit_logs;
- employee_notifications;
- employee_pending_actions.

---

## 3. Responsabilidades do app admin web

O app admin web será a interface principal de gestão do módulo Funcionário nesta etapa.

Responsabilidades do app admin web:

- listar funcionários;
- criar pré-cadastro;
- visualizar detalhes do funcionário;
- completar ficha por etapas;
- exibir checklist de completude;
- exibir pendências;
- gerenciar documentos;
- enviar documentos pelo RH;
- aprovar documentos;
- rejeitar documentos com motivo;
- visualizar documentos vencidos ou a vencer;
- vincular usuário ao funcionário;
- desvincular usuário;
- consultar histórico e auditoria;
- respeitar permissões por perfil.

O admin web não deverá concentrar todas as regras de negócio. Regras críticas deverão permanecer no backend.

---

## 4. Preparação para app mobile

O app mobile não será implementado nesta etapa.

Mesmo assim, backend e banco deverão ficar preparados para recursos futuros:

- consulta do perfil do funcionário;
- consulta de documentos do funcionário;
- consulta de pendências;
- documentos vencidos;
- documentos a vencer;
- upload futuro de documentos;
- envio de nova versão;
- notificações in-app;
- push notification futura;
- histórico de pendências.

Endpoints futuros sugeridos:

- GET /v1/me/profile;
- GET /v1/me/documents;
- POST /v1/me/documents/:documentTypeId/upload;
- GET /v1/me/document-pendencies;
- GET /v1/me/pending-actions.

---

## 5. Responsabilidades de permissões

O módulo deverá separar dados por nível de acesso.

Dados comuns:

- nome;
- e-mail;
- departamento;
- cargo;
- data de admissão.

Dados restritos:

- CPF;
- RG;
- endereço;
- documentos pessoais;
- dependentes;
- dados bancários;
- salário.

Dados sensíveis/restritos especiais:

- saúde;
- ASO;
- restrições médicas;
- exames ocupacionais;
- biometria, se houver.

Perfis futuros poderão incluir:

- SUPER_ADMIN;
- TENANT_ADMIN;
- RH_ADMIN;
- MANAGER;
- EMPLOYEE;
- SST_ADMIN;
- FINANCE_ADMIN.

---

## 6. Responsabilidades de auditoria

Eventos relevantes deverão gerar auditoria.

Eventos sugeridos:

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
- dados sensíveis acessados;
- dados financeiros acessados;
- pendência criada;
- pendência resolvida.

---

## 7. Responsabilidades de LGPD e segurança

O módulo Funcionário deverá respeitar princípios de necessidade, finalidade, segurança e rastreabilidade.

Regras recomendadas:

- coletar apenas dados necessários por etapa;
- separar dados sensíveis;
- controlar acesso por perfil;
- registrar auditoria de acesso a documentos;
- evitar exposição de documentos em URLs públicas;
- usar storage privado;
- usar URLs temporárias para download;
- mascarar dados sensíveis em listagens;
- manter logs de acesso;
- permitir rastreabilidade de alterações.

---

## 8. Fora de escopo nesta parte

Esta parte não implementa:

- tabelas;
- migrations;
- endpoints;
- telas;
- upload;
- validação operacional;
- app mobile;
- alteração de permissões reais.

Esta parte registra apenas as responsabilidades por camada do módulo Funcionário.
