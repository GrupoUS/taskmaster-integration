# Guia de Instalação - TaskMaster + Sequential Thinking Integration

Este guia fornece instruções detalhadas para instalar e configurar a integração TaskMaster + Sequential Thinking.

## 📋 Pré-requisitos

### Sistema
- **Node.js**: Versão 14.0.0 ou superior
- **Sistema Operacional**: Windows, macOS ou Linux
- **Memória**: Mínimo 512MB RAM disponível

### Dependências MCP
Para funcionalidade completa, você precisa ter acesso aos seguintes servidores MCP:
- **TaskMaster MCP Server**: Para gerenciamento de tarefas
- **Sequential Thinking MCP Server**: Para análise e raciocínio

## 🚀 Instalação

### 1. Clone ou Baixe o Projeto
```bash
# Se usando Git
git clone https://github.com/eyaltoledano/claude-task-master
cd claude-task-master/taskmaster-integration

# Ou baixe e extraia o arquivo ZIP
```

### 2. Verificar Estrutura de Arquivos
Certifique-se de que a estrutura está correta:
```
taskmaster-integration/
├── src/
│   ├── core/
│   │   ├── coordinator.js
│   │   ├── rules-engine.js
│   │   └── sync-manager.js
│   ├── interfaces/
│   │   └── unified-commands.js
│   └── utils/
│       ├── context-manager.js
│       └── logger.js
├── config/
│   └── default.json
├── docs/
│   ├── coordination-rules.md
│   └── examples.md
├── index.js
├── package.json
├── README.md
└── INSTALL.md
```

### 3. Instalar Dependências (se houver)
```bash
npm install
```

### 4. Verificar Instalação
```bash
node index.js
```

Se tudo estiver correto, você verá:
```
=== TaskMaster + Sequential Thinking Integration ===

✅ Integração inicializada com sucesso!

📋 Comandos disponíveis:
...
```

## ⚙️ Configuração

### Configuração Básica
O arquivo `config/default.json` contém todas as configurações padrão. Para personalizar:

1. **Copie o arquivo de configuração**:
```bash
cp config/default.json config/custom.json
```

2. **Edite as configurações**:
```json
{
  "system": {
    "environment": "production"
  },
  "logging": {
    "level": "warn"
  },
  "coordination": {
    "complexityThresholds": {
      "low": 2,
      "medium": 5,
      "high": 7
    }
  }
}
```

### Configurações Importantes

#### Logging
```json
{
  "logging": {
    "level": "info",          // error, warn, info, debug
    "format": "structured",   // structured ou simple
    "components": {
      "coordinator": "info",
      "syncManager": "debug"
    }
  }
}
```

#### Thresholds de Complexidade
```json
{
  "coordination": {
    "complexityThresholds": {
      "low": 3,     // Tarefas simples (TaskMaster apenas)
      "medium": 6,  // Tarefas médias (híbrido)
      "high": 8     // Tarefas complexas (Sequential Thinking + TaskMaster)
    }
  }
}
```

#### Performance
```json
{
  "performance": {
    "enableMetrics": true,
    "slowOperationThreshold": 5000,  // 5 segundos
    "memoryWarningThreshold": 104857600  // 100MB
  }
}
```

## 🔧 Configuração de Ambiente

### Desenvolvimento
```json
{
  "system": {
    "environment": "development"
  },
  "development": {
    "mockMcpClients": true,
    "debugMode": true,
    "verboseLogging": true
  }
}
```

### Produção
```json
{
  "system": {
    "environment": "production"
  },
  "production": {
    "mockMcpClients": false,
    "enableCompression": true,
    "enableCaching": true
  },
  "logging": {
    "level": "warn"
  }
}
```

## 🧪 Teste da Instalação

### Teste Básico
```javascript
const { quickStart } = require('./index');

async function testeBasico() {
    try {
        const commands = await quickStart();
        console.log('✅ Integração funcionando!');
        
        const status = await commands.getSystemStatus();
        console.log('Status:', status.initialized);
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

testeBasico();
```

### Teste de Comandos
```javascript
const { createIntegration } = require('./index');

async function testeComandos() {
    const integration = await createIntegration();
    const commands = integration.getCommands();
    
    // Teste análise e planejamento
    const resultado = await commands.analyzeAndPlan(
        "Teste de integração",
        "Verificar se todos os componentes funcionam"
    );
    
    console.log('Resultado:', resultado.success);
}

testeComandos();
```

## 🔌 Integração com MCP

### Configuração de Clientes MCP
Se você tiver servidores MCP reais, configure-os no arquivo de configuração:

```json
{
  "mcp": {
    "taskmaster": {
      "enabled": true,
      "endpoint": "http://localhost:3001",
      "timeout": 30000
    },
    "sequentialThinking": {
      "enabled": true,
      "endpoint": "http://localhost:3002",
      "timeout": 30000
    }
  }
}
```

### Modo Mock (Desenvolvimento)
Para desenvolvimento sem servidores MCP reais:

```json
{
  "development": {
    "mockMcpClients": true
  }
}
```

## 📊 Monitoramento

### Logs
Os logs são salvos no console por padrão. Para salvar em arquivo:

```javascript
const { Logger } = require('./src/utils/logger');

// Configurar logger personalizado
const logger = new Logger('CustomApp', {
    level: 'info',
    outputFile: './logs/integration.log'
});
```

### Métricas
Para habilitar métricas de performance:

```json
{
  "performance": {
    "enableMetrics": true,
    "metricsInterval": 60000
  }
}
```

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. "Integração não inicializada"
**Causa**: Tentativa de usar comandos antes da inicialização
**Solução**:
```javascript
const integration = new TaskMasterIntegration();
await integration.initialize(); // ← Importante!
const commands = integration.getCommands();
```

#### 2. "Erro de timeout"
**Causa**: Operações demoradas
**Solução**: Aumentar timeout na configuração:
```json
{
  "coordination": {
    "defaultTimeout": 60000
  }
}
```

#### 3. "Memória insuficiente"
**Causa**: Contexto muito grande
**Solução**: Limpar contexto regularmente:
```javascript
const commands = await quickStart();
// Usar comandos...
await commands.contextManager.cleanup();
```

### Debug Mode
Para debugging detalhado:

```json
{
  "development": {
    "debugMode": true,
    "verboseLogging": true
  },
  "logging": {
    "level": "debug"
  }
}
```

### Verificação de Saúde
```javascript
async function verificarSaude() {
    const integration = await createIntegration();
    const status = await integration.getStatus();
    
    console.log('Sistema inicializado:', status.initialized);
    console.log('Coordenador ativo:', status.coordinator?.active);
    console.log('Sync Manager ativo:', status.syncManager?.active);
    console.log('Contexto:', status.context?.contextSize);
}
```

## 📚 Próximos Passos

1. **Leia a documentação**: Consulte `docs/` para detalhes técnicos
2. **Veja os exemplos**: Execute exemplos em `docs/examples.md`
3. **Configure para seu uso**: Ajuste `config/default.json`
4. **Integre com seu projeto**: Use a API de comandos unificados

## 🆘 Suporte

- **Documentação**: Consulte arquivos em `docs/`
- **Exemplos**: Veja `docs/examples.md`
- **Issues**: Reporte problemas no GitHub
- **Configuração**: Consulte `config/default.json` para todas as opções

## ✅ Checklist de Instalação

- [ ] Node.js 14+ instalado
- [ ] Arquivos extraídos corretamente
- [ ] `node index.js` executa sem erros
- [ ] Configuração personalizada (se necessário)
- [ ] Testes básicos funcionando
- [ ] Logs configurados (se necessário)
- [ ] Integração MCP configurada (se aplicável)

Parabéns! Sua integração TaskMaster + Sequential Thinking está pronta para uso! 🎉
