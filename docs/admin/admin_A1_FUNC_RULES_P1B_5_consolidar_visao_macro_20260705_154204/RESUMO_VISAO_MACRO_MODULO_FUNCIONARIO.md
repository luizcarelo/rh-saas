# Resumo consolidado — Visão macro do módulo Funcionário

## Escopo consolidado

O módulo Funcionário será tratado como núcleo operacional do RH SaaS.

Nesta etapa, o trabalho de implementação ficará restrito a:

- backend;
- app admin web;
- banco de dados.

O app mobile não será implementado agora, mas o backend e o banco deverão deixar estrutura preparada para consumo futuro.

## Direção de produto

O cadastro de funcionário será progressivo e modular.

Não será adotado formulário único gigante.

## Cadastro progressivo

O funcionário poderá nascer com cadastro mínimo operacional e ter sua ficha complementada por etapas.

Cadastro mínimo atual identificado:

- firstName;
- lastName;
- cpf;
- email;
- department;
- jobTitle;
- admissionDate.

## Status sugeridos

- DRAFT;
- PENDING_COMPLETION;
- ACTIVE;
- INACTIVE;
- TERMINATED.

## Módulos funcionais previstos

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

## Responsabilidades por camada

Backend:

- validações;
- regras de negócio;
- permissões;
- auditoria;
- documentos;
- pendências;
- preparação mobile.

Banco:

- estrutura modular;
- tenantId;
- histórico;
- documentos;
- pendências;
- preparação mobile.

Admin web:

- listagem;
- pré-cadastro;
- detalhes;
- abas/seções;
- documentos;
- pendências;
- vínculo com usuário;
- auditoria.

Mobile futuro:

- perfil;
- documentos;
- pendências;
- upload futuro;
- notificações futuras.
