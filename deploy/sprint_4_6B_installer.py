#!/usr/bin/env python3

import os
import shutil
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path("/opt/rh-saas/backend")

BACKUP_DIR = PROJECT_ROOT / "backup" / "sprint_4_6B"
MODULE_DIR = PROJECT_ROOT / "src/modules/live-tracking"
ENTITIES_DIR = MODULE_DIR / "entities"
DTO_DIR = MODULE_DIR / "dto"

SQL_DIR = PROJECT_ROOT / "database"
SQL_FILE = SQL_DIR / "001_live_tracking.sql"


def log(msg):
    print(f"[Sprint 4.6B] {msg}")


def ensure_project():
    app_module = PROJECT_ROOT / "src/app.module.ts"

    if not app_module.exists():
        raise Exception(
            f"Projeto não encontrado: {app_module}"
        )

    log("Projeto validado")


def create_backup():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    backup_path = BACKUP_DIR / timestamp

    backup_path.mkdir(
        parents=True,
        exist_ok=True,
    )

    app_module = PROJECT_ROOT / "src/app.module.ts"

    shutil.copy2(
        app_module,
        backup_path / "app.module.ts.bkp",
    )

    log(f"Backup criado em {backup_path}")


def create_directories():
    ENTITIES_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    DTO_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    SQL_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    log("Estrutura criada")


def create_sql():
    sql = """
-- ==========================================
-- SPRINT 4.6B
-- LIVE TRACKING
-- ==========================================

CREATE TABLE IF NOT EXISTS employee_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tenant_id UUID NOT NULL,
    employee_id UUID NOT NULL,

    latitude NUMERIC(10,7) NOT NULL,
    longitude NUMERIC(10,7) NOT NULL,

    accuracy NUMERIC(10,2),
    speed NUMERIC(10,2),

    captured_at TIMESTAMP NOT NULL DEFAULT NOW(),

    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employee_locations_tenant
ON employee_locations (tenant_id);

CREATE INDEX IF NOT EXISTS idx_employee_locations_employee
ON employee_locations (employee_id);

CREATE INDEX IF NOT EXISTS idx_employee_locations_captured
ON employee_locations (captured_at);

CREATE TABLE IF NOT EXISTS employee_device_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tenant_id UUID NOT NULL,
    employee_id UUID NOT NULL,

    battery_level INTEGER DEFAULT 0,

    is_charging BOOLEAN DEFAULT FALSE,

    network_type VARCHAR(20),

    wifi_name VARCHAR(255),

    online BOOLEAN DEFAULT TRUE,

    last_seen TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_device_status_employee
ON employee_device_status (employee_id);

CREATE INDEX IF NOT EXISTS idx_device_status_online
ON employee_device_status (online);
"""

    SQL_FILE.write_text(
        sql.strip() + "\n",
        encoding="utf-8",
    )

    log(f"SQL criado: {SQL_FILE}")


def prepare_documentation():
    docs = [
        "CONTEXTO_PROJETO.md",
        "CHANGELOG.md",
        "DECISOES_TECNICAS.md",
        "PENDENCIAS.md",
    ]

    for doc in docs:
        path = PROJECT_ROOT / doc

        if not path.exists():
            path.write_text(
                f"# {doc}\n",
                encoding="utf-8",
            )

    log("Documentação preparada")


def main():
    log("Iniciando Sprint 4.6B")

    ensure_project()

    create_backup()

    create_directories()

    create_sql()

    prepare_documentation()

    log("PARTE 1 concluída com sucesso")


if __name__ == "__main__":
    main()
