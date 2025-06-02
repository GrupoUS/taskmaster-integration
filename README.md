# TaskMaster + Sequential Thinking Integration

Este projeto integra o TaskMaster com Sequential Thinking para criar um sistema híbrido de gerenciamento de tarefas e resolução de problemas.

## Estrutura do Projeto

```
taskmaster-integration/
├── src/
│   ├── core/
│   │   ├── coordinator.js          # Sistema de coordenação principal
│   │   ├── sync-manager.js         # Gerenciador de sincronização
│   │   └── rules-engine.js         # Motor de regras de coordenação
│   ├── interfaces/
│   │   ├── unified-commands.js     # Comandos híbridos
│   │   ├── task-analyzer.js        # Analisador de tarefas
│   │   └── thinking-bridge.js      # Ponte para Sequential Thinking
│   ├── utils/
│   │   ├── context-manager.js      # Gerenciador de contexto compartilhado
│   │   └── logger.js               # Sistema de logging
│   └── config/
│       └── integration-config.js   # Configurações de integração
├── docs/
│   ├── coordination-rules.md       # Regras de coordenação
│   ├── command-reference.md        # Referência de comandos
│   └── examples.md                 # Exemplos de uso
└── tests/
    └── integration-tests.js        # Testes de integração
```

## Funcionalidades

### 🎯 Coordenação Inteligente
- Decisão automática entre TaskMaster e Sequential Thinking
- Sincronização bidirecional de contexto
- Regras claras de responsabilidade

### 🔄 Comandos Híbridos
- `analyze-and-plan`: Análise + Estruturação
- `smart-next-task`: Sugestão inteligente de próxima tarefa
- `expand-with-thinking`: Expansão de tarefa com análise profunda
- `validate-solution`: Validação e atualização de status

### 📊 Sistema de Contexto Compartilhado
- Contexto unificado entre os dois sistemas
- Histórico de decisões e análises
- Tracking de progresso integrado

## Como Usar

1. Configure as chaves de API no arquivo `.vscode/mcp.json`
2. Inicialize o projeto: `node src/core/coordinator.js init`
3. Use comandos híbridos para trabalhar com ambos os sistemas
