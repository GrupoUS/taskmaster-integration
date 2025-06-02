# Regras de Coordenação - TaskMaster + Sequential Thinking

Este documento define as regras claras de coordenação entre TaskMaster e Sequential Thinking para evitar conflitos e maximizar a eficiência da integração.

## 1. Princípios Fundamentais

### 1.1 Separação de Responsabilidades
- **TaskMaster**: Estruturação, organização e gerenciamento de tarefas
- **Sequential Thinking**: Análise, raciocínio e resolução de problemas complexos
- **Coordenador**: Decisão sobre qual sistema usar e orquestração de operações híbridas

### 1.2 Contexto Compartilhado
- Ambos os sistemas compartilham um contexto unificado
- Todas as operações são sincronizadas automaticamente
- O histórico de decisões e análises é mantido para referência futura

### 1.3 Não Interferência
- Cada sistema opera em sua área de especialização
- Não há sobreposição de funcionalidades
- Conflitos são resolvidos pelo motor de regras

## 2. Regras de Decisão

### 2.1 Uso Exclusivo do TaskMaster

**Quando usar apenas TaskMaster:**
- Operações CRUD de tarefas (`get-tasks`, `add-task`, `update-task`, `remove-task`)
- Gerenciamento de subtarefas (`add-subtask`, `update-subtask`, `remove-subtask`)
- Controle de status (`set-task-status`, `move-task`)
- Gerenciamento de dependências (`add-dependency`, `remove-dependency`)
- Inicialização de projetos (`initialize-project`, `parse-prd`)
- Busca de próxima tarefa simples (`next-task`)

**Palavras-chave que indicam TaskMaster:**
- "criar tarefa", "listar tarefas", "atualizar status"
- "dependência", "projeto", "subtarefa"
- "organizar", "estruturar", "planejar"

### 2.2 Uso Exclusivo do Sequential Thinking

**Quando usar apenas Sequential Thinking:**
- Análise de problemas complexos (`analyze`)
- Avaliação de complexidade (`complexity-report`)
- Tomada de decisões (`decision-making`)
- Validação de dependências (`validate-dependencies`)
- Resolução de problemas (`problem-solving`)

**Palavras-chave que indicam Sequential Thinking:**
- "analisar", "complexidade", "problema", "solução"
- "decisão", "avaliar", "validar", "estratégia"
- "risco", "abordagem"

### 2.3 Uso Híbrido (Ambos os Sistemas)

**Quando usar abordagem híbrida:**
- Análise + Estruturação (`analyze-and-plan`)
- Sugestão inteligente de tarefas (`smart-next-task`)
- Expansão com análise profunda (`expand-with-thinking`)
- Validação de soluções (`validate-solution`)
- Planejamento estratégico (`strategic-planning`)

**Palavras-chave que indicam operação híbrida:**
- "analisar e planejar", "próxima tarefa inteligente"
- "expandir com análise", "validar solução"
- "planejamento estratégico", "análise completa"

## 3. Fluxos de Trabalho Híbridos

### 3.1 Analyze-and-Plan
```
1. Sequential Thinking: Análise do problema
   - Quebra o problema em componentes
   - Identifica complexidade e riscos
   - Gera insights e recomendações

2. TaskMaster: Estruturação em tarefas
   - Cria tarefas baseadas na análise
   - Define dependências
   - Estabelece prioridades

3. Sequential Thinking: Validação do plano
   - Verifica consistência
   - Identifica gaps
   - Sugere melhorias

4. TaskMaster: Criação de dependências
   - Finaliza estrutura de dependências
   - Atualiza metadados das tarefas
```

### 3.2 Smart-Next-Task
```
1. TaskMaster: Busca próxima tarefa
   - Identifica candidatas baseado em dependências
   - Filtra por critérios básicos

2. Sequential Thinking: Análise de complexidade
   - Avalia dificuldade técnica
   - Identifica riscos potenciais
   - Estima esforço necessário

3. Hybrid: Geração de recomendações
   - Combina dados estruturais com análise
   - Gera recomendação final
```

### 3.3 Expand-with-Thinking
```
1. TaskMaster: Busca tarefa original
   - Obtém dados completos da tarefa
   - Carrega contexto relacionado

2. Sequential Thinking: Análise profunda
   - Quebra tarefa em subtarefas
   - Identifica dependências técnicas
   - Avalia diferentes abordagens

3. TaskMaster: Criação de subtarefas
   - Cria subtarefas baseadas na análise
   - Estabelece dependências internas

4. Sequential Thinking: Validação da expansão
   - Verifica completude
   - Identifica possíveis problemas
```

### 3.4 Validate-Solution
```
1. Sequential Thinking: Validação da solução
   - Verifica se atende requisitos
   - Avalia qualidade da implementação
   - Identifica possíveis problemas

2. TaskMaster: Atualização de status
   - Atualiza status baseado na validação
   - Adiciona notas e feedback

3. Sequential Thinking: Geração de feedback
   - Cria recomendações de melhoria
   - Documenta lições aprendidas
```

## 4. Regras de Sincronização

### 4.1 Contexto Compartilhado
- Todas as operações atualizam o contexto compartilhado
- Mudanças são propagadas automaticamente
- Histórico é mantido para auditoria

### 4.2 Prevenção de Conflitos
- Apenas um sistema pode modificar dados por vez
- Operações são enfileiradas se necessário
- Timeouts previnem deadlocks

### 4.3 Recuperação de Erros
- Falhas em um sistema não afetam o outro
- Rollback automático em operações híbridas
- Logs detalhados para debugging

## 5. Critérios de Decisão Automática

### 5.1 Análise de Complexidade
```javascript
if (complexidade > 7) {
    usar Sequential Thinking + TaskMaster (híbrido)
} else if (complexidade < 4) {
    usar apenas TaskMaster
} else {
    analisar contexto adicional
}
```

### 5.2 Análise de Tipo de Problema
```javascript
switch (tipoProblem) {
    case 'organizational':
        usar TaskMaster
        break;
    case 'analytical':
        usar Sequential Thinking
        break;
    case 'strategic':
        usar híbrido
        break;
}
```

### 5.3 Análise de Dependências
```javascript
if (temDependencias) {
    priorizar TaskMaster
    adicionar Sequential Thinking se complexo
}
```

## 6. Métricas e Monitoramento

### 6.1 Métricas de Performance
- Tempo de decisão do motor de regras
- Taxa de sucesso de operações híbridas
- Utilização de cada sistema

### 6.2 Métricas de Qualidade
- Precisão das decisões automáticas
- Satisfação com recomendações
- Redução de retrabalho

### 6.3 Métricas de Sincronização
- Latência de sincronização
- Taxa de conflitos
- Tempo de recuperação de erros

## 7. Configuração e Customização

### 7.1 Regras Personalizadas
```javascript
// Exemplo de adição de regra personalizada
rulesEngine.addCustomRule('taskmaster', {
    operations: ['custom-operation'],
    contexts: ['custom-context'],
    keywords: ['palavra-chave-personalizada']
});
```

### 7.2 Ajuste de Thresholds
```javascript
// Configuração de limites de complexidade
const config = {
    complexityThresholds: {
        low: 3,
        medium: 6,
        high: 8
    },
    confidenceThreshold: 0.7
};
```

### 7.3 Configuração de Workflows
```javascript
// Definição de workflow personalizado
const customWorkflow = [
    'Sequential Thinking: Análise inicial',
    'TaskMaster: Estruturação básica',
    'Hybrid: Validação cruzada',
    'TaskMaster: Finalização'
];
```

## 8. Troubleshooting

### 8.1 Problemas Comuns
- **Decisão incorreta**: Verificar palavras-chave e contexto
- **Conflito de sincronização**: Verificar fila de operações
- **Performance lenta**: Verificar tamanho do contexto

### 8.2 Logs e Debugging
- Todos os componentes geram logs estruturados
- Nível de log configurável (error, warn, info, debug)
- Rastreamento de operações por ID único

### 8.3 Recuperação de Estado
- Contexto pode ser restaurado do histórico
- Operações podem ser reexecutadas
- Estado pode ser exportado/importado

## 9. Melhores Práticas

### 9.1 Design de Operações
- Mantenha operações atômicas
- Use nomes descritivos
- Documente dependências

### 9.2 Gerenciamento de Contexto
- Limpe contexto antigo regularmente
- Use contexto relevante apenas
- Monitore uso de memória

### 9.3 Tratamento de Erros
- Sempre trate erros graciosamente
- Forneça mensagens claras
- Implemente retry quando apropriado

## 10. Evolução e Manutenção

### 10.1 Adição de Novas Regras
- Teste em ambiente isolado
- Monitore impacto na performance
- Documente mudanças

### 10.2 Otimização
- Analise métricas regularmente
- Ajuste thresholds baseado em dados
- Refine regras baseado no uso

### 10.3 Versionamento
- Mantenha compatibilidade com versões anteriores
- Documente breaking changes
- Forneça migração quando necessário
