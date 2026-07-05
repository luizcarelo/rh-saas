# Sprint 4.6B-F-Mobile-A2 - Service Live Tracking

Data: 20260704_165420

## Status

Service Live Tracking mobile criado com sucesso.

## Arquivo criado

- /opt/rh-saas/mobile-app/src/services/liveTrackingApi.ts

## Funcoes criadas

- getOrCreateMobileDeviceUid
- getFoundationEmployees
- registerLiveTrackingDevice
- sendLiveTrackingLocation
- getLiveTrackingPoints
- getLatestLiveTrackingPoints

## Padrao adotado

- Reutiliza src/services/api.ts.
- Reutiliza Axios ja configurado.
- Reutiliza interceptor JWT com @LH_Token.
- Usa AsyncStorage para persistir @LH_LiveTrackingDeviceUid.

## Backup

/opt/rh-saas/backups/sprint_4_6B_F_mobile_A2_live_tracking_service_20260704_165420

## Regras

- Nenhuma tela foi criada.
- Nenhuma navegacao foi alterada.
- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhum pacote foi instalado.
- Nenhum build foi executado.
- Nenhum background tracking foi implementado.

## Proximo passo

Mobile-A3: criar tela manual de validacao Live Tracking no app.
