// scripts/update-config.js
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../config/default.json');

const newConfig = {
  "taskmaster": {
    "defaultModel": "claude-3-haiku-20240307",
    "complexTaskModel": "claude-3-sonnet-20240229",
    "maxRetries": 2,
    "timeout": 30000
  },
  "sequentialThinking": {
    "enabled": true,
    "autoTriggerThreshold": 7,
    "stages": {
      "problem_definition": {
        "maxTokens": 500,
        "required": true
      },
      "analysis": {
        "maxTokens": 1000,
        "required": false,
        "triggerKeywords": ["analyze", "complex", "unclear"]
      },
      "synthesis": {
        "maxTokens": 800,
        "required": false
      }
    },
    "caching": {
      "enabled": true,
      "ttl": 3600,
      "maxSize": 100
    }
  },
  "optimization": {
    "batchRequests": true,
    "batchSize": 5,
    "batchDelay": 1000,
    "useCache": true,
    "contextWindowThreshold": 85
  }
};

try {
  let currentConfig = {};
  if (fs.existsSync(configPath)) {
    currentConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  const updatedConfig = { ...currentConfig, ...newConfig };

  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), 'utf8');
  console.log('✅ Configurações atualizadas com sucesso em config/default.json');
} catch (error) {
  console.error('❌ Erro ao atualizar configurações:', error);
  process.exit(1);
}
