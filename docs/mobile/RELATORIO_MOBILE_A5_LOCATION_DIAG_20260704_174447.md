# Sprint 4.6B-F-Mobile-A5-LOCATION-DIAG

Data: 20260704_174447

## Status

Diagnostico de envio de localizacao mobile concluido.

## Conclusao

```text
API_LOCATION_OK_VIA_CURL_PROBLEMA_PROVAVEL_NO_APP_OU_UI
```

## Resumo tecnico

```text
TSC_STATUS=TSC_OK
LOGIN_STATUS=200
TOKEN_STATUS=TOKEN_OK
EMPLOYEE_STATUS=EMPLOYEE_PROFILE_OK
EMPLOYEE_PROFILE_ID=2eaaf7bc-9b59-4fb3-b68e-7aadf580994b
DEVICE_STATUS=201
DEVICE_ID=cc5ac973-5d50-4ba3-9d29-1c05d2abd0a4
LOCATION_STATUS=201
POINT_ID=212f4a5e-e215-4f48-9ba7-ebd925c857ba
LATEST_STATUS=200
POINTS_STATUS=200
DB_BEFORE_STATUS=DB_CONTAGEM_ANTES_OK
DB_AFTER_STATUS=DB_CONTAGEM_DEPOIS_OK
DIAG_CONCLUSION=API_LOCATION_OK_VIA_CURL_PROBLEMA_PROVAVEL_NO_APP_OU_UI
```

## Arquivos inspecionados

- /opt/rh-saas/mobile-app/src/screens/LiveTrackingScreen.tsx
- /opt/rh-saas/mobile-app/src/services/liveTrackingApi.ts
- /opt/rh-saas/mobile-app/src/screens/LoginScreen.tsx
- /opt/rh-saas/mobile-app/src/services/api.ts

## Evidencias

Diretorio:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447
```

Login response redigida:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/login_response_redacted.json
```

Device payload:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/device_payload.json
```

Device response:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/device_response.json
```

Location payload:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/location_payload.json
```

Location response:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/location_response.json
```

Latest response:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/latest_response.json
```

Points response:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/points_response.json
```

Rollback SQL:

```text
/opt/rh-saas/docs/mobile/location_diag_20260704_174447/rollback_location_diag_20260704_174447.sql
```

## Contagens antes

```text
          tabela          | total 
--------------------------+-------
 mobile_devices           |     3
 location_tracking_points |    25
(2 rows)
```

## Contagens depois

```text
          tabela          | total 
--------------------------+-------
 mobile_devices           |     4
 location_tracking_points |    26
(2 rows)
```

## Backup

```text
/opt/rh-saas/backups/sprint_4_6B_F_mobile_A5_location_diag_20260704_174447
```

## Regras

- Nenhum codigo mobile foi alterado.
- Nenhum backend foi alterado.
- Nenhuma estrutura de banco foi alterada.
- Nenhum pacote foi instalado.
- Nenhum background tracking foi implementado.
- Pode ter criado registros de diagnostico em tabelas Foundation existentes.
- Foi gerado rollback SQL.

## Proximo passo

- Se a API funcionou via curl, criar Mobile-A5-LOCATION-FIX-UI para instrumentar a tela e mostrar erro/status real do envio.
- Se a API falhou via curl, corrigir payload/API antes de novo reteste.
