# Sprint 4.6B-F-Mobile-A5-DIAG - Diagnostico abertura app

Data: 20260704_171717

## Status geral

Diagnostico concluido.

## Resultado dos checks

| Check | Status |
|---|---|
| npm ls --depth=0 | NPM_LS_OK |
| TypeScript | TSC_OK |
| Expo version | EXPO_VERSION_OK |
| Expo config | EXPO_CONFIG_OK |
| Expo start limitado | EXPO_START_ERRO_1 |

## Logs gerados

Diagnostico estatico:

```text
/opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_STATIC_20260704_171717.txt
```

npm ls:

```text
/opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_NPM_LS_20260704_171717.log
```

TypeScript:

```text
/opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_TSC_20260704_171717.log
```

Expo version:

```text
/opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_EXPO_VERSION_20260704_171717.log
```

Expo config:

```text
/opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_EXPO_CONFIG_20260704_171717.log
```

Expo start:

```text
/opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_EXPO_START_20260704_171717.log
```

## Backup documental

```text
/opt/rh-saas/backups/sprint_4_6B_F_mobile_A5_diag_20260704_171717
```

## Regras

- Nenhum codigo mobile foi alterado.
- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhum pacote foi instalado.
- Nenhum background tracking foi implementado.

## Proximo passo

Analisar os logs, principalmente:

```bash
tail -160 /opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_EXPO_START_20260704_171717.log
tail -120 /opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_TSC_20260704_171717.log
tail -120 /opt/rh-saas/docs/mobile/MOBILE_A5_DIAG_NPM_LS_20260704_171717.log
```
