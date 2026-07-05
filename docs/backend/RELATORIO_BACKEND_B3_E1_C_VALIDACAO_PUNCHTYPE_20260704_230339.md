# Sprint Backend-B3-E1-C - Publicar API e validar contrato punchType

Data: 20260704_230339

## Status

```text
CONTRATO_PUNCHTYPE_PRINCIPAIS_VALIDADO
```

## Resumo

```text
BUILD_STATUS=BUILD_API_OK
UP_STATUS=UP_API_OK
API_STATUS=rh_saas_api Up 8 seconds
LOGIN_STATUS=200
TOKEN_STATUS=TOKEN_OK
CLOCK_ENDPOINT=/v1/time-records/clock-in
STATUS_OLD=201
STATUS_ENTRADA=201
STATUS_INICIO_INTERVALO=201
STATUS_FIM_INTERVALO=201
STATUS_SAIDA=201
STATUS_INVALIDO=400
STATUS_AVANCADO=400
CONCLUSION=CONTRATO_PUNCHTYPE_PRINCIPAIS_VALIDADO
```

## Endpoint testado

```text
https://rh.lhsolucao.com.br/v1/time-records/clock-in
```

## Testes executados

```text
test_name	payload_file	http_status	response_file	detected_id	accepted	expected
A_payload_antigo_sem_punchType	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/payload_A_payload_antigo_sem_punchType.json	201	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_A_payload_antigo_sem_punchType.json	e61c832b-12f0-482f-89cb-a3050831719e	SIM	201
B_punchType_ENTRADA	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/payload_B_punchType_ENTRADA.json	201	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_B_punchType_ENTRADA.json	2ff834f2-cdbc-4ffc-a090-a73d622528db	SIM	201
C_punchType_INICIO_INTERVALO	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/payload_C_punchType_INICIO_INTERVALO.json	201	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_C_punchType_INICIO_INTERVALO.json	835f6c0a-fd17-4bb1-a817-c7565c3bfcff	SIM	201
D_punchType_FIM_INTERVALO	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/payload_D_punchType_FIM_INTERVALO.json	201	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_D_punchType_FIM_INTERVALO.json	962a81ed-d3e0-49b4-a0ae-e673a7cb23d0	SIM	201
E_punchType_SAIDA	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/payload_E_punchType_SAIDA.json	201	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_E_punchType_SAIDA.json	4ac44739-d1eb-4c27-9ba5-8a4186a15e49	SIM	201
F_punchType_INVALIDO	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/payload_F_punchType_INVALIDO.json	400	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_F_punchType_INVALIDO.json		NAO	400
G_punchType_AVANCADO_NAO_SUPORTADO	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/payload_G_punchType_AVANCADO_NAO_SUPORTADO.json	400	/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_G_punchType_AVANCADO_NAO_SUPORTADO.json		NAO	400
```

## Logs

Build API:

```text
/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/docker_build_api.log
```

Up API:

```text
/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/docker_up_api.log
```

API log:

```text
/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/api_container_log.txt
```

Login response redigida:

```text
/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/login_response_redacted.json
```

Diretorio de evidencias:

```text
/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339
```

Rollback notes:

```text
/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/rollback_notes_20260704_230339.sql
```

## Backup documental

```text
/opt/rh-saas/backups/sprint_backend_B3_E1_C_publicar_validar_punchtype_20260704_230339
```

## Regras

- Nenhum codigo foi alterado nesta fase.
- Nenhuma estrutura de banco foi alterada.
- Nenhuma migration foi executada.
- Nenhum mobile-app foi alterado.
- Nenhum frontend-web foi alterado.
- O container da API foi recriado.
- Os testes podem ter criado registros reais de ponto.
- Foram geradas notas de rollback para análise manual.

## Proximo passo recomendado

Se o contrato foi validado, executar Mobile-B3-C e Mobile-B3-E para usar os tipos principais no app mobile.
