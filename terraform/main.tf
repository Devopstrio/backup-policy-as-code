terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# --- Core Governance Resource Group ---
resource "azurerm_resource_group" "bpac_core" {
  name     = "rg-bpac-governance-prod-001"
  location = "East US"
  tags = {
    Environment = "Production"
    Role        = "Governance"
    Owner       = "SecOps"
  }
}

# --- Compliance Metadata (PostgreSQL) ---
resource "azurerm_postgresql_flexible_server" "bpac_db" {
  name                   = "psql-bpac-gov-prod"
  resource_group_name    = azurerm_resource_group.bpac_core.name
  location               = azurerm_resource_group.bpac_core.location
  version                = "13"
  administrator_login    = "bpacadmin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "GP_Standard_D2s_v3"
}

# --- Redis for Drift Engine Locks ---
resource "azurerm_redis_cache" "bpac_lock" {
  name                = "redis-bpac-drift-locks"
  location            = azurerm_resource_group.bpac_core.location
  resource_group_name = azurerm_resource_group.bpac_core.name
  capacity            = 1
  family              = "P"
  sku_name            = "Premium"
  enable_non_ssl_port = false
}

# --- Kubernetes Control Plane ---
module "aks" {
  source              = "./modules/aks"
  cluster_name        = "aks-bpac-runtime"
  resource_group_name = azurerm_resource_group.bpac_core.name
  location            = azurerm_resource_group.bpac_core.location
  node_count          = 3
}
