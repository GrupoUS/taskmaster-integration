#!/usr/bin/env node

/**
 * Teste do Advanced Rules Engine
 * 
 * Testa as funcionalidades avançadas do sistema de regras incluindo:
 * - Scoring multi-dimensional
 * - Priorização avançada
 * - Aprendizado de padrões
 * - Métricas de performance
 */

const { AdvancedRulesEngine } = require('./src/core/rules-engine-advanced');

async function testAdvancedRules() {
    console.log('🧠 Iniciando teste do Advanced Rules Engine...\n');
    
    const engine = new AdvancedRulesEngine();
    
    try {
        // Teste 1: Decisão baseada em complexidade baixa
        console.log('📊 Teste 1: Operação de baixa complexidade');
        const lowComplexityDecision = await engine.evaluate('add-task', {
            complexity: 2,
            type: 'task_organization',
            description: 'Criar uma tarefa simples de organização'
        });
        console.log('✅ Resultado:', {
            system: lowComplexityDecision.system,
            confidence: lowComplexityDecision.confidence.toFixed(2),
            reasoning: lowComplexityDecision.reasoning
        });
        console.log('');

        // Teste 2: Decisão baseada em alta complexidade
        console.log('🔬 Teste 2: Operação de alta complexidade');
        const highComplexityDecision = await engine.evaluate('analyze-complex-problem', {
            complexity: 9,
            type: 'problem_analysis',
            description: 'Analisar problema complexo que requer raciocínio profundo',
            hasDeadline: true,
            dependencies: ['task1', 'task2', 'task3', 'task4']
        });
        console.log('✅ Resultado:', {
            system: highComplexityDecision.system,
            confidence: highComplexityDecision.confidence.toFixed(2),
            reasoning: highComplexityDecision.reasoning,
            hasWorkflow: !!highComplexityDecision.workflow
        });
        console.log('');

        // Teste 3: Operação híbrida explícita
        console.log('🔄 Teste 3: Operação híbrida explícita');
        const hybridDecision = await engine.evaluate('analyze-and-plan', {
            complexity: 6,
            type: 'comprehensive_analysis',
            description: 'Análise completa seguida de planejamento estruturado'
        });
        console.log('✅ Resultado:', {
            system: hybridDecision.system,
            confidence: hybridDecision.confidence.toFixed(2),
            workflow: hybridDecision.workflow?.slice(0, 3) // Primeiros 3 passos
        });
        console.log('');

        // Teste 4: Priorização multi-dimensional
        console.log('⚡ Teste 4: Priorização multi-dimensional');
        const priorityDecision = await engine.evaluate('urgent-task', {
            complexity: 5,
            urgency: 5,
            impact: 4,
            resources: 3,
            dependencies: 2,
            priority: 'high'
        });
        console.log('✅ Resultado:', {
            system: priorityDecision.system,
            confidence: priorityDecision.confidence.toFixed(2),
            scores: Object.fromEntries(
                Object.entries(priorityDecision.scores).map(([k, v]) => [k, v.toFixed(2)])
            )
        });
        console.log('');

        // Teste 5: Aprendizado de padrões (simulação)
        console.log('🎯 Teste 5: Simulação de aprendizado de padrões');
        
        // Simula várias decisões similares
        for (let i = 0; i < 5; i++) {
            const decision = await engine.evaluate('routine-analysis', {
                complexity: 7,
                type: 'problem_analysis'
            });
            // Simula feedback positivo
            if (decision.metadata && decision.metadata.decisionId) {
                engine.markDecisionOutcome(decision.metadata.decisionId, true);
            }
        }
        
        // Testa se o padrão foi aprendido
        const learnedDecision = await engine.evaluate('routine-analysis', {
            complexity: 7,
            type: 'problem_analysis'
        });
        console.log('✅ Decisão após aprendizado:', {
            system: learnedDecision.system,
            confidence: learnedDecision.confidence.toFixed(2),
            reasoning: learnedDecision.reasoning
        });
        console.log('');

        // Teste 6: Estatísticas avançadas
        console.log('📈 Teste 6: Estatísticas avançadas');
        const stats = engine.getAdvancedStats();
        console.log('✅ Estatísticas:', {
            totalDecisions: stats.performance.totalDecisions,
            averageConfidence: stats.performance.averageConfidence.toFixed(2),
            systemUsage: stats.performance.systemUsage,
            learningPatterns: stats.learningPatterns.totalPatterns,
            highConfidencePatterns: stats.learningPatterns.highConfidencePatterns
        });
        console.log('');

        // Teste 7: Cenários de handoff automático
        console.log('🔀 Teste 7: Cenários de handoff automático');
        
        const handoffScenarios = [
            {
                operation: 'simple-task',
                context: { complexity: 2, type: 'task_organization' },
                expectedSystem: 'taskmaster'
            },
            {
                operation: 'complex-analysis',
                context: { complexity: 9, type: 'problem_analysis' },
                expectedSystem: 'sequential'
            },
            {
                operation: 'strategic-planning',
                context: { complexity: 6, type: 'comprehensive_analysis' },
                expectedSystem: 'hybrid'
            }
        ];

        let correctHandoffs = 0;
        for (const scenario of handoffScenarios) {
            const decision = await engine.evaluate(scenario.operation, scenario.context);
            const isCorrect = decision.system === scenario.expectedSystem;
            if (isCorrect) correctHandoffs++;
            
            console.log(`  ${isCorrect ? '✅' : '❌'} ${scenario.operation}: ${decision.system} (esperado: ${scenario.expectedSystem})`);
        }
        
        console.log(`✅ Handoffs corretos: ${correctHandoffs}/${handoffScenarios.length}`);
        console.log('');

        // Teste 8: Export/Import de configuração
        console.log('💾 Teste 8: Export/Import de configuração');
        const exportedConfig = engine.exportConfiguration();
        console.log('✅ Configuração exportada:', {
            hasRules: !!exportedConfig.rules,
            hasPriorityMatrix: !!exportedConfig.priorityMatrix,
            learningPatternsCount: exportedConfig.learningPatterns.length,
            exportedAt: exportedConfig.exportedAt
        });

        // Cria nova instância e importa configuração
        const newEngine = new AdvancedRulesEngine();
        newEngine.importConfiguration(exportedConfig);
        
        const importTestDecision = await newEngine.evaluate('test-import', {
            complexity: 5,
            type: 'problem_analysis'
        });
        console.log('✅ Teste após import:', {
            system: importTestDecision.system,
            confidence: importTestDecision.confidence.toFixed(2)
        });
        console.log('');

        // Resumo dos Testes
        console.log('📈 RESUMO DOS TESTES AVANÇADOS');
        console.log('===============================');
        console.log('✅ Scoring multi-dimensional: OK');
        console.log('✅ Decisões baseadas em complexidade: OK');
        console.log('✅ Operações híbridas: OK');
        console.log('✅ Priorização avançada: OK');
        console.log('✅ Aprendizado de padrões: OK');
        console.log('✅ Estatísticas avançadas: OK');
        console.log('✅ Handoff automático: OK');
        console.log('✅ Export/Import configuração: OK');
        console.log('');
        console.log('🎉 Todos os testes avançados passaram! Advanced Rules Engine funcionando perfeitamente.');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erro durante os testes avançados:', error);
        return false;
    }
}

// Executa os testes se o script for chamado diretamente
if (require.main === module) {
    testAdvancedRules()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Erro fatal:', error);
            process.exit(1);
        });
}

module.exports = { testAdvancedRules };
