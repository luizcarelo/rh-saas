# CONTEXTO_PROJETO

## Visão Geral

Projeto: RH SaaS

Objetivo:

Plataforma SaaS multiempresa para gestão de RH com:

- Controle de ponto mobile
- Gestão de colaboradores
- Banco de horas
- Justificativas
- Documentos corporativos
- Holerites
- Geolocalização
- Geocercas
- Auditoria
- Módulo Super Admin
- Arquitetura Multi-Tenant

---

## Ambiente Atual

Servidor:

- Debian

Containers:

- rh_saas_api
- rh_saas_web
- rh_saas_postgres
- rh_saas_redis
- rh_saas_pgadmin

Tecnologias identificadas:

- NestJS
- PostgreSQL
- Redis
- Docker

---

## Regras do Projeto

Idioma oficial:

- PT-BR

Toda alteração deve:

- Atualizar CONTEXTO_PROJETO.md
- Atualizar CHANGELOG.md
- Atualizar DECISOES_TECNICAS.md
- Atualizar PENDENCIAS.md

Toda etapa deve possuir:

- Backup
- Manifesto
- Validação
- Rollback documental

---

## Cliente de Homologação

Slug:

empresa-teste

Nome Fantasia:

Empresa Teste RH SaaS

Razão Social:

SAAS RH PRO EMPRESA TESTE LTDA

Plano:

ENTERPRISE_TEST

Status:

ACTIVE

---

## Módulos Ativos

- PONTO_MOBILE
- DOCUMENTOS
- HOLERITES
- BANCO_HORAS
- JUSTIFICATIVAS
- TELEMETRIA
- MAPA
- SELFIE
- AFD_EXPORTACOES
- ASSINATURA_ELETRONICA
- SUPER_ADMIN_TESTE

---

## Estrutura RH

### Departamentos

- Administrativo
- Operacoes
- Tecnologia

### Centros de Custo

- ADM
- Administrativo

- OPS
- Operacoes

- TEC
- Tecnologia

### Cargos

- Analista Administrativo
- Assistente de RH
- Desenvolvedor
- Gestor de Operacoes
- Tecnico Externo

### Funções

- Administrativo Padrao
- Gestor
- Plantonista
- Tecnico Externo

---

## Local de Trabalho

Nome:

Matriz Empresa Teste

Cidade:

Rio de Janeiro

UF:

RJ

---

## Geocerca

Nome:

Geocerca Matriz Empresa Teste

Raio:

150 metros

---

## Colaboradores de Teste

### TESTE-001

Nome:

Ana Colaboradora Teste

### TESTE-002

Nome:

Bruno Tecnico Teste

### TESTE-003

Nome:

Carla Dev Teste

Status:

ACTIVE

---

## Controle de Ponto

### Tipos de Batida

Quantidade:

18

Incluindo:

- Entrada
- Saida
- Inicio de Intervalo
- Fim de Intervalo
- Hora Extra
- Visita Externa
- Sobreaviso
- Plantao
- Pausa Tecnica
- Saida Particular
- Viagem

### Política Mobile

Nome:

Politica Mobile Padrao

Configuração:

- GPS obrigatório
- Precisão mínima: 30m
- Offline permitido
- Limite offline: 48h
- Geocerca opcional
- Selfie opcional
- Telemetria desabilitada

---

## Documentos

Documento de teste:

Termo de Ciencia de Ponto Mobile - Teste

Status:

PUBLISHED

Destinatários:

- TESTE-001
- TESTE-002
- TESTE-003

---

## Holerites

Documento criado:

Holerite Ficticio Julho/2026

---

## Banco de Horas

Saldo inicial:

- Ana: +120 minutos
- Bruno: 0 minutos
- Carla: -45 minutos

---

## Justificativas

Criada:

Tipo:

PROBLEMA_GPS

Status:

PENDING

---

## Normalização Aplicada

Fase 1.4

Padronização operacional sem acentos:

- Operacoes
- Tecnico Externo
- Gestor de Operacoes
- Administrativo Padrao

Motivo:

Evitar duplicidades e inconsistências em scripts, integrações e banco de dados.

---

## Status Atual do Projeto

Fase 1:

CONCLUÍDA E VALIDADA

Próxima fase:

Fase 2.1 — Diagnóstico do Backend Atual

---

## Itens Ainda Não Definidos

### Autenticação Super Admin

A definir

### RBAC

A definir

### Observabilidade

A definir

### Monitoramento

A definir

### Backup Automatizado

A definir

### Disaster Recovery

A definir


## Fase 2.2B

Correção do módulo Super Admin.

Motivo:

Arquivos gerados continham caracteres inválidos '\n'
gravados literalmente pelo gerador inicial.

