# DECISOES_TECNICAS

## DT-001

Idioma oficial:

PT-BR

---

## DT-002

Toda implementação deve ser dividida em fases pequenas.

Objetivos:

- Menor risco
- Melhor rollback
- Auditoria simplificada

---

## DT-003

Toda fase deve gerar:

- Backup
- Manifesto
- Relatório de validação
- Rollback documental

---

## DT-004

Tabela oficial de controle de versões:

rh_saas_schema_migrations

---

## DT-005

Cliente oficial de homologação:

empresa-teste

Plano:

ENTERPRISE_TEST

---

## DT-006

Nomes operacionais serão mantidos sem acentuação.

Exemplos:

- Operacoes
- Tecnico Externo
- Gestor de Operacoes
- Administrativo Padrao

Motivo:

Evitar inconsistências entre:

- Banco
- Scripts
- APIs
- Integrações
- Ambientes Linux

---

## DT-007

Toda alteração futura deve atualizar:

- CONTEXTO_PROJETO.md
- CHANGELOG.md
- DECISOES_TECNICAS.md
- PENDENCIAS.md

Obrigatoriamente.

---

## DT-008

Antes de qualquer alteração relevante:

1. Apresentar proposta.
2. Aguardar aprovação.
3. Executar.
4. Atualizar documentação.

---

## DT-009

Scripts devem ser fornecidos completos sempre que possível.

Motivo:

Evitar problemas de copiar/colar e erros manuais.

---

## DT-010

A Fase 1 é considerada congelada.

Novas alterações devem ocorrer em novas fases documentadas.


## DT-015

Scripts geradores de código devem ser validados por build antes da conclusão da fase.

Motivo:

Evitar publicação de arquivos inválidos.

## DT-016

Toda funcionalidade backend deve ser validada dentro do container após publicação.

Motivo:

Build local não garante atualização da imagem em execução.
