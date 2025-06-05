# TaskMaster + Sequential Thinking Integration
 
 Este projeto integra o TaskMaster com Sequential Thinking para criar um sistema híbrido e inteligente de gerenciamento de tarefas e resolução de problemas. Ele incorpora otimizações de API, prevenção de erros e coleta de métricas para maximizar a eficiência e reduzir custos.
 
 ## Estrutura do Projeto
 
 ```
 taskmaster-integration/
 ├── config/
 │   └── default.json                # Configurações globais
 ├── monitoring/
 │   └── dashboard.js                # Dashboard de monitoramento
 ├── src/
 │   ├── core/
 │   │   ├── coordinator.js          # Sistema de coordenação principal
 │   │   ├── sync-manager.js         # Gerenciador de sincronização
 │   │   └── rules-engine.js         # Motor de regras de coordenação
 │   ├── interfaces/
 │   │   ├── unified-commands.js     # Comandos híbridos
 │   │   └── task-analyzer.js        # Analisador de tarefas (a ser implementado)
 │   ├── adapters/
 │   │   └── sequential-thinking-adapter.js # Adaptador para Sequential Thinking
 │   ├── validation/
 │   │   └── error-prevention.js     # Sistema de prevenção de erros
 │   ├── optimization/
 │   │   └── api-optimizer.js        # Otimizador de chamadas de API
 │   ├── metrics/
 │   │   └── metrics.js              # Coletor de métricas
 │   ├── workflow/
 │   │   └── intelligent-workflow.js # Orquestrador de workflow inteligente
 │   ├── utils/
 │   │   ├── context-manager.js      # Gerenciador de contexto compartilhado
 │   │   └── logger.js               # Sistema de logging
 │   ├── fallback/
 │   │   └── fallback-system.js      # Sistema de fallback inteligente
 ├── docs/
 │   ├── coordination-rules.md       # Regras de coordenação
 │   ├── command-reference.md        # Referência de comandos
 │   └── examples.md                 # Exemplos de uso
 ├── scripts/
 │   └── update-config.js            # Script para atualização de configuração
 └── tests/
     └── integration-tests.js        # Testes de integração
 ```
 
 ## Funcionalidades
 
 ### 🎯 Coordenação Inteligente
 - Decisão automática entre TaskMaster e Sequential Thinking
 - Sincronização bidirecional de contexto
 - Regras claras de responsabilidade e handoff
 - Prevenção proativa de erros
 - Otimização de chamadas de API com cache e batch processing
 - Sistema de fallback inteligente para resiliência
 
 ### 🔄 Comandos Híbridos
 - `analyze-and-plan`: Análise + Estruturação
 - `smart-next-task`: Sugestão inteligente de próxima tarefa
 - `expand-with-thinking`: Expansão de tarefa com análise profunda
 - `validate-solution`: Validação e atualização de status
 - `generate-metrics-report`: Gera relatório de performance e custos
 
 ### 📊 Sistema de Contexto Compartilhado
 - Contexto unificado entre os dois sistemas
 - Histórico de decisões e análises
 - Tracking de progresso integrado
 - Coleta e visualização de métricas detalhadas
 
 ## Como Instalar e Usar
 
 1.  **Clone o repositório:**
     ```bash
     git clone https://github.com/eyaltoledano/claude-task-master.git
     cd claude-task-master/taskmaster-integration
     ```
 
 2.  **Execute o script de migração:**
     Este script instalará as dependências necessárias, aplicará as melhorias e atualizará as configurações.
     ```bash
     bash migrate-to-enhanced-integration.sh
     ```
 
 3.  **Configure as chaves de API:**
     Certifique-se de que suas chaves de API para os modelos de LLM (ex: Anthropic, OpenAI) estejam configuradas nas variáveis de ambiente ou no arquivo `.vscode/mcp.json` (se estiver usando o Cursor).
 
 4.  **Use os comandos híbridos:**
     Agora você pode usar os comandos híbridos para gerenciar suas tarefas de forma inteligente.
     Exemplo:
     ```bash
     node index.js
     ```
     Ou execute os exemplos em `examples/complex-task-example.js`.
 
 ## 📈 Monitoramento e Otimização
 
 Após a execução de tarefas, você pode gerar relatórios de métricas para entender o desempenho e os custos:
 
 ```bash
 npm run metrics:report
 ```
 
 Este comando gerará um relatório detalhado sobre chamadas de API, uso de tokens, eficiência do cache e estimativa de custos, além de recomendações para otimização contínua.
