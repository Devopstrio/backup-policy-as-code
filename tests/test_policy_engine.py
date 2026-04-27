import pytest
from apps.policy_engine.main import PolicyEngine

@pytest.fixture
def engine():
    e = PolicyEngine("policy-packs/gold-tier/pack.yaml")
    # Mocking load for testing
    e.compiled_policies = {
        "TEST-POL": {
            "id": "TEST-POL",
            "retention": {"daily": 30},
            "immutability": True
        }
    }
    return e

def test_compliant_resource(engine):
    resource = {"retention_days": 30, "immutability_enabled": True}
    result = engine.validate_resource(resource, "TEST-POL")
    assert result["compliant"] is True

def test_drifted_retention(engine):
    resource = {"retention_days": 7, "immutability_enabled": True}
    result = engine.validate_resource(resource, "TEST-POL")
    assert result["compliant"] is False
    assert "retention" in result["violations"][0]

def test_missing_immutability(engine):
    resource = {"retention_days": 30, "immutability_enabled": False}
    result = engine.validate_resource(resource, "TEST-POL")
    assert result["compliant"] is False
    assert "Immutability" in result["violations"][0]
