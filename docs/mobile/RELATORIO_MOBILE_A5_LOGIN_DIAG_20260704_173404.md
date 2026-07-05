# Sprint 4.6B-F-Mobile-A5-LOGIN-DIAG

Data: 20260704_173404

## Status

Diagnostico de login mobile/API concluido.

## API testada

```text
https://rh.lhsolucao.com.br/v1/auth/login
```

## HTTP status

```text
200
```

## Conclusao

```text
API_LOGIN_OK_MAS_APP_NAO_TRATA_ACCESS_TOKEN
```

## Analise da resposta

```text
HTTP_STATUS=200
IS_JSON=True
TOP_LEVEL_KEYS=access_token, user_info
TOKEN_KEYS_FOUND=access_token
HAS_token=False
HAS_access_token=True
HAS_accessToken=False
HAS_jwt=False
```

## LoginScreen

| Check | Resultado |
|---|---|
| Usa response.data | SIM |
| Espera token | SIM |
| Trata access_token | NAO |
| Trata accessToken | NAO |
| Usa @LH_Token | SIM |

## api.ts

| Check | Resultado |
|---|---|
| Possui baseURL | SIM |
| Usa @LH_Token | SIM |

## Arquivos gerados

Resposta redigida:

```text
/opt/rh-saas/docs/mobile/login_diag_20260704_173404/login_response_redacted.json
```

Headers:

```text
/opt/rh-saas/docs/mobile/login_diag_20260704_173404/login_headers.txt
```

Analise:

```text
/opt/rh-saas/docs/mobile/login_diag_20260704_173404/login_analysis.txt
```

LoginScreen snippet:

```text
/opt/rh-saas/docs/mobile/login_diag_20260704_173404/LoginScreen_snippet.txt
```

api.ts snippet:

```text
/opt/rh-saas/docs/mobile/login_diag_20260704_173404/api_ts_snippet.txt
```

## Backup

```text
/opt/rh-saas/backups/sprint_4_6B_F_mobile_A5_login_diag_20260704_173404
```

## Regras

- Nenhum codigo foi alterado.
- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhuma senha foi salva.
- Nenhum token em claro foi salvo.

## Proximo passo

- Se a conclusao for API_LOGIN_OK_MAS_APP_NAO_TRATA_ACCESS_TOKEN, criar Mobile-A5-LOGIN-FIX.
- Se a conclusao for API_LOGIN_FALHOU_OU_CREDENCIAL_INVALIDA, validar credenciais ou preparar reset controlado.
