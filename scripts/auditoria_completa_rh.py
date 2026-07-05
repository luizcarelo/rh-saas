#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import subprocess
from pathlib import Path
from datetime import datetime

CONTAINER = "rh_saas_postgres"
DB_USER = "admin_rh_saas"
DB_NAME = "rh_saas_db"

BASE_DIR = Path("/opt/rh-saas/scripts")
RELATORIOS = BASE_DIR / "relatorios"

RELATORIOS.mkdir(
    parents=True,
    exist_ok=True
)

ARQ = RELATORIOS / (
    "auditoria_completa_rh_"
    + datetime.now().strftime("%Y%m%d_%H%M%S")
    + ".md"
)

linhas = []

def executar_sql(sql):

    cmd = (
        f'docker exec {CONTAINER} '
        f'psql -U {DB_USER} '
        f'-d {DB_NAME} '
        f'-At -F "|" '
        f'-c "{sql}"'
    )

    r = subprocess.run(
        cmd,
        shell=True,
        capture_output=True,
        text=True
    )

    return (
        r.returncode,
        r.stdout.strip(),
        r.stderr.strip()
    )

def secao(titulo):

    linhas.append("")
    linhas.append(f"# {titulo}")
    linhas.append("")

def subsecao(titulo):

    linhas.append("")
    linhas.append(f"## {titulo}")
    linhas.append("")

def adicionar(texto):

    linhas.append(str(texto))

linhas.append("# AUDITORIA COMPLETA RH SAAS")
linhas.append("")
linhas.append(
    datetime.now().strftime(
        "%d/%m/%Y %H:%M:%S"
    )
)

secao("INFORMACOES GERAIS")

adicionar(f"Container: {CONTAINER}")
adicionar(f"Banco: {DB_NAME}")
adicionar(f"Usuario: {DB_USER}")

subsecao("SCHEMAS")

rc, out, err = executar_sql("""
SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name
""")

if out:
    for row in out.splitlines():
        adicionar(f"- {row}")

subsecao("EXTENSIONS")

rc, out, err = executar_sql("""
SELECT extname
FROM pg_extension
ORDER BY extname
""")

if out:
    for row in out.splitlines():
        adicionar(f"- {row}")

subsecao("TABELAS PUBLIC")

rc, out, err = executar_sql("""
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public'
AND table_type='BASE TABLE'
ORDER BY table_name
""")

tabelas = []

if out:
    for row in out.splitlines():

        tabelas.append(row)
        adicionar(f"- {row}")

secao("CONTAGEM DE REGISTROS")

for tabela in tabelas:

    rc, out, err = executar_sql(
        f"SELECT COUNT(*) FROM {tabela}"
    )

    qtd = out if out else "0"

    adicionar(
        f"{tabela}: {qtd}"
    )

secao("ESTRUTURA RH")

rh_tables = [
    "employees",
    "hr_employee_profiles",
    "documents",
    "documents_foundation",
    "employee_schedules",
    "clock_events_foundation",
    "clock_policies",
    "time_bank",
    "time_bank_balances_foundation"
]

for tabela in rh_tables:

    if tabela not in tabelas:
        continue

    subsecao(tabela)

    rc, out, err = executar_sql(f"""
    SELECT
        column_name,
        data_type
    FROM information_schema.columns
    WHERE table_name='{tabela}'
    ORDER BY ordinal_position
    """)

    if out:

        for row in out.splitlines():

            partes = row.split("|")

            if len(partes) == 2:

                adicionar(
                    f"- {partes[0]} ({partes[1]})"
                )

secao("ANALISE TENANT E CLIENT")

for tabela in tabelas:

    rc, out, err = executar_sql(f"""
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name='{tabela}'
    """)

    colunas = out.lower()

    possui_tenant = (
        "tenant_id" in colunas
    )

    possui_client = (
        "client_id" in colunas
    )

    if possui_tenant or possui_client:

        adicionar("")
        adicionar(tabela)

        if possui_tenant:
            adicionar(" - tenant_id")

        if possui_client:
            adicionar(" - client_id")

secao("FOREIGN KEYS")

rc, out, err = executar_sql("""
SELECT
tc.table_name,
kcu.column_name,
ccu.table_name
FROM
information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
ON tc.constraint_name = ccu.constraint_name
WHERE tc.constraint_type='FOREIGN KEY'
ORDER BY tc.table_name
""")

if out:

    for row in out.splitlines():

        partes = row.split("|")

        if len(partes) >= 3:

            adicionar(
                f"{partes[0]}.{partes[1]} -> {partes[2]}"
            )

secao("VALIDACAO DE CONSOLIDACAO")

alvos = [
    "employees",
    "hr_employee_profiles",
    "documents",
    "documents_foundation",
    "time_bank",
    "time_bank_balances_foundation"
]

for tabela in alvos:

    if tabela in tabelas:

        adicionar(
            f"VALIDAR: {tabela}"
        )

with open(
    ARQ,
    "w",
    encoding="utf-8"
) as f:

    f.write("\n".join(linhas))

print("")
print("RELATORIO GERADO")
print(ARQ)
print("")