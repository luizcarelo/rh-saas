# Sprint Mobile-B3-E-DIAG - Validar contrato do endpoint de batida

Data: 20260704_224911

## Status

Diagnóstico concluído.

## Conclusão

```text
ENDPOINT_ACEITA_PUNCHTYPE_MAS_PODE_IGNORAR_OU_NAO_VALIDAR
```

## Resumo

```text
TSC_STATUS=TSC_OK
DB_TABLES_STATUS=DB_TABLES_OK
DB_BEFORE_STATUS=DB_COUNTS_BEFORE_OK
DB_AFTER_STATUS=DB_COUNTS_AFTER_OK
LOGIN_STATUS=200
TOKEN_STATUS=TOKEN_OK
CLOCK_ENDPOINT=/v1/time-records/clock-in
BASE_ACCEPTED=SIM
PUNCHTYPE_ACCEPTED=SIM
EVENTTYPE_ACCEPTED=SIM
TYPE_ACCEPTED=SIM
CLOCKTYPE_ACCEPTED=SIM
INVALID_PUNCHTYPE_ACCEPTED=SIM
CONCLUSION=ENDPOINT_ACEITA_PUNCHTYPE_MAS_PODE_IGNORAR_OU_NAO_VALIDAR
```

## Endpoint testado

```text
https://rh.lhsolucao.com.br/v1/time-records/clock-in
```

## Testes executados

```text
test_name	payload_file	http_status	response_file	detected_id	accepted
A_atual_lat_lng	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/payload_A_atual_lat_lng.json	201	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/response_A_atual_lat_lng.json	b212f5f4-6d8d-4f21-9960-81b41d02aa54	SIM
B_punchType_ENTRADA	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/payload_B_punchType_ENTRADA.json	201	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/response_B_punchType_ENTRADA.json	6b26661b-a0dc-4ff6-8898-c2eef4abf31f	SIM
C_eventType_ENTRADA	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/payload_C_eventType_ENTRADA.json	201	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/response_C_eventType_ENTRADA.json	85dca325-50e4-427d-ace8-3f3948f732db	SIM
D_type_ENTRADA	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/payload_D_type_ENTRADA.json	201	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/response_D_type_ENTRADA.json	0c4a8106-b55c-4cf2-a828-b2a609053928	SIM
E_clockType_ENTRADA	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/payload_E_clockType_ENTRADA.json	201	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/response_E_clockType_ENTRADA.json	c0a86e77-d53f-4258-9edf-79b335a27aec	SIM
F_punchType_INVALIDO	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/payload_F_punchType_INVALIDO.json	201	/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/response_F_punchType_INVALIDO.json	bff86738-40f5-46a8-a938-77b70372439e	SIM
```

## Arquivos gerados

Mobile raw:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/mobile_clock_contract_raw.txt
```

Backend raw:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/backend_clock_contract_raw.txt
```

Tabelas relacionadas:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/db_clock_related_tables.txt
```

Contagens antes:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/db_counts_before.txt
```

Contagens depois:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/db_counts_after.txt
```

Login response redigida:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/login_response_redacted.json
```

Notas de rollback:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911/rollback_notes_20260704_224911.sql
```

Diretório de evidências:

```text
/opt/rh-saas/docs/mobile/clock_contract_diag_20260704_224911
```

## Backup documental

```text
/opt/rh-saas/backups/sprint_mobile_B3_E_diag_contrato_endpoint_batida_20260704_224911
```

## Regras

- Nenhum código mobile foi alterado.
- Nenhum backend foi alterado.
- Nenhuma estrutura de banco foi alterada.
- Nenhum pacote foi instalado.
- Nenhum build foi executado.
- Os testes podem ter criado registros reais de batida.
- Foram geradas notas de rollback para análise manual.

## Próximo passo recomendado

- Se a conclusão indicar que campos extras são ignorados, não enviar tipo de batida ainda.
- Se a conclusão confirmar validação de punchType, implementar envio com punchType.
- Se não houver suporte real ao tipo, planejar backend antes de Mobile-B3-E funcional.
