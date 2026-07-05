# Mobile-B3-A — Plano funcional para app profissional

Data: 20260704_224142

## Status técnico atual

| Item | Status |
|---|---|
| TypeScript | TSC_OK |
| npm ls | NPM_LS_OK |
| Login trata access_token | SIM |
| API usa EXPO_PUBLIC_API_URL | SIM |
| Home registra ponto simples | SIM |
| Live Tracking mobile | SIM |
| Reverse geocode/endereço atual | NAO |
| Upload de documentos no mobile | NAO |
| Fila offline/sincronização no mobile | NAO |
| UI de versão/notas | SIM |
| Backend documentos detectado | SIM |
| Backend ponto detectado | SIM |
| Backend Live Tracking detectado | SIM |

## Objetivo do app profissional

Transformar a tela principal em painel operacional do funcionário, incluindo:

- saudação por horário;
- identidade visual alinhada ao web/logo;
- endereço atual formatado;
- batidas principais e tipos avançados;
- avisos e pendências;
- documentos para assinatura;
- envio de justificativas/documentos;
- indicador offline e fila de envio;
- notas de versão e atualização;
- Live Tracking manual já validado.

## Módulos funcionais recomendados

### 1. Home profissional do funcionário

Componentes propostos:

- Cabeçalho com logo e saudação: "Bom dia, Fulano".
- Card de data/hora.
- Card de endereço atual: "Rua XXX, XX, Bairro, Cidade, UF - CEP".
- Card de status: online/offline, GPS, API.
- Ações principais:
  - Entrada;
  - Início de Intervalo;
  - Fim de Intervalo;
  - Saída;
  - Outras batidas;
  - Live Tracking;
  - Documentos/Justificativas.

### 2. Catálogo oficial de batidas

Criar catálogo local inicial com:

- Entrada;
- Saída;
- Início de Intervalo;
- Fim de Intervalo;
- Início de Hora Extra;
- Fim de Hora Extra;
- Saída para Visita Externa;
- Retorno de Visita Externa;
- Início de Sobreaviso;
- Fim de Sobreaviso;
- Início de Plantão;
- Fim de Plantão;
- Pausa Técnica;
- Retorno da Pausa Técnica;
- Saída Particular;
- Retorno de Saída Particular;
- Início de Viagem;
- Fim de Viagem.

### 3. Regras por funcionário

Preparar arquitetura para que o backend futuramente informe quais batidas estão disponíveis para cada funcionário.

Primeira etapa recomendada:

- catálogo local;
- agrupamento por categoria;
- seleção visual;
- campo de tipo no payload somente após confirmar contrato backend.

### 4. Documentos e justificativas

Fluxo desejado:

- atestado médico;
- declaração de comparecimento;
- justificativa de falta;
- outros documentos;
- envio para avaliação no admin web;
- status: pendente, aceito, recusado.

### 5. Offline-first

Fluxo desejado:

- aviso visual offline;
- contagem de batidas pendentes;
- contagem de documentos pendentes;
- fila local em AsyncStorage;
- sincronização posterior;
- controle de duplicidade.

### 6. Versão e atualização

Fluxo desejado:

- versão atual do app;
- notas da versão;
- ambiente/API conectado;
- botão "Verificar atualização";
- futura integração com endpoint de versão.

## Fases pequenas recomendadas

1. Mobile-B3-B — Criar catálogo oficial de tipos de batida.
2. Mobile-B3-C — Nova HomeScreen visual/profissional.
3. Mobile-B3-D — Endereço atual formatado com reverse geocode.
4. Mobile-B3-E — Seleção de tipo de batida antes do envio.
5. Mobile-B3-F — Cards de avisos/documentos/pendências.
6. Mobile-B3-G — Envio de justificativas/documentos.
7. Mobile-B3-H — Fila offline e indicador de pendências.
8. Mobile-B3-I — Notas de versão e atualização.
9. Mobile-B3-J — Validação final da Home profissional.

## Recomendação imediata

Começar por:

`Mobile-B3-B — Criar catálogo oficial de tipos de batida`

Motivo:

- baixo risco;
- não altera backend;
- prepara a HomeScreen;
- formaliza os tipos definidos pelo usuário;
- facilita regras por funcionário em fases posteriores.
