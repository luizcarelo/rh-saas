# Sprint 4.6B-F-Mobile-A5-LOGIN-FIX

Data: 20260704_173549

## Status

TSC_OK

## Objetivo

Corrigir o LoginScreen do mobile-app para aceitar access_token retornado pela API de login.

## Arquivo alterado

- /opt/rh-saas/mobile-app/src/screens/LoginScreen.tsx

## Correção aplicada

O login agora aceita os seguintes campos de token na resposta da API:

- access_token
- accessToken
- token
- jwt

O valor encontrado continua sendo salvo em:

- AsyncStorage: @LH_Token

## Backup

/opt/rh-saas/backups/sprint_4_6B_F_mobile_A5_login_fix_20260704_173549

## Log de validação

/opt/rh-saas/docs/mobile/VALIDACAO_MOBILE_A5_LOGIN_FIX_20260704_173549.log

## Regras

- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhuma senha foi alterada.
- Nenhum pacote foi instalado.
- Nenhum background tracking foi implementado.

## Próximo passo

Reexecutar Mobile-A5-RETEST via Expo Tunnel e validar login no app.
