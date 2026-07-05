# Decisão principal — Módulo Funcionário

## Decisão

O módulo Funcionário será tratado como núcleo operacional do RH SaaS.

A regra técnica registrada na ficha técnica passa a ser a base oficial para as próximas fases de auditoria, modelagem, backend, banco de dados e app admin web.

## Escopo atual

Nesta etapa, o desenvolvimento e as validações deverão permanecer restritos a:

- backend;
- app admin web;
- banco de dados.

O app mobile não será implementado agora.

## Preparação futura para mobile

Mesmo sem implementar o app mobile nesta etapa, backend e banco deverão ser planejados para permitir consumo futuro pelo mobile.

Essa preparação deverá considerar:

- perfil do funcionário;
- documentos do funcionário;
- documentos vencidos;
- documentos a vencer;
- pendências;
- notificações;
- upload futuro de documentos;
- endpoints futuros do tipo `/v1/me/*`.

## Diretriz de implementação

O módulo Funcionário deverá ser implementado em fases pequenas.

Não deverá haver implementação em bloco grande.

## Diretriz de cadastro

O cadastro de funcionário deverá ser progressivo e modular.

O funcionário poderá nascer com cadastro mínimo operacional e ter a ficha complementada por etapas.

Cadastro mínimo atual:

- firstName;
- lastName;
- cpf;
- email;
- department;
- jobTitle;
- admissionDate.

## Diretriz de interface

O app admin web não deverá usar formulário único gigante.

A experiência deverá evoluir para:

- pré-cadastro;
- abas;
- seções;
- checklist;
- pendências;
- salvamento por etapa;
- validação por etapa.

## Diretriz de documentos

Documentos do funcionário serão tratados como módulo próprio.

Esse módulo deverá prever:

- tipos de documentos;
- upload;
- versionamento;
- validade;
- aprovação;
- rejeição;
- vencimento;
- pendências;
- avisos futuros para o app mobile;
- auditoria;
- permissões.

## Diretriz de segurança

Dados sensíveis, financeiros, bancários, documentos pessoais e documentos de saúde deverão possuir controle de permissão e auditoria.

## Próxima decisão complementar

As próximas partes da P1F-3 deverão registrar:

- restrições antes da auditoria;
- auditoria obrigatória;
- consolidação da decisão técnica.
