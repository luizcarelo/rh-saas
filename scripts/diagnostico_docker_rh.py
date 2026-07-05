#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import subprocess
from datetime import datetime

BASE_DIR = "/opt/rh-saas/scripts"
RELATORIOS_DIR = os.path.join(BASE_DIR, "relatorios")

os.makedirs(RELATORIOS_DIR, exist_ok=True)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

relatorio = os.path.join(
    RELATORIOS_DIR,
    f"diagnostico_docker_{timestamp}.md"
)

linhas = []

linhas.append("# DIAGNOSTICO DOCKER RH SAAS")
linhas.append("")
linhas.append(
    f"Gerado em: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}"
)
linhas.append("")


def executar(comando):
    try:
        resultado = subprocess.run(
            comando,
            shell=True,
            capture_output=True,
            text=True
        )

        return (
            resultado.returncode,
            resultado.stdout.strip(),
            resultado.stderr.strip()
        )

    except Exception as e:
        return (999, "", str(e))


def adicionar_secao(titulo, comando):
    linhas.append(f"## {titulo}")
    linhas.append("")

    rc, out, err = executar(comando)

    linhas.append("```")
    linhas.append(f"$ {comando}")
    linhas.append("")

    if out:
        linhas.append(out)

    if err:
        linhas.append("")
        linhas.append("ERRO:")
        linhas.append(err)

    linhas.append("```")
    linhas.append("")


adicionar_secao(
    "DOCKER VERSION",
    "docker --version"
)

adicionar_secao(
    "DOCKER COMPOSE VERSION",
    "docker compose version"
)

adicionar_secao(
    "CONTAINERS",
    "docker ps -a"
)

adicionar_secao(
    "IMAGENS",
    "docker images"
)

adicionar_secao(
    "VOLUMES",
    "docker volume ls"
)

adicionar_secao(
    "NETWORKS",
    "docker network ls"
)

# Detecta possiveis containers PostgreSQL

rc, out, err = executar(
    "docker ps --format '{{.Names}} {{.Image}}'"
)

postgres_encontrados = []

if out:
    for linha in out.splitlines():

        l = linha.lower()

        if (
            "postgres" in l or
            "postgis" in l
        ):
            postgres_encontrados.append(
                linha.split()[0]
            )

linhas.append("## POSTGRES DETECTADO")
linhas.append("")

if postgres_encontrados:
    for nome in postgres_encontrados:
        linhas.append(f"- {nome}")
else:
    linhas.append("- nenhum encontrado")

linhas.append("")

for container in postgres_encontrados:

    adicionar_secao(
        f"INSPECT {container}",
        f"docker inspect {container}"
    )

with open(
    relatorio,
    "w",
    encoding="utf-8"
) as f:

    f.write("\n".join(linhas))

print("")
print("RELATORIO GERADO:")
print(relatorio)
print("")
