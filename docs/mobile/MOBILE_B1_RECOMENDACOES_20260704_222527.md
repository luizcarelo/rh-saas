# Recomendações Mobile-B1 - UX/Produção

Data: 20260704_222527

## Resumo dos checks

| Item | Resultado |
|---|---|
| TypeScript | TSC_OK |
| npm ls | NPM_LS_OK |
| Expo config | EXPO_CONFIG_OK |
| API base | URL_FIXA |
| Uso de EXPO_PUBLIC_API_URL em api.ts | NAO_USA_EXPO_PUBLIC_API_URL_NO_API_TS |
| Login token | TRATA_ACCESS_TOKEN |
| Navegação Live Tracking | LIVE_TRACKING_REGISTRADO |
| Painel diagnóstico Live Tracking | PAINEL_DIAGNOSTICO_ATIVO |
| Versão app.json | 1.0.0 |
| Plugin expo-location | EXPO_LOCATION_PLUGIN_OK |

## Recomendações priorizadas

### Prioridade 1 — Configuração de API para produção

- Alterar `src/services/api.ts` para usar `process.env.EXPO_PUBLIC_API_URL` com fallback seguro.
- Evitar URL fixa diretamente no código.
- Manter `.env` como fonte da API.

### Prioridade 2 — UX de Login

- Melhorar mensagens para diferenciar credenciais inválidas, erro de rede e API indisponível.
- Exibir feedback de carregamento mais claro.
- Manter tratamento de `access_token`, `accessToken`, `token` e `jwt`.

### Prioridade 3 — HomeScreen

- Separar visualmente ações: Registrar Ponto e Live Tracking.
- Exibir usuário conectado ou e-mail.
- Exibir status simples de conexão/API.
- Melhorar espaçamento para telas menores.

### Prioridade 4 — LiveTrackingScreen

- Separar modo usuário e modo diagnóstico.
- Reduzir informações técnicas na visão principal.
- Exibir último envio com data/hora, status e coordenadas.
- Manter painel diagnóstico para homologação, mas permitir recolher/remover futuramente.

### Prioridade 5 — Preparação para produção

- Revisar versão do app em `app.json`.
- Revisar nome, ícone e splash.
- Planejar `eas build` ou build de distribuição.
- Definir política antes de background tracking:
  - consentimento;
  - intervalo de envio;
  - impacto de bateria;
  - horários permitidos;
  - geofence;
  - LGPD.

## Próxima fase sugerida

`Mobile-B2 — Configurar API por EXPO_PUBLIC_API_URL e melhorar tratamento de erro no LoginScreen`
