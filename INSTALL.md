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

### 1. Clone o Repositório
```bash
git clone https://github.com/eyaltoledano/claude-task-master.git
cd claude-task-master/taskmaster-integration
```

### 2. Execute o Script de Migração
Este script automatiza a instalação de dependências, a aplicação de melhorias e a atualização das configurações.
```bash
bash migrate-to-enhanced-integration.sh
```

### 3. Configure as Chaves de API
Certifique-se de que suas chaves de API para os modelos de LLM (ex: Anthropic, OpenAI) estejam configuradas nas variáveis de ambiente ou no arquivo `.vscode/mcp.json` (se estiver usando o Cursor).

## ⚙️ Configuração

### Configuração Principal
As configurações agora são gerenciadas principalmente através do arquivo `config/default.json`, que é atualizado automaticamente pelo script de migração. Para personalizações adicionais, edite este arquivo diretamente.

### Configurações Importantes (Exemplos)

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

#### Otimização e Cache
```json
{
  "optimization": {
    "batchRequests": true,
    "batchSize": 5,
    "batchDelay": 1000,
    "useCache": true,
    "contextWindowThreshold": 85
  }
}
```

## 🧪 Teste da Instalação

Após a migração, os testes automatizados devem ser executados para verificar a integridade da instalação:
```bash
npm test
```
Você também pode executar o exemplo de tarefa complexa:
```bash
node examples/complex-task-example.js
```

## 📊 Monitoramento e Relatórios

Para gerar um relatório detalhado de métricas de performance e custos:
```bash
npm run metrics:report
```
Este comando fornecerá insights sobre chamadas de API, uso de tokens, eficiência do cache e recomendações para otimização contínua.

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. Erros de Dependência
**Causa**: `npm install` falhou ou dependências não foram instaladas corretamente.
**Solução**: Execute `npm install` novamente no diretório `taskmaster-integration/`.

#### 2. Erros de API/Autenticação
**Causa**: Chaves de API ausentes ou inválidas.
**Solução**: Verifique se suas chaves de API estão corretamente configuradas nas variáveis de ambiente ou no `.vscode/mcp.json`.

#### 3. Comportamento Inesperado
**Causa**: Configurações incorretas ou lógica de negócio não atendida.
**Solução**:
- Verifique os logs (`logging.level` em `config/default.json` para `debug`).
- Revise a seção de `Configuração` acima.
- Execute os testes (`npm test`) para isolar o problema.

## 📚 Próximos Passos

1.  **Explore os exemplos**: Veja `examples/complex-task-example.js` para entender o uso.
2.  **Personalize as configurações**: Ajuste `config/default.json` conforme suas necessidades.
3.  **Integre com seu projeto**: Comece a usar os comandos híbridos para gerenciar suas tarefas.

## ✅ Checklist de Instalação

- [ ] Repositório clonado e `cd` para `taskmaster-integration/`
- [ ] `bash migrate-to-enhanced-integration.sh` executado com sucesso
- [ ] Chaves de API configuradas
- [ ] `npm test` passa sem erros
- [ ] `node examples/complex-task-example.js` executa e mostra resultados esperados

Parabéns! Sua integração TaskMaster + Sequential Thinking está pronta para uso! 🎉
