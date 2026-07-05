# Live Tracking Mobile Validation

## Sprint 4.6B-F-Mobile-A5-RETEST

Data: 20260704_174811

## Objetivo

Registrar o reteste funcional do Live Tracking no app mobile após instrumentação visual do envio.

## Expo Tunnel

```text
exp://lqbnkre-luizcarelo-8083.exp.direct
```

## Validacao TypeScript

```text
TSC_OK
/opt/rh-saas/docs/mobile/VALIDACAO_MOBILE_A5_RETEST_TSC_20260704_174811.log
```

## Checklist funcional informado

| Item | Resultado |
|---|---|
| Expo Tunnel abriu e exibiu QR Code | OK |
| App abriu no Expo Go pelo QR Code | OK |
| Login funcionou | OK |
| HomeScreen abriu corretamente | OK |
| Botao Live Tracking apareceu | OK |
| Tela Live Tracking abriu | OK |
| Colaboradores Foundation carregaram | OK |
| Foi possivel selecionar colaborador | OK |
| Dispositivo mobile foi registrado | OK |
| Permissao de localizacao foi solicitada | OK |
| Localizacao atual foi capturada | OK |
| Painel mostrou LOCATION_SENT | OK |
| Painel mostrou Device ID | OK |
| Painel mostrou Point ID | OK |
| Painel mostrou erro detalhado | OK |
| Ultimas localizacoes atualizaram no app | OK |
| Ponto apareceu no frontend-web Live Tracking | OK |

## Dados exibidos no painel

Device ID:

```text
983229a2-a788-4f21-9abe-9e286688859c
```

Point ID:

```text
4a6bba8f-79b7-4754-a5de-729e1bfbb311
```

Status:

```text

```

Erro detalhado:

```text

```

## Observacoes

```text

```

## Escopo validado

- mobile-app
- Expo Tunnel
- Expo Go
- LoginScreen
- HomeScreen
- LiveTrackingScreen
- Painel Diagnóstico do envio
- Service liveTrackingApi
- API Foundation Live Tracking

## Endpoints envolvidos

- POST /v1/auth/login
- GET /v1/foundation/hr/employees
- POST /v1/foundation/live-tracking/device
- POST /v1/foundation/live-tracking/location
- GET /v1/foundation/live-tracking/latest

## Regras

- Nenhum backend foi alterado nesta fase.
- Nenhum banco foi alterado nesta fase.
- Nenhum pacote foi instalado nesta fase.
- Nenhum codigo mobile foi alterado nesta fase.
- Nenhum background tracking foi implementado nesta fase.
- A validacao foi manual e sob acao do usuario.

## Proximas recomendacoes

- Se todos os itens estiverem OK, considerar a validacao mobile manual concluida.
- Se o painel exibir erro, usar o erro detalhado como base para correcao.
- Planejar background tracking somente em sprint futura.
