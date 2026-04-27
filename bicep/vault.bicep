# Azure Bicep module for Policy-Driven Recovery Services Vault
targetScope = 'resourceGroup'

param vaultName string
param location string = resourceGroup().location
param tags object = {}
param enableImmutability bool = true

resource vault 'Microsoft.RecoveryServices/vaults@2023-01-01' = {
  name: vaultName
  location: location
  sku: {
    name: 'RS0'
    tier: 'Standard'
  }
  properties: {
    publicNetworkAccess: 'Disabled'
    securityProfile: {
      immutabilitySettings: {
        state: enableImmutability ? 'Unlocked' : 'Disabled'
      }
    }
  }
  tags: tags
}

resource backupPolicy 'Microsoft.RecoveryServices/vaults/backupPolicies@2023-01-01' = {
  parent: vault
  name: 'default-gold-policy'
  properties: {
    backupManagementType: 'AzureIaasVM'
    schedulePolicy: {
      schedulePolicyType: 'SimpleSchedulePolicy'
      scheduleRunFrequency: 'Daily'
      scheduleRunTimes: [
        '2026-04-27T02:00:00Z'
      ]
    }
    retentionPolicy: {
      retentionPolicyType: 'LongTermRetentionPolicy'
      dailySchedule: {
        retentionTimes: [
          '2026-04-27T02:00:00Z'
        ]
        retentionDuration: {
          count: 30
          durationType: 'Days'
        }
      }
    }
  }
}

output vaultId string = vault.id
