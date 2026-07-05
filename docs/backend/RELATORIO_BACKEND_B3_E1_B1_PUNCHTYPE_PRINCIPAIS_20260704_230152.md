# Sprint Backend-B3-E1-B1 - Suporte punchType tipos principais

Data: 20260704_230152

## Status

BUILD_OK

## Objetivo

Implementar suporte real e validado a punchType no endpoint /v1/time-records/clock-in para os tipos principais de batida.

## Arquivo alterado

```text
/opt/rh-saas/backend/src/modules/time-records/time-records.controller.ts
```

## Tipos suportados nesta fase

| punchType mobile | Metodo backend usado |
|---|---|
| ENTRADA | clockIn |
| INICIO_INTERVALO | breakStart |
| FIM_INTERVALO | breakEnd |
| SAIDA | clockOut |

## Compatibilidade

- Payload antigo sem punchType continua funcionando.
- Sem punchType, o endpoint mantém comportamento anterior equivalente a ENTRADA.
- punchType inválido ou avançado retorna BadRequestException.

## Arquivos consultados

- /opt/rh-saas/backend/src/modules/time-records/time-records.controller.ts
- /opt/rh-saas/backend/src/modules/time-records/time-records.service.ts
- /opt/rh-saas/backend/src/modules/time-records/time-record.entity.ts

## Patch log

```text
/opt/rh-saas/docs/backend/PATCH_BACKEND_B3_E1_B1_PUNCHTYPE_PRINCIPAIS_20260704_230152.log
```

## Build log

```text
/opt/rh-saas/docs/backend/BUILD_BACKEND_B3_E1_B1_PUNCHTYPE_PRINCIPAIS_20260704_230152.log
```

## Backup

```text
/opt/rh-saas/backups/sprint_backend_B3_E1_B1_punchtype_principais_20260704_230152
```

## Regras

- Nenhum banco foi alterado.
- Nenhuma migration foi criada.
- Nenhum mobile-app foi alterado.
- Nenhum frontend-web foi alterado.
- Nenhum pacote foi instalado.
- Nenhum container foi recriado.
- Nenhum deploy foi executado.

## Proximo passo recomendado

Backend-B3-E1-C — Publicar/reiniciar API e validar contrato real com punchType valido e invalido.
