#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pathlib import Path
from datetime import datetime
import shutil

ROOT = Path("/opt/rh-saas")

DESTINO = ROOT / "backups" / "codigo"
RELATORIOS = DESTINO / "relatorios"

DESTINO.mkdir(parents=True, exist_ok=True)
RELATORIOS.mkdir(parents=True, exist_ok=True)

DATA = datetime.now().strftime("%Y%m%d_%H%M%S")

RELATORIO = RELATORIOS / (
    f"p6e2_backup_catalogo_{DATA}.md"
)

linhas = []

linhas.append("# P6E-2 INVENTARIO DE BACKUPS")
linhas.append("")
linhas.append(f"Data: {DATA}")
linhas.append("")

arquivos = list(
    ROOT.rglob("*.bak")
)

linhas.append(
    f"Total encontrado: {len(arquivos)}"
)
linhas.append("")

movidos = 0

for arq in arquivos:

    if str(arq).startswith(
        str(DESTINO)
    ):
        continue

    relativo = arq.relative_to(ROOT)

    if "frontend" in str(relativo):
        pasta = DESTINO / "frontend"
    else:
        pasta = DESTINO / "backend"

    pasta.mkdir(
        parents=True,
        exist_ok=True
    )

    destino = pasta / arq.name

    contador = 1

    while destino.exists():

        destino = (
            pasta /
            f"{arq.stem}_{contador}.bak"
        )

        contador += 1

    shutil.move(
        str(arq),
        str(destino)
    )

    movidos += 1

    linhas.append(
        f"{relativo} -> {destino}"
    )

with open(
    RELATORIO,
    "w",
    encoding="utf-8"
) as f:

    f.write(
        "\n".join(linhas)
    )

print("")
print("P6E-2 CONCLUIDO")
print(f"ARQUIVOS MOVIDOS: {movidos}")
print(f"RELATORIO: {RELATORIO}")
print("")
