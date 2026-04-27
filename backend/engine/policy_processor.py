from typing import Dict, List, Optional
import yaml
import logging
from pydantic import BaseModel, ValidationError

logger = logging.getLogger("BPac-Engine")

class RetentionPolicy(BaseModel):
    daily: int
    monthly: int
    yearly: int

class BackupPolicyModel(BaseModel):
    name: str
    rpo_minutes: int
    retention: RetentionPolicy
    encryption_required: bool = True
    immutability: bool = False

class PolicyEngine:
    """Core engine responsible for parsing and validating backup policies."""
    
    def __init__(self, policy_path: str):
        self.policy_path = policy_path
        self.active_policies: List[BackupPolicyModel] = []
        
    def load_policies(self):
        """Loads and validates policies from the local file system or Git."""
        logger.info("Loading policies from %s", self.policy_path)
        try:
            with open(self.policy_path, 'r') as f:
                raw_data = yaml.safe_load(f)
                for p in raw_data.get('policies', []):
                    policy = BackupPolicyModel(**p)
                    self.active_policies.append(policy)
            logger.info("Successfully loaded %d policies", len(self.active_policies))
        except Exception as e:
            logger.error("Critical: Failed to load policies: %s", str(e))
            raise

    def check_compliance(self, resource_config: Dict) -> Dict:
        """Checks if a cloud resource configuration matches its assigned policy."""
        # Multi-cloud compliance logic
        target_policy_name = resource_config.get("policy_tag")
        policy = next((p for p in self.active_policies if p.name == target_policy_name), None)
        
        if not policy:
            return {"status": "NON_COMPLIANT", "reason": "No policy assigned"}
            
        is_compliant = True
        violations = []
        
        if resource_config.get("encryption") != policy.encryption_required:
            is_compliant = False
            violations.append("Encryption mismatch")
            
        if resource_config.get("rpo") > policy.rpo_minutes:
            is_compliant = False
            violations.append(f"RPO violation: {resource_config.get('rpo')} > {policy.rpo_minutes}")
            
        return {
            "status": "COMPLIANT" if is_compliant else "NON_COMPLIANT",
            "violations": violations,
            "policy_applied": policy.name
        }
