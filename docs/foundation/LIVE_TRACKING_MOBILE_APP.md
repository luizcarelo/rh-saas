# Live Tracking Mobile App

## Sprint 4.6B-F-Mobile

## Objetivo

Documentar a integração manual do Live Tracking no app mobile, usando a Foundation já existente.

## Escopo técnico

- App: `/opt/rh-saas/mobile-app`
- Backend: NestJS API
- Banco: Foundation PostgreSQL
- Tabelas envolvidas:
  - `mobile_devices`
  - `location_tracking_points`
  - `hr_employee_profiles`

## Arquivos mobile criados ou alterados nas fases anteriores

- `src/services/liveTrackingApi.ts`
- `src/screens/LiveTrackingScreen.tsx`
- `App.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/LoginScreen.tsx`

## Funcionalidades validadas

- Login no app mobile usando JWT.
- Abertura do app via Expo Tunnel.
- Abertura da HomeScreen.
- Acesso à tela Live Tracking.
- Carregamento de colaboradores Foundation.
- Seleção de colaborador.
- Registro de dispositivo mobile.
- Solicitação de permissão de localização.
- Captura da localização atual.
- Envio manual do ponto GPS.
- Exibição de Device ID e Point ID.
- Atualização das últimas localizações no app.
- Visualização do ponto no frontend-web.

## Validação final

Documento de validação:

`/opt/rh-saas/docs/foundation/LIVE_TRACKING_MOBILE_VALIDATION.md`

Relatório de reteste final:

`/opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_RETEST_TUNNEL_20260704_174811.md`

## IDs finais registrados no painel mobile

Device ID:

`983229a2-a788-4f21-9abe-9e286688859c`

Point ID:

`4a6bba8f-79b7-4754-a5de-729e1bfbb311`

Status exibido no painel:

`Não informado no reteste final`

Erro detalhado exibido:

`Nenhum erro detalhado informado no reteste final`

## Histórico das fases

| Fase | Relatório |
|---|---|
| A1 Diagnostico | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A1_DIAGNOSTICO_20260704_165146.md |
| A2 Service | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A2_LIVE_TRACKING_SERVICE_20260704_165420.md |
| A3 Tela | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A3_LIVE_TRACKING_SCREEN_20260704_165609.md |
| A4 Navegacao | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A4_NAVIGATION_20260704_165750.md |
| A4 FIX3 | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A4_FIX3_DISABLED_COMMA_20260704_170414.md |
| A5 Diagnostico abertura | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_DIAG_ABERTURA_APP_20260704_171717.md |
| A5 Tunnel | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_FIX_TUNNEL_20260704_172515.md |
| A5 Login DIAG | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_LOGIN_DIAG_20260704_173404.md |
| A5 Login FIX | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_LOGIN_FIX_20260704_173549.md |
| A5 Location DIAG | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_LOCATION_DIAG_20260704_174447.md |
| A5 Location FIX UI | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_LOCATION_FIX_UI_20260704_174633.md |
| A5 RETEST final | /opt/rh-saas/docs/mobile/RELATORIO_MOBILE_A5_RETEST_TUNNEL_20260704_174811.md |

## Decisões técnicas

- O Live Tracking mobile foi validado inicialmente em modo manual.
- O envio é feito sob ação explícita do usuário.
- O app usa `expo-location` para capturar a localização atual.
- O app usa `AsyncStorage` para armazenar o token em `@LH_Token`.
- O app usa `AsyncStorage` para persistir o `@LH_LiveTrackingDeviceUid`.
- O login mobile foi ajustado para aceitar `access_token`, `accessToken`, `token` ou `jwt`.
- O app mobile não implementa background tracking nesta sprint.

## Endpoints utilizados

- `POST /v1/auth/login`
- `GET /v1/foundation/hr/employees`
- `POST /v1/foundation/live-tracking/device`
- `POST /v1/foundation/live-tracking/location`
- `GET /v1/foundation/live-tracking/latest`
- `GET /v1/foundation/live-tracking/points`

## Regras preservadas

- Nenhuma tabela foi criada.
- Nenhuma estrutura de banco foi alterada.
- Nenhum backend foi alterado nesta fase final.
- Nenhum background tracking foi implementado.
- A validação mobile foi manual e sob ação do usuário.

## Status

Integração mobile manual do Live Tracking concluída e documentada.

## Próximas recomendações

- Planejar background tracking em sprint futura, somente após definir política de intervalo, bateria e consentimento.
- Planejar integração com geofence.
- Planejar mapa operacional no frontend-web.
- Avaliar limpeza dos registros de diagnóstico quando não forem mais necessários.

