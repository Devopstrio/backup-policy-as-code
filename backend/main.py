from fastapi import FastAPI, BackgroundTasks, HTTPException
import logging
from .engine.policy_processor import PolicyEngine, BackupPolicyModel

app = FastAPI(title="Backup Policy as Code API")
engine = PolicyEngine(policy_path="policies/global_packs.yaml")

@app.on_event("startup")
async def startup_event():
    # Pre-load policies on start
    try:
        engine.load_policies()
    except:
        pass

@app.get("/api/v1/policies")
async def list_policies():
    return engine.active_policies

@app.post("/api/v1/compliance/audit")
async def runtime_audit(resource_data: dict):
    """Audits a single resource against enterprise policies."""
    result = engine.check_compliance(resource_data)
    return result

@app.post("/api/v1/remediate")
async def trigger_remediation(resource_id: str, background_tasks: BackgroundTasks):
    """Triggers an Azure/AWS automation runbook to fix compliance drift."""
    background_tasks.add_task(remediation_worker, resource_id)
    return {"message": "Remediation task queued", "target": resource_id}

async def remediation_worker(resource_id: str):
    logging.getLogger("BPac").info("Working on %s...", resource_id)
    # Integration with Terraform/Bicep would happen here
    pass
