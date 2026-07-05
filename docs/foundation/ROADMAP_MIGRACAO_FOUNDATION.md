# Roadmap de Migracao Foundation

## Objetivo

Consolidar o plano de evolucao do RH SaaS para usar a Foundation como arquitetura-alvo, mantendo a migracao gradual, segura e documentada.

## Arquitetura alvo

Frontend -> NestJS -> Foundation PostgreSQL

A Foundation passa a ser a base principal para os modulos corporativos do sistema.

## Estado atual validado

As seguintes areas ja foram integradas ao NestJS em modo read-only:

- Foundation base, HR, Geofence, Mobile e Tracking
- Clock Foundation
- Documents Foundation
- TimeBank Foundation
- Payroll Foundation

Todas as integracoes acima foram criadas sem criar tabelas novas e sem alterar dados de negocio.

## Principio de migracao

- Nao criar tabelas paralelas para recursos ja existentes na Foundation.
- Criar primeiro leitura read-only.
- Validar endpoints com JWT.
- Documentar a decisao tecnica.
- Planejar migracao funcional antes de aposentar qualquer modulo legado.
- Manter rollback e backups em cada etapa.

## Mapa Legacy para Foundation

| Modulo legado | Foundation equivalente | Status atual | Direcao recomendada |
|---|---|---|---|
| employees | hr_employee_profiles | Read-only Foundation validado | Planejar migracao gradual |
| time-records | clock_events_foundation | Clock read-only validado | Planejar nova camada de ponto Foundation |
| time-bank | time_bank_balances_foundation | TimeBank read-only validado | Planejar substituicao gradual |
| documents | documents_foundation e document_recipients_foundation | Documents read-only validado | Planejar fluxo Foundation |
| holerites/payroll | payslips_foundation | Payroll read-only validado | Evoluir modulo de holerites Foundation |
| live tracking antigo/proposto | location_tracking_points e mobile_devices | Tracking read-only validado | Retomar Live Tracking sobre Foundation |
| geofence proposto | hr_geofences e hr_work_locations | Geofence read-only validado | Usar Foundation |

## Prioridades recomendadas

### Prioridade 1 - Live Tracking sobre Foundation

Objetivo:

- Usar location_tracking_points como tabela oficial de pontos GPS.
- Usar mobile_devices como base de dispositivos moveis.
- Usar mobile_app_settings para regras do aplicativo.
- Usar hr_geofences e hr_work_locations para validacao geografica.
- Evitar criar employee_locations e employee_device_status.

Entregas sugeridas:

- DTOs de entrada para localizacao mobile.
- Endpoint POST de rastreamento.
- Endpoint GET de mapa operacional.
- Validacao por employee_profile_id.
- Integracao futura com politicas de ponto.

### Prioridade 2 - Ponto Foundation

Objetivo:

- Planejar substituicao gradual de time_records por clock_events_foundation.
- Preservar o modulo legado ate equivalencia funcional validada.
- Usar clock_event_types para tipos de batida.
- Usar clock_policies para regras de GPS, geofence, selfie e offline.

Entregas sugeridas:

- Service de registro de evento Foundation.
- Endpoint de batida baseado em clock_events_foundation.
- Validacao de politica ativa por client_id.
- Plano de compatibilidade com time_records.

### Prioridade 3 - Documentos Foundation

Objetivo:

- Evoluir documents_foundation como base oficial de documentos.
- Usar document_recipients_foundation para ciencia, assinatura e evidencias.
- Manter documents legado ate migracao validada.

### Prioridade 4 - Banco de Horas Foundation

Objetivo:

- Evoluir time_bank_balances_foundation como base do saldo de banco de horas.
- Planejar conciliacao com clock_events_foundation.

### Prioridade 5 - Payroll Foundation

Objetivo:

- Evoluir payslips_foundation para holerites, contracheques e comprovantes.
- Planejar visualizacao por colaborador.
- Planejar ciencia do colaborador.

## Fases recomendadas

### Fase M1 - Consolidacao read-only

Status: concluida para as principais areas Foundation.

Inclui:

- HR, Geofence, Mobile e Tracking
- Clock
- Documents
- TimeBank
- Payroll

### Fase M2 - Live Tracking Foundation

Criar endpoints de escrita controlada para rastreamento GPS usando tabelas Foundation.

Tabelas envolvidas:

- location_tracking_points
- mobile_devices
- mobile_app_settings
- hr_geofences
- hr_employee_profiles

### Fase M3 - Ponto Foundation

Criar fluxo de ponto usando clock_events_foundation.

Tabelas envolvidas:

- clock_events_foundation
- clock_event_types
- clock_policies
- clock_policy_event_types
- clock_justifications_foundation

### Fase M4 - Migracao funcional dos legados

Planejar substituicao gradual de:

- employees
- time_records
- documents
- time_bank

Nenhuma tabela legada deve ser removida antes de existir equivalencia funcional validada.

## Riscos

- Duplicidade entre modulos legados e Foundation.
- Frontend consumir dados legados enquanto backend novo consome Foundation.
- Regras de tenant/client inconsistentes.
- Falta de plano de rollback em migracoes futuras.

## Regras obrigatorias para proximas sprints

- Antes de criar nova tabela, verificar se ja existe equivalente na Foundation.
- Toda nova integracao deve ter backup, build, validacao e documentacao.
- Toda alteracao deve atualizar CONTEXTO_PROJETO.md, CHANGELOG.md, DECISOES_TECNICAS.md e PENDENCIAS.md.
- Endpoints novos devem ser validados com JWT.
- Alteracoes destrutivas devem ser evitadas enquanto o sistema nao estiver plenamente homologado.

## Proxima sprint recomendada

Retomar Live Tracking usando Foundation.

Nome sugerido:

Sprint 4.6B-F - Live Tracking Foundation

Objetivo:

Implementar rastreamento GPS usando location_tracking_points, mobile_devices, mobile_app_settings, hr_geofences e hr_employee_profiles.

