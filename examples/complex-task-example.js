// examples/complex-task-example.js
const TaskMasterSequential = require('../index'); // Ajuste o caminho conforme necessário

async function handleComplexFeature() {
  // Simula uma instância do TaskMasterSequential
  const taskmaster = {
    process: async (task) => {
      console.log(`Processando tarefa: ${task.title} (Complexidade: ${task.complexity})`);
      // Simula a lógica de decisão entre TaskMaster direto e Sequential Thinking
      if (task.complexity > 7) {
        console.log('  -> Usando Sequential Thinking para esta tarefa complexa.');
        // Simula a geração de pensamentos e plano
        const thoughts = [
          { stage: 'problem_definition', content: 'Definição do problema de autenticação.' },
          { stage: 'analysis', content: 'Análise de requisitos de segurança e tecnologias.' },
          { stage: 'synthesis', content: 'Síntese do plano de implementação.' }
        ];
        const plan = 'Plano detalhado para sistema de autenticação.';
        const tasks = [{ id: 'auth-1', title: 'Implementar JWT' }];
        const metrics = { estimatedTokens: 5000 };
        return { usedSequentialThinking: true, thoughts, plan, tasks, metrics };
      } else {
        console.log('  -> Processando diretamente com TaskMaster.');
        return { usedSequentialThinking: false, plan: 'Plano simples.', tasks: [{ id: 'simple-1', title: 'Tarefa simples' }] };
      }
    }
  };

  // Exemplo: Implementar sistema de autenticação
  const authTask = {
    id: 'auth-system-001',
    title: 'Implementar Sistema de Autenticação Completo',
    description: 'Sistema com JWT, refresh tokens, 2FA, recuperação de senha',
    complexity: 9,
    subtasks: [
      'Arquitetura de segurança',
      'Implementação JWT',
      'Sistema de refresh tokens',
      'Integração 2FA',
      'Recuperação de senha',
      'Testes de segurança'
    ]
  };

  // O sistema decidirá automaticamente usar Sequential Thinking
  const result = await taskmaster.process(authTask);
  
  console.log('\n--- Resultado do Processamento ---');
  console.log('Plano gerado:', result.plan);
  console.log('Pensamentos sequenciais:', result.thoughts || 'N/A');
  console.log('Tarefas criadas:', result.tasks);
  console.log('Estimativa de tokens:', result.metrics?.estimatedTokens || 'N/A');
  console.log('Usou Sequential Thinking:', result.usedSequentialThinking);
}

// Executa a função de exemplo
handleComplexFeature();
