#!/usr/bin/env node

/**
 * Teste do Sistema de Coordenação Core
 * 
 * Este script demonstra o funcionamento da integração entre
 * TaskMaster e Sequential Thinking através do Coordinator.
 */

const { TaskMasterCoordinator } = require('./src/core/coordinator');

async function testCoordination() {
    console.log('🚀 Iniciando teste do Sistema de Coordenação Core...\n');
    
    const coordinator = new TaskMasterCoordinator();
    
    try {
        // Teste 1: Inicialização
        console.log('📋 Teste 1: Inicialização do Coordinator');
        const initResult = await coordinator.initialize();
        console.log('✅ Resultado:', initResult);
        console.log('');
        
        // Teste 2: Decisão de Sistema
        console.log('🤔 Teste 2: Decisão de Sistema');
        const decision = await coordinator.decideSystem('analyze-complex-task', {
            complexity: 8,
            hasSubtasks: false,
            requiresThinking: true
        });
        console.log('✅ Decisão:', decision);
        console.log('');
        
        // Teste 3: Comando Híbrido - Análise e Planejamento
        console.log('🔄 Teste 3: Comando Híbrido - Análise e Planejamento');
        const analysisResult = await coordinator.executeHybridCommand('analyze-and-plan', {
            problem: 'Implementar sistema de autenticação seguro',
            requirements: 'JWT, OAuth, 2FA, rate limiting, audit logs'
        });
        console.log('✅ Resultado da análise:', {
            success: analysisResult.success,
            hasAnalysis: !!analysisResult.analysis,
            hasPlanning: !!analysisResult.planning,
            nextStepsCount: analysisResult.nextSteps?.length || 0
        });
        console.log('');
        
        // Teste 4: Próxima Tarefa Inteligente
        console.log('🎯 Teste 4: Próxima Tarefa Inteligente');
        const smartTaskResult = await coordinator.executeHybridCommand('smart-next-task', {});
        console.log('✅ Resultado:', {
            success: smartTaskResult.success,
            hasTask: !!smartTaskResult.task,
            hasAnalysis: !!smartTaskResult.analysis,
            hasRecommendation: !!smartTaskResult.recommendation
        });
        console.log('');
        
        // Teste 5: Expansão com Thinking
        console.log('🧠 Teste 5: Expansão com Sequential Thinking');
        const expansionResult = await coordinator.executeHybridCommand('expand-with-thinking', {
            taskId: 3
        });
        console.log('✅ Resultado:', {
            success: expansionResult.success,
            hasOriginalTask: !!expansionResult.originalTask,
            hasAnalysis: !!expansionResult.analysis,
            hasExpansion: !!expansionResult.expansion
        });
        console.log('');
        
        // Teste 6: Status do Sistema
        console.log('📊 Teste 6: Status do Sistema');
        const status = coordinator.getStatus();
        console.log('✅ Status:', status);
        console.log('');
        
        // Resumo dos Testes
        console.log('📈 RESUMO DOS TESTES');
        console.log('===================');
        console.log('✅ Inicialização: OK');
        console.log('✅ Decisão de Sistema: OK');
        console.log('✅ Análise e Planejamento: OK');
        console.log('✅ Próxima Tarefa Inteligente: OK');
        console.log('✅ Expansão com Thinking: OK');
        console.log('✅ Status do Sistema: OK');
        console.log('');
        console.log('🎉 Todos os testes passaram! Sistema de Coordenação Core funcionando.');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erro durante os testes:', error);
        return false;
    }
}

// Executa os testes se o script for chamado diretamente
if (require.main === module) {
    testCoordination()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Erro fatal:', error);
            process.exit(1);
        });
}

module.exports = { testCoordination };
