-- BPAC Enterprise Governance Schema
-- Version: 1.0.0
-- Target: PostgreSQL

CREATE TABLE IF NOT EXISTS tenants (
    tenant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS policies (
    policy_id VARCHAR(100) PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(tenant_id),
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    definition JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS resource_assignments (
    assignment_id BIGSERIAL PRIMARY KEY,
    resource_id TEXT NOT NULL,
    policy_id VARCHAR(100) REFERENCES policies(policy_id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    assigned_by VARCHAR(255),
    UNIQUE(resource_id, policy_id)
);

CREATE TABLE IF NOT EXISTS compliance_findings (
    finding_id BIGSERIAL PRIMARY KEY,
    resource_id TEXT NOT NULL,
    policy_id VARCHAR(100) REFERENCES policies(policy_id),
    status VARCHAR(50) NOT NULL, -- COMPLIANT, DRIFTED, STOPPED
    details JSONB,
    last_detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS approvals (
    approval_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    change_type VARCHAR(100), -- POLICY_UPDATE, EXCEPTION_REQUEST
    requested_by VARCHAR(255),
    approved_by VARCHAR(255),
    status VARCHAR(50) DEFAULT 'PENDING',
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS audit_logs (
    log_id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    action TEXT NOT NULL,
    resource_id TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

CREATE INDEX idx_policy_tenant ON policies(tenant_id);
CREATE INDEX idx_findings_status ON compliance_findings(status);
CREATE INDEX idx_resource_lookup ON resource_assignments(resource_id);
