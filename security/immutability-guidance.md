# 🛡️ BPac Security & Operational Controls

## 1. Zero Trust Persistence
BPac assumes the cloud provider management plane is a potential source of drift. Therefore, our "Source of Truth" is the version-controlled `policy-pack.yaml`.

## 2. Key Security Controls
- **RBAC Matrix**:
  - `Policy Author`: Can commit changes to Git.
  - `Global Auditor`: Can view compliance heatmaps.
  - `Remediation Admin`: Can manually trigger drift rollbacks.
- **Identity Enforcement**: OIDC integration with MFA is mandatory for the BPac Portal.
- **Secret Hygiene**: All cloud provider service principals are stored in HSM-backed vaults with 30-day rotation.

## 3. Immutability Controls
- **WORM Storage**: Backups governed by "Platinum" policies must be stored in Immutable (Locked) vaults.
- **Retention Lock**: Once a policy sets a 7-year retention, it cannot be lowered without multi-signature approval from Compliance + SecOps.

## 4. Operational Risk
- **Exclusion Management**: Exceptions are time-bound (e.g., 48 hours for maintenance) and auto-revert once expired.
