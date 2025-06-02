# Exemplos de Uso - TaskMaster + Sequential Thinking Integration

Este documento fornece exemplos práticos de como usar a integração TaskMaster + Sequential Thinking.

## 1. Exemplo Básico: Análise e Planejamento

### Cenário
Você precisa implementar um sistema de autenticação para uma aplicação web.

### Código
```javascript
const { UnifiedCommands } = require('../src/interfaces/unified-commands');

async function exemploAnaliseEPlanejamento() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    const resultado = await commands.analyzeAndPlan(
        "Implementar sistema de autenticação completo para aplicação web",
        "Deve incluir login, registro, recuperação de senha, 2FA e integração com OAuth"
    );
    
    console.log('Análise:', resultado.analysis);
    console.log('Planejamento:', resultado.planning);
    console.log('Próximos passos:', resultado.nextSteps);
}
```

### Resultado Esperado
```json
{
  "success": true,
  "analysis": {
    "complexity": 7,
    "risks": ["Segurança", "Integração OAuth", "Gerenciamento de sessões"],
    "recommendations": ["Usar biblioteca estabelecida", "Implementar testes de segurança"]
  },
  "planning": {
    "tasks": [
      {
        "title": "Configurar autenticação básica",
        "priority": "high",
        "dependencies": []
      },
      {
        "title": "Implementar OAuth",
        "priority": "medium",
        "dependencies": ["Configurar autenticação básica"]
      }
    ]
  },
  "nextSteps": [
    "Revisar tarefas criadas no TaskMaster",
    "Priorizar tarefas baseado na análise de complexidade"
  ]
}
```

## 2. Exemplo: Próxima Tarefa Inteligente

### Cenário
Você quer saber qual tarefa trabalhar em seguida, com análise de complexidade.

### Código
```javascript
async function exemploProximaTarefaInteligente() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    const resultado = await commands.smartNextTask('projeto-web', {
        maxComplexity: 6,
        preferredType: 'frontend'
    });
    
    console.log('Tarefa sugerida:', resultado.task);
    console.log('Análise de complexidade:', resultado.analysis);
    console.log('Recomendação:', resultado.recommendation);
}
```

### Resultado Esperado
```json
{
  "success": true,
  "task": {
    "id": "task-123",
    "title": "Criar componente de login",
    "description": "Implementar formulário de login com validação",
    "priority": "high"
  },
  "analysis": {
    "complexity": 4,
    "risks": ["Validação de entrada"],
    "confidence": 0.8
  },
  "recommendation": {
    "priority": "medium",
    "estimatedTime": "4-8 horas",
    "approach": "standard",
    "warnings": []
  }
}
```

## 3. Exemplo: Expansão com Análise Profunda

### Cenário
Você tem uma tarefa complexa que precisa ser quebrada em subtarefas.

### Código
```javascript
async function exemploExpansaoComAnalise() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    const resultado = await commands.expandWithThinking('task-456');
    
    console.log('Tarefa original:', resultado.originalTask);
    console.log('Análise profunda:', resultado.analysis);
    console.log('Expansão:', resultado.expansion);
}
```

### Resultado Esperado
```json
{
  "success": true,
  "originalTask": {
    "id": "task-456",
    "title": "Implementar sistema de pagamentos",
    "description": "Integrar gateway de pagamento"
  },
  "analysis": {
    "complexity": 8,
    "risks": ["Segurança PCI", "Integração API", "Tratamento de erros"],
    "recommendations": ["Usar SDK oficial", "Implementar logs detalhados"]
  },
  "expansion": {
    "subtasks": [
      {
        "title": "Configurar ambiente de sandbox",
        "priority": "high"
      },
      {
        "title": "Implementar processamento de cartão",
        "priority": "high"
      },
      {
        "title": "Adicionar tratamento de webhooks",
        "priority": "medium"
      }
    ]
  }
}
```

## 4. Exemplo: Validação de Solução

### Cenário
Você implementou uma solução e quer validá-la antes de marcar como concluída.

### Código
```javascript
async function exemploValidacaoSolucao() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    const solucao = `
        Implementei o componente de login com:
        - Validação de email e senha
        - Integração com API de autenticação
        - Tratamento de erros
        - Testes unitários
    `;
    
    const resultado = await commands.validateSolution('task-123', solucao);
    
    console.log('Validação:', resultado.validation);
    console.log('Status atualizado:', resultado.statusUpdate);
    console.log('Recomendações:', resultado.recommendations);
}
```

### Resultado Esperado
```json
{
  "success": true,
  "validation": {
    "isValid": true,
    "confidence": 0.9,
    "feedback": "Solução completa e bem implementada"
  },
  "statusUpdate": {
    "status": "completed",
    "notes": "Validação automática aprovada"
  },
  "recommendations": [
    "Considerar adicionar testes de integração",
    "Documentar API endpoints"
  ]
}
```

## 5. Exemplo: Execução em Lote

### Cenário
Você quer executar múltiplos comandos em sequência.

### Código
```javascript
async function exemploExecucaoLote() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    const comandos = [
        {
            name: 'analyzeAndPlan',
            args: ['Criar dashboard de métricas', 'Deve ser responsivo e em tempo real']
        },
        {
            name: 'smartNextTask',
            args: ['projeto-dashboard']
        },
        {
            name: 'getSystemStatus',
            args: []
        }
    ];
    
    const resultado = await commands.executeBatch(comandos);
    
    console.log('Resultados do lote:', resultado);
}
```

## 6. Exemplo: Pipeline com Dependências

### Cenário
Você quer criar um pipeline onde cada passo depende do anterior.

### Código
```javascript
async function exemploPipelineComDependencias() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    const pipelineConfig = {
        name: 'Desenvolvimento Completo',
        steps: [
            {
                id: 'analise',
                command: 'analyzeAndPlan',
                args: ['Criar API REST', 'CRUD completo com autenticação']
            },
            {
                id: 'proxima_tarefa',
                command: 'smartNextTask',
                args: ['$analise.planning.projectId'] // Usa resultado da análise
            },
            {
                id: 'expansao',
                command: 'expandWithThinking',
                args: ['$proxima_tarefa.task.id'] // Usa ID da tarefa sugerida
            }
        ]
    };
    
    const resultado = await commands.createPipeline(pipelineConfig);
    
    console.log('Pipeline executado:', resultado);
}
```

## 7. Exemplo: Uso Direto dos Sistemas

### TaskMaster Direto
```javascript
async function exemploTaskMasterDireto() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    // Criar tarefa
    const novaTarefa = await commands.executeTaskMaster('add-task', {
        title: 'Implementar cache Redis',
        description: 'Adicionar cache para melhorar performance',
        priority: 'medium'
    });
    
    // Listar tarefas
    const tarefas = await commands.executeTaskMaster('get-tasks', {
        status: 'pending'
    });
    
    console.log('Nova tarefa:', novaTarefa);
    console.log('Tarefas pendentes:', tarefas);
}
```

### Sequential Thinking Direto
```javascript
async function exemploSequentialThinkingDireto() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    const analise = await commands.executeSequentialThinking(
        "Como posso otimizar a performance de uma aplicação React? Preciso considerar bundle size, rendering e network requests.",
        {
            nextThoughtNeeded: true,
            thoughtNumber: 1,
            totalThoughts: 4
        }
    );
    
    console.log('Análise:', analise);
}
```

## 8. Exemplo: Monitoramento e Status

### Código
```javascript
async function exemploMonitoramento() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    // Status do sistema
    const status = await commands.getSystemStatus();
    console.log('Status do sistema:', status);
    
    // Comandos disponíveis
    const comandosDisponiveis = commands.getAvailableCommands();
    console.log('Comandos disponíveis:', comandosDisponiveis);
    
    // Estatísticas detalhadas
    if (status.initialized) {
        console.log('Coordenador:', status.coordinator);
        console.log('Sync Manager:', status.syncManager);
        console.log('Contexto:', status.context);
    }
}
```

## 9. Exemplo: Tratamento de Erros

### Código
```javascript
async function exemploTratamentoErros() {
    const commands = new UnifiedCommands();
    
    try {
        await commands.initialize();
        
        const resultado = await commands.analyzeAndPlan(
            "", // Problema vazio - deve gerar erro
            ""
        );
        
    } catch (error) {
        console.error('Erro capturado:', error.message);
        
        // Verificar status do sistema
        const status = await commands.getSystemStatus();
        console.log('Sistema ainda funcional:', status.initialized);
        
        // Tentar operação mais simples
        const tarefas = await commands.executeTaskMaster('get-tasks');
        console.log('Operação de fallback bem-sucedida:', tarefas.success);
    }
}
```

## 10. Exemplo: Configuração Personalizada

### Código
```javascript
async function exemploConfiguracaoPersonalizada() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    // Adicionar regra personalizada
    commands.coordinator.rulesEngine.addCustomRule('taskmaster', {
        operations: ['deploy-task'],
        contexts: ['deployment'],
        keywords: ['deploy', 'publicar', 'lançar']
    });
    
    // Testar nova regra
    const decisao = await commands.coordinator.decideSystem('deploy-task', {
        type: 'deployment'
    });
    
    console.log('Decisão para deploy-task:', decisao);
    
    // Executar com nova regra
    const resultado = await commands.executeTaskMaster('deploy-task', {
        environment: 'production'
    });
    
    console.log('Resultado do deploy:', resultado);
}
```

## 11. Exemplo Completo: Fluxo de Desenvolvimento

### Código
```javascript
async function exemploFluxoCompleto() {
    const commands = new UnifiedCommands();
    await commands.initialize();
    
    console.log('=== FASE 1: ANÁLISE E PLANEJAMENTO ===');
    const analise = await commands.analyzeAndPlan(
        "Criar sistema de notificações push para aplicação mobile",
        "Deve suportar iOS e Android, com segmentação de usuários e analytics"
    );
    console.log('Análise concluída:', analise.success);
    
    console.log('=== FASE 2: PRÓXIMA TAREFA ===');
    const proximaTarefa = await commands.smartNextTask();
    console.log('Próxima tarefa:', proximaTarefa.task?.title);
    
    console.log('=== FASE 3: EXPANSÃO DA TAREFA ===');
    if (proximaTarefa.task?.id) {
        const expansao = await commands.expandWithThinking(proximaTarefa.task.id);
        console.log('Subtarefas criadas:', expansao.expansion?.subtasks?.length);
    }
    
    console.log('=== FASE 4: SIMULAÇÃO DE DESENVOLVIMENTO ===');
    // Simular implementação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('=== FASE 5: VALIDAÇÃO ===');
    if (proximaTarefa.task?.id) {
        const validacao = await commands.validateSolution(
            proximaTarefa.task.id,
            "Implementei o serviço de notificações com Firebase Cloud Messaging"
        );
        console.log('Validação:', validacao.validation?.isValid ? 'APROVADA' : 'REJEITADA');
    }
    
    console.log('=== FLUXO COMPLETO FINALIZADO ===');
    const statusFinal = await commands.getSystemStatus();
    console.log('Status final do sistema:', statusFinal);
}
```

## 12. Dicas de Uso

### Performance
- Use contexto relevante apenas para evitar overhead
- Limpe contexto antigo regularmente
- Monitore uso de memória

### Debugging
- Configure nível de log apropriado
- Use IDs únicos para rastrear operações
- Analise logs estruturados

### Melhores Práticas
- Sempre inicialize antes de usar
- Trate erros graciosamente
- Use comandos híbridos para problemas complexos
- Monitore métricas de performance

### Customização
- Adicione regras personalizadas conforme necessário
- Ajuste thresholds baseado no seu domínio
- Crie workflows específicos para seu caso de uso
