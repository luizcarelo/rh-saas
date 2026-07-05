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
