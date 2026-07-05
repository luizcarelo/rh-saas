# Sprint Mobile-B2-A - API por EXPO_PUBLIC_API_URL e Login UX

Data: 20260704_222706

## Status

TSC_OK

## Objetivo

Configurar o app mobile para usar EXPO_PUBLIC_API_URL e melhorar as mensagens de erro do LoginScreen.

## Arquivos alterados

- /opt/rh-saas/mobile-app/src/services/api.ts
- /opt/rh-saas/mobile-app/src/screens/LoginScreen.tsx

## Alteracoes aplicadas

### api.ts

- Criado API_BASE_URL usando:
  - process.env.EXPO_PUBLIC_API_URL
  - fallback: https://rh.lhsolucao.com.br
- Removida dependência exclusiva de URL fixa no axios.create.
- Mantido interceptor JWT com AsyncStorage @LH_Token.

### LoginScreen.tsx

- Adicionado getLoginErrorMessage.
- Diferenciado:
  - credenciais inválidas;
  - API indisponível;
  - erro de rede;
  - token não retornado;
  - mensagem retornada pela API.
- Mantido suporte a:
  - access_token;
  - accessToken;
  - token;
  - jwt.

## Validação TypeScript

```text
TSC_OK
/opt/rh-saas/docs/mobile/VALIDACAO_MOBILE_B2_A_TSC_20260704_222706.log
```

## Backup

```text
/opt/rh-saas/backups/sprint_mobile_B2_A_api_env_login_ux_20260704_222706
```

## Regras

- Nenhum backend foi alterado.
- Nenhum banco foi alterado.
- Nenhum pacote foi instalado.
- Nenhum HomeScreen foi alterado.
- Nenhum LiveTrackingScreen foi alterado.
- Nenhum background tracking foi implementado.

## Proximo passo recomendado

Revalidar login no Expo Go e seguir para Mobile-B3 — melhoria da HomeScreen.
