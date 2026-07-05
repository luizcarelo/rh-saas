# Frontend-B1 — Plano inicial do terreno preparado

Data: 20260704_231234

## Status técnico atual

| Item | Status |
|---|---|
| TypeScript | TSC_OK |
| npm ls | NPM_LS_OK |
| AdminLayout detectado | SIM |
| Live Tracking detectado | SIM |
| Indícios de documentos/assinaturas | SIM |
| Indícios de ponto/batidas | SIM |
| Indícios de mobile/offline/sync | SIM |
| Indícios de versão/notas | SIM |
| Uso de variáveis de ambiente/API | SIM |

## Objetivo da próxima frente frontend

Preparar o frontend-web para módulos ainda em definição, sem quebrar o que já funciona.

## Módulos candidatos para terreno preparado

### 1. Ponto e tipos de batida

Tela futura para acompanhar:

- batidas por tipo;
- eventos do mobile;
- inconsistências;
- ajustes/justificativas;
- integração com punchType validado no backend.

### 2. Live Tracking operacional

Evoluir de tela foundation validada para:

- mapa operacional;
- últimas localizações;
- filtros por colaborador;
- histórico por período;
- status do dispositivo.

### 3. Documentos e justificativas

Preparar área para:

- atestados enviados pelo app;
- declarações de comparecimento;
- documentos pendentes de análise;
- aceite/recusa por admin web;
- trilha de auditoria.

### 4. Assinaturas

Preparar área para:

- documentos aguardando assinatura;
- status de assinatura;
- histórico de assinatura;
- vínculo com colaborador.

### 5. Mobile Sync / Offline

Preparar área para:

- batidas pendentes de sincronização;
- documentos pendentes;
- dispositivos ativos;
- última sincronização;
- erros de envio do app.

### 6. Versão do app

Preparar área para:

- versão mobile atual;
- notas da versão;
- avisos de atualização;
- controle futuro por tenant.

## Fases recomendadas

1. Frontend-B2 — Mapa de módulos e navegação futura.
2. Frontend-B3 — Criar páginas placeholder profissionais.
3. Frontend-B4 — Consolidar menu administrativo.
4. Frontend-B5 — Painel de pendências operacionais.
5. Frontend-B6 — Validação e documentação final.

## Recomendação imediata

Começar por:

`Frontend-B2 — Mapa de módulos e navegação futura`

Motivo:

- baixo risco;
- não altera comportamento;
- ajuda a organizar rotas, menus e páginas antes de implementar módulos finais;
- reduz retrabalho em áreas ainda indefinidas.
