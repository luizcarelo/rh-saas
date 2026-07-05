# Contrato técnico — Cadastro de Funcionários

Data: 20260705_041811

## Endpoints principais identificados

```text
GET    /v1/employees
POST   /v1/employees
GET    /v1/employees/:id
DELETE /v1/employees/:id
PUT    /v1/employees/:id/link-user
DELETE /v1/employees/:id/link-user
```

## Payload de criação identificado

DTO:

```text
CreateEmployeeDto
```

Campos obrigatórios identificados:

```text
firstName
lastName
cpf
email
department
jobTitle
admissionDate
```

## Vínculo com usuário

DTO:

```text
LinkUserDto
```

Campo obrigatório:

```text
userId
```

Endpoints:

```text
PUT    /v1/employees/:id/link-user
DELETE /v1/employees/:id/link-user
```

## Observações técnicas

- O frontend usa /v1/employees para listagem/criação.
- O backend possui controller, service, module, entity e DTOs relacionados.
- O cadastro possui referência a tenantId na entidade/service.
- O vínculo de usuário é separado do cadastro base do funcionário.
- Não foi identificado DTO específico de atualização de funcionário na extração P4.
