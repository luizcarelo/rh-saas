# SuperAdmin-A4-E5-E1 — Decisão técnica do endpoint backend de criação

Data: 20260705_020455

## Conclusão

```text
TENANT_E_POST_EXISTEM_REVISAR_REGISTRO_ROTA
```

## Diagnóstico resumido

```text
HAS_TENANT_ENTITY=SIM
HAS_TENANT_TABLE=SIM
HAS_NAME_FIELD=SIM
HAS_SLUG_FIELD=SIM
HAS_STATUS_FIELD=SIM
HAS_ACTIVE_FIELD=SIM
HAS_POST_CLIENT_CONTROLLER=SIM
HAS_CREATE_DTO=SIM
HAS_SERVICE_CREATE=SIM
HAS_MODULE_REGISTRATION_HINT=SIM
FRONT_CREATE_ENDPOINTS=SIM
RECOMMENDED_ENDPOINT=/v1/super-admin/clientes
RECOMMENDED_BACKEND_CONTROLLER=SuperAdminClientsController
RECOMMENDED_DTO=CreateSuperAdminClientDto
CONCLUSION=TENANT_E_POST_EXISTEM_REVISAR_REGISTRO_ROTA
```

## Entidade/Tabela

A fase identificou os seguintes pontos:

- Entidade Tenant detectada: SIM
- Tabela tenant detectada: SIM
- Campo name detectado: SIM
- Campo slug detectado: SIM
- Campo status detectado: SIM
- Campo active/isActive detectado: SIM

## Endpoint recomendado

Para padronizar o Super Admin, o endpoint backend recomendado é:

```text
POST /v1/super-admin/clientes
```

## Controller recomendado

```text
SuperAdminClientsController
```

## DTO recomendado

```text
CreateSuperAdminClientDto
```

## Payload inicial recomendado

```json
{
  "name": "Cliente Homologação RH SaaS",
  "slug": "cliente-homologacao-rh-saas",
  "email": "homologacao@rh-saas.local",
  "status": "PENDING",
  "isActive": true,
  "planId": null,
  "moduleIds": [],
  "adminName": null,
  "adminEmail": null,
  "adminPassword": null
}
```

## Regras para próxima fase E5-E2

- Criar endpoint backend sem executar criação automática.
- Validar DTO com class-validator se o projeto já usa esse padrão.
- Usar entity/table Tenant existente.
- Não remover nem quebrar endpoints existentes.
- Registrar módulo/controller no app.module ou módulo correspondente.
- Manter auditoria/rollback para fase posterior.
