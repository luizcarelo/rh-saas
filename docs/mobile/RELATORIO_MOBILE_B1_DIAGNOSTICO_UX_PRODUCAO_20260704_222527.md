# Sprint Mobile-B1 - Diagnóstico UX/produção do mobile-app

Data: 20260704_222527

## Status

Diagnóstico UX/produção concluído.

## Checks

| Check | Resultado |
|---|---|
| TypeScript | TSC_OK |
| npm ls --depth=0 | NPM_LS_OK |
| Expo config | EXPO_CONFIG_OK |
| API base | URL_FIXA |
| Uso de EXPO_PUBLIC_API_URL em api.ts | NAO_USA_EXPO_PUBLIC_API_URL_NO_API_TS |
| Login token | TRATA_ACCESS_TOKEN |
| Navegação Live Tracking | LIVE_TRACKING_REGISTRADO |
| Painel diagnóstico Live Tracking | PAINEL_DIAGNOSTICO_ATIVO |
| Versão app.json | 1.0.0 |
| Plugin expo-location | EXPO_LOCATION_PLUGIN_OK |

## Arquivos gerados

Diagnóstico bruto:

```text
/opt/rh-saas/docs/mobile/MOBILE_B1_DIAGNOSTICO_UX_PRODUCAO_RAW_20260704_222527.txt
```

Recomendações:

```text
/opt/rh-saas/docs/mobile/MOBILE_B1_RECOMENDACOES_20260704_222527.md
```

TypeScript log:

```text
/opt/rh-saas/docs/mobile/MOBILE_B1_TSC_20260704_222527.log
```

npm ls log:

```text
/opt/rh-saas/docs/mobile/MOBILE_B1_NPM_LS_20260704_222527.log
```

Expo config log:

```text
/opt/rh-saas/docs/mobile/MOBILE_B1_EXPO_CONFIG_20260704_222527.log
```

## Backup documental

```text
/opt/rh-saas/backups/sprint_mobile_B1_diagnostico_ux_producao_20260704_222527
```

## Recomendações principais

1. Configurar `src/services/api.ts` para usar `EXPO_PUBLIC_API_URL`.
2. Melhorar UX e tratamento de erros no LoginScreen.
3. Melhorar organização da HomeScreen.
4. Simplificar LiveTrackingScreen para produção, mantendo diagnóstico apenas para homologação.
5. Planejar build/distribuição depois da estabilização UX.

## Regras

- Nenhum código mobile foi alterado.
- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhum pacote foi instalado.
- Nenhum build foi executado.
- Nenhum background tracking foi implementado.

## Próximo passo recomendado

Mobile-B2 — Configurar API por EXPO_PUBLIC_API_URL e melhorar tratamento de erro no LoginScreen.
