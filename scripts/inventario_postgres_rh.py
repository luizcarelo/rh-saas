#!/usr/bin/env python3

import subprocess
from datetime import datetime
from pathlib import Path

CONTAINER = "rh_saas_postgres"

RELATORIOS = Path(
    "/opt/rh-saas/scripts/relatorios"
)

RELATORIOS.mkdir(
    parents=True,
    exist_ok=True
)

ARQ = RELATORIOS / (
    "inventario_postgres_"
    + datetime.now().strftime("%Y%m%d_%H%M%S")
    + ".md"
)

linhas = []


def executar(cmd):

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


def secao(titulo, comando):

    linhas.append(f"## {titulo}")
    linhas.append("")

    rc, out, err = executar(comando)

    linhas.append("```")
    linhas.append(comando)
    linhas.append("")

    if out:
        linhas.append(out)

    if err:
        linhas.append("")
        linhas.append("ERRO:")
        linhas.append(err)

    linhas.append("```")
    linhas.append("")


linhas.append("# INVENTARIO POSTGRES RH SAAS")
linhas.append("")
linhas.append(
    datetime.now().strftime(
        "%d/%m/%Y %H:%M:%S"
    )
)
linhas.append("")

secao(
    "USUARIOS",
    f"docker exec {CONTAINER} "
    "psql -U postgres -l"
)

secao(
    "DATABASES",
    f"docker exec {CONTAINER} "
    "psql -U postgres -At "
    "-c \"SELECT datname "
    "FROM pg_database "
    "ORDER BY datname\""
)

secao(
    "ROLES",
    f"docker exec {CONTAINER} "
    "psql -U postgres -At "
    "-c \"SELECT rolname "
    "FROM pg_roles "
    "ORDER BY rolname\""
)

secao(
    "EXTENSIONS",
    f"docker exec {CONTAINER} "
    "psql -U postgres -At "
    "-c \"SELECT extname "
    "FROM pg_extension "
    "ORDER BY extname\""
)

with open(
    ARQ,
    "w",
    encoding="utf-8"
) as f:

    f.write("\n".join(linhas))

print("")
print("RELATORIO:")
print(ARQ)
print("")
