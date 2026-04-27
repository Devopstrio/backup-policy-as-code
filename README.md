# 🛡️ Backup Policy as Code (BPac)

[![Governance: Enforced](https://img.shields.io/badge/Governance-Enforced-blue.svg)]()
[![Compliance: ISO27001](https://img.shields.io/badge/Compliance-ISO27001-green.svg)]()

---

## 🏛️ Architecture Overview

BPac provides an automated feedback loop for enterprise backup governance.

```mermaid
graph TD
    subgraph "Authors"
        Git[(Policy Repository)]
        SRE[SRE Team]
    end

    subgraph "Enforcement Engine"
        Val[Policy Validator]
        Depl[Deployment Orchestrator]
    end

    subgraph "Runtime Compliance"
        Drift[Drift Engine]
        Remed[Auto-Remediator]
        Auditor[Compliance Auditor]
    end

    subgraph "Control Plane"
        Portal[Web Control Center]
        API[BPac API Gateway]
        DB[(Metadata DB)]
    end

    SRE -- Commits --> Git
    Git -- Push --> Val
    Val -- Validated --> Depl
    Depl -- Apply --> Cloud[Azure / AWS / Hybrid]
    
    Cloud -- Metadata --> Auditor
    Auditor -- Status --> DB
    Auditor -- Drift Detected --> Drift
    Drift -- Rollback --> Remed
    Remed -- Patch --> Cloud
    
    Portal --> API
    API --> DB
```

## 🚀 Deployment Guide

### 1. Provision Infrastructure
BPac requires a secure Kubernetes foundation.

```bash
cd terraform
terraform init
terraform apply -auto-approve
```

### 2. Initialize Policy Packs
Load the default Gold/Silver/Bronze packs into the platform.

```bash
# Push first policy pack to the API
curl -X POST https://api.bpac.enterprise/v1/policies/packs \
     -H "Content-Type: application/yaml" \
     --data-binary "@policy-packs/gold-tier/pack.yaml"
```

## 🧪 Enforcement Lifecycle

1.  **Define**: Rules are written in YAML (e.g., `daily-backup.yaml`).
2.  **Lint**: CI/CD validates policy logic and RPO limits.
3.  **Assign**: Resources are linked to policies via tags or API bindings.
4.  **Audit**: Continuous engine checks encryption and retention.
5.  **Remediate**: Unauthorized changes are automatically reverted.

---

## 🔐 Security Standards
- **mTLS Everywhere**: Internal engine communication is strictly encrypted.
- **Approval Chains**: Policy changes > 1y retention require CAB approval.
- **Immutable State**: Policy versions are immutable once hashes are locked.

## 🤝 Support
- Enterprise Support: support@devopstrio.com
- Internal Slack: #platform-bca-governance
