/**
 * Advanced Rules Engine para TaskMaster + Sequential Thinking
 * 
 * Sistema avançado de regras com scoring inteligente, priorização multi-dimensional
 * e aprendizado de padrões para coordenação otimizada entre sistemas.
 */

const { Logger } = require('../utils/logger');

class AdvancedRulesEngine {
    constructor() {
        this.logger = new Logger('AdvancedRulesEngine');
        this.rules = this.initializeRules();
        this.decisionHistory = [];
        this.performanceMetrics = {
            totalDecisions: 0,
            successfulDecisions: 0,
            averageConfidence: 0,
            systemUsage: {
                taskmaster: 0,
                sequential: 0,
                hybrid: 0
            }
        };
        this.learningPatterns = new Map();
        this.priorityMatrix = this.initializePriorityMatrix();
    }

    /**
     * Inicializa as regras de coordenação expandidas
     */
    initializeRules() {
        return {
            // Regras para TaskMaster (estruturação e organização)
            taskmaster: {
                operations: [
                    'get-tasks', 'get-task', 'add-task', 'update-task', 'remove-task',
                    'add-subtask', 'update-subtask', 'remove-subtask', 'clear-subtasks',
                    'set-task-status', 'move-task', 'next-task',
                    'add-dependency', 'remove-dependency', 'fix-dependencies',
                    'initialize-project', 'parse-prd', 'generate'
                ],
                contexts: [
                    'project_management', 'task_organization', 'dependency_management',
                    'status_tracking', 'project_initialization', 'prd_parsing',
                    'workflow_optimization', 'resource_allocation'
                ],
                keywords: [
                    'criar tarefa', 'listar tarefas', 'atualizar status', 'dependência',
                    'projeto', 'subtarefa', 'organizar', 'estruturar', 'planejar',
                    'gerenciar', 'coordenar', 'agendar', 'priorizar'
                ],
                complexityThreshold: { min: 1, max: 5 },
                confidenceBoost: 0.2
            },

            // Regras para Sequential Thinking (análise e resolução de problemas)
            sequential: {
                operations: [
                    'analyze', 'complexity-report', 'expand-task', 'expand-all',
                    'validate-dependencies', 'problem-solving', 'decision-making',
                    'risk-assessment', 'solution-validation', 'strategic-analysis'
                ],
                contexts: [
                    'problem_analysis', 'complex_reasoning', 'decision_making',
                    'solution_validation', 'risk_assessment', 'strategy_planning',
                    'critical_thinking', 'innovation', 'research'
                ],
                keywords: [
                    'analisar', 'complexidade', 'problema', 'solução', 'decisão',
                    'avaliar', 'validar', 'estratégia', 'risco', 'abordagem',
                    'investigar', 'explorar', 'descobrir', 'inovar'
                ],
                complexityThreshold: { min: 6, max: 10 },
                confidenceBoost: 0.3
            },

            // Regras para operações híbridas (ambos os sistemas)
            hybrid: {
                operations: [
                    'analyze-and-plan', 'smart-next-task', 'expand-with-thinking',
                    'validate-solution', 'intelligent-breakdown', 'strategic-planning',
                    'comprehensive-review', 'optimization-analysis', 'integration-planning'
                ],
                contexts: [
                    'comprehensive_analysis', 'intelligent_planning', 'solution_validation',
                    'strategic_execution', 'complex_project_setup', 'system_integration',
                    'performance_optimization', 'quality_assurance'
                ],
                keywords: [
                    'analisar e planejar', 'próxima tarefa inteligente', 'expandir com análise',
                    'validar solução', 'planejamento estratégico', 'análise completa',
                    'otimizar', 'integrar', 'coordenar sistemas'
                ],
                complexityThreshold: { min: 5, max: 8 },
                confidenceBoost: 0.4
            }
        };
    }

    /**
     * Inicializa matriz de priorização multi-dimensional
     */
    initializePriorityMatrix() {
        return {
            factors: {
                complexity: { weight: 0.3, scale: [1, 10] },
                urgency: { weight: 0.25, scale: [1, 5] },
                impact: { weight: 0.2, scale: [1, 5] },
                resources: { weight: 0.15, scale: [1, 5] },
                dependencies: { weight: 0.1, scale: [0, 10] }
            },
            thresholds: {
                high: 0.8,
                medium: 0.6,
                low: 0.4
            }
        };
    }

    /**
     * Avalia qual sistema usar com scoring avançado
     */
    async evaluate(operation, context = {}) {
        this.logger.info(`Avaliando operação: ${operation}`);

        try {
            // Incrementa métricas
            this.performanceMetrics.totalDecisions++;

            // 1. Análise de scoring multi-dimensional
            const scores = await this.calculateAdvancedScores(operation, context);
            
            // 2. Aplicação de padrões aprendidos
            const learningAdjustment = this.applyLearningPatterns(operation, context);
            
            // 3. Combinação de scores
            const finalScores = this.combineScores(scores, learningAdjustment);
            
            // 4. Determinação do sistema recomendado
            const decision = this.makeDecision(finalScores, operation, context);
            
            // 5. Registro da decisão para aprendizado
            this.recordDecision(operation, context, decision);
            
            // 6. Atualização de métricas
            this.updateMetrics(decision);

            return decision;

        } catch (error) {
            this.logger.error('Erro na avaliação avançada:', error);
            return this.getFallbackDecision(operation, error);
        }
    }

    /**
     * Calcula scores avançados multi-dimensionais
     */
    async calculateAdvancedScores(operation, context) {
        const scores = {
            taskmaster: 0,
            sequential: 0,
            hybrid: 0
        };

        // 1. Score baseado em operações diretas
        Object.keys(this.rules).forEach(system => {
            if (this.rules[system].operations.includes(operation)) {
                scores[system] += 0.4;
            }
        });

        // 2. Score baseado em complexidade
        if (context.complexity !== undefined) {
            const complexityScore = this.calculateComplexityScore(context.complexity);
            scores.taskmaster += complexityScore.taskmaster;
            scores.sequential += complexityScore.sequential;
            scores.hybrid += complexityScore.hybrid;
        }

        // 3. Score baseado em contexto semântico
        const semanticScore = this.calculateSemanticScore(operation, context);
        Object.keys(semanticScore).forEach(system => {
            scores[system] += semanticScore[system];
        });

        // 4. Score baseado em histórico de performance
        const historyScore = this.calculateHistoryScore(operation, context);
        Object.keys(historyScore).forEach(system => {
            scores[system] += historyScore[system];
        });

        // 5. Score baseado em priorização
        const priorityScore = this.calculatePriorityScore(context);
        Object.keys(priorityScore).forEach(system => {
            scores[system] += priorityScore[system];
        });

        return scores;
    }

    /**
     * Calcula score baseado na complexidade
     */
    calculateComplexityScore(complexity) {
        const scores = { taskmaster: 0, sequential: 0, hybrid: 0 };

        if (complexity <= 3) {
            scores.taskmaster = 0.3;
        } else if (complexity <= 5) {
            scores.hybrid = 0.2;
            scores.taskmaster = 0.1;
        } else if (complexity <= 7) {
            scores.hybrid = 0.3;
            scores.sequential = 0.2;
        } else {
            scores.sequential = 0.4;
            scores.hybrid = 0.2;
        }

        return scores;
    }

    /**
     * Calcula score baseado em análise semântica
     */
    calculateSemanticScore(operation, context) {
        const scores = { taskmaster: 0, sequential: 0, hybrid: 0 };
        const text = `${operation} ${context.description || ''} ${context.type || ''}`.toLowerCase();

        Object.keys(this.rules).forEach(system => {
            const rule = this.rules[system];
            
            // Score por keywords
            const keywordMatches = rule.keywords.filter(keyword => text.includes(keyword)).length;
            scores[system] += (keywordMatches / rule.keywords.length) * 0.2;
            
            // Score por contextos
            if (context.type && rule.contexts.includes(context.type)) {
                scores[system] += 0.15;
            }
            
            // Boost de confiança específico do sistema
            if (scores[system] > 0) {
                scores[system] += rule.confidenceBoost || 0;
            }
        });

        return scores;
    }

    /**
     * Calcula score baseado no histórico de performance
     */
    calculateHistoryScore(operation, context) {
        const scores = { taskmaster: 0, sequential: 0, hybrid: 0 };
        
        // Busca decisões similares no histórico
        const similarDecisions = this.decisionHistory.filter(decision => 
            decision.operation === operation || 
            decision.context.type === context.type
        );

        if (similarDecisions.length > 0) {
            // Calcula performance média por sistema
            const systemPerformance = {};
            similarDecisions.forEach(decision => {
                if (!systemPerformance[decision.system]) {
                    systemPerformance[decision.system] = { total: 0, successful: 0 };
                }
                systemPerformance[decision.system].total++;
                if (decision.successful) {
                    systemPerformance[decision.system].successful++;
                }
            });

            // Aplica boost baseado na performance histórica
            Object.keys(systemPerformance).forEach(system => {
                const performance = systemPerformance[system];
                const successRate = performance.successful / performance.total;
                scores[system] += successRate * 0.15;
            });
        }

        return scores;
    }

    /**
     * Calcula score baseado na matriz de priorização
     */
    calculatePriorityScore(context) {
        const scores = { taskmaster: 0, sequential: 0, hybrid: 0 };
        
        if (!context.priority) return scores;

        const priorityValue = this.calculatePriorityValue(context);
        
        // Alta prioridade favorece sistemas mais eficientes
        if (priorityValue > this.priorityMatrix.thresholds.high) {
            scores.taskmaster += 0.1; // TaskMaster é mais direto
        } else if (priorityValue > this.priorityMatrix.thresholds.medium) {
            scores.hybrid += 0.1; // Híbrido para casos médios
        } else {
            scores.sequential += 0.05; // Sequential para análise profunda
        }

        return scores;
    }

    /**
     * Calcula valor de prioridade multi-dimensional
     */
    calculatePriorityValue(context) {
        let totalValue = 0;
        let totalWeight = 0;

        Object.keys(this.priorityMatrix.factors).forEach(factor => {
            if (context[factor] !== undefined) {
                const factorConfig = this.priorityMatrix.factors[factor];
                const normalizedValue = this.normalizeValue(
                    context[factor], 
                    factorConfig.scale[0], 
                    factorConfig.scale[1]
                );
                totalValue += normalizedValue * factorConfig.weight;
                totalWeight += factorConfig.weight;
            }
        });

        return totalWeight > 0 ? totalValue / totalWeight : 0.5;
    }

    /**
     * Normaliza valor para escala 0-1
     */
    normalizeValue(value, min, max) {
        return Math.max(0, Math.min(1, (value - min) / (max - min)));
    }

    /**
     * Aplica padrões aprendidos
     */
    applyLearningPatterns(operation, context) {
        const adjustment = { taskmaster: 0, sequential: 0, hybrid: 0 };
        
        // Busca padrões similares
        const patternKey = this.generatePatternKey(operation, context);
        const pattern = this.learningPatterns.get(patternKey);
        
        if (pattern && pattern.confidence > 0.7) {
            adjustment[pattern.preferredSystem] += 0.1;
            this.logger.info(`Aplicando padrão aprendido: ${pattern.preferredSystem}`);
        }

        return adjustment;
    }

    /**
     * Gera chave para padrão de aprendizado
     */
    generatePatternKey(operation, context) {
        return `${operation}_${context.type || 'unknown'}_${Math.floor((context.complexity || 5) / 2)}`;
    }

    /**
     * Combina scores de diferentes fontes
     */
    combineScores(baseScores, learningAdjustment) {
        const combined = {};
        
        Object.keys(baseScores).forEach(system => {
            combined[system] = baseScores[system] + (learningAdjustment[system] || 0);
        });

        return combined;
    }

    /**
     * Toma decisão final baseada nos scores
     */
    makeDecision(scores, operation, context) {
        const maxScore = Math.max(...Object.values(scores));
        const recommendedSystem = Object.keys(scores).find(key => scores[key] === maxScore);
        
        // Calcula confiança baseada na diferença entre scores
        const sortedScores = Object.values(scores).sort((a, b) => b - a);
        const confidence = maxScore > 0 ? 
            Math.min(0.95, maxScore + (sortedScores[0] - sortedScores[1])) : 
            0.5;

        const decision = {
            system: recommendedSystem || 'taskmaster',
            confidence: confidence,
            reasoning: this.generateAdvancedReasoning(scores, context),
            scores: scores,
            fallback: confidence < 0.6 ? this.determineFallback(scores) : null,
            metadata: {
                operation,
                timestamp: new Date().toISOString(),
                contextFactors: Object.keys(context),
                decisionId: this.generateDecisionId()
            }
        };

        // Adiciona workflow específico se for híbrido
        if (decision.system === 'hybrid') {
            decision.workflow = this.getAdvancedHybridWorkflow(operation, context);
        }

        return decision;
    }

    /**
     * Gera workflow híbrido avançado
     */
    getAdvancedHybridWorkflow(operation, context) {
        const baseWorkflows = {
            'analyze-and-plan': [
                'Sequential Thinking: Análise inicial do problema',
                'Sequential Thinking: Identificação de componentes',
                'TaskMaster: Estruturação em tarefas',
                'Sequential Thinking: Validação de dependências',
                'TaskMaster: Criação de estrutura final',
                'Hybrid: Otimização do plano'
            ],
            'smart-next-task': [
                'TaskMaster: Busca tarefas disponíveis',
                'Sequential Thinking: Análise de complexidade e contexto',
                'Sequential Thinking: Avaliação de riscos',
                'Hybrid: Geração de recomendações personalizadas',
                'TaskMaster: Atualização de prioridades'
            ],
            'expand-with-thinking': [
                'TaskMaster: Recuperação da tarefa original',
                'Sequential Thinking: Análise profunda de requisitos',
                'Sequential Thinking: Identificação de subtarefas',
                'TaskMaster: Criação de estrutura de subtarefas',
                'Sequential Thinking: Validação de completude',
                'TaskMaster: Definição de dependências'
            ]
        };

        let workflow = baseWorkflows[operation] || ['Workflow personalizado'];
        
        // Personaliza workflow baseado no contexto
        if (context.complexity > 8) {
            workflow.splice(1, 0, 'Sequential Thinking: Análise de complexidade extrema');
        }
        
        if (context.hasDeadline) {
            workflow.push('TaskMaster: Otimização temporal');
        }

        return workflow;
    }

    /**
     * Gera reasoning avançado
     */
    generateAdvancedReasoning(scores, context) {
        const reasons = [];
        const maxScore = Math.max(...Object.values(scores));
        
        // Razões baseadas em scores
        Object.keys(scores).forEach(system => {
            if (scores[system] === maxScore && scores[system] > 0.3) {
                switch (system) {
                    case 'taskmaster':
                        reasons.push('Operação otimizada para estruturação e organização');
                        break;
                    case 'sequential':
                        reasons.push('Requer análise profunda e raciocínio complexo');
                        break;
                    case 'hybrid':
                        reasons.push('Beneficia-se de abordagem coordenada entre sistemas');
                        break;
                }
            }
        });

        // Razões baseadas em contexto
        if (context.complexity > 7) {
            reasons.push('Alta complexidade detectada');
        }
        if (context.hasDeadline) {
            reasons.push('Prazo crítico identificado');
        }
        if (context.dependencies && context.dependencies.length > 3) {
            reasons.push('Múltiplas dependências requerem coordenação');
        }

        return reasons.join('; ') || 'Decisão baseada em análise multi-dimensional';
    }

    /**
     * Determina sistema de fallback
     */
    determineFallback(scores) {
        const sortedSystems = Object.keys(scores)
            .sort((a, b) => scores[b] - scores[a]);
        
        return sortedSystems[1] || 'taskmaster';
    }

    /**
     * Registra decisão para aprendizado
     */
    recordDecision(operation, context, decision) {
        const record = {
            operation,
            context: { ...context },
            decision: { ...decision },
            timestamp: new Date().toISOString(),
            successful: null // Será atualizado posteriormente
        };

        this.decisionHistory.push(record);
        
        // Mantém apenas os últimos 1000 registros
        if (this.decisionHistory.length > 1000) {
            this.decisionHistory.shift();
        }

        // Atualiza padrões de aprendizado
        this.updateLearningPatterns(operation, context, decision);
    }

    /**
     * Atualiza padrões de aprendizado
     */
    updateLearningPatterns(operation, context, decision) {
        const patternKey = this.generatePatternKey(operation, context);
        const existingPattern = this.learningPatterns.get(patternKey);

        if (existingPattern) {
            existingPattern.occurrences++;
            if (existingPattern.preferredSystem === decision.system) {
                existingPattern.confidence = Math.min(0.95, existingPattern.confidence + 0.05);
            } else {
                existingPattern.confidence = Math.max(0.1, existingPattern.confidence - 0.1);
            }
        } else {
            this.learningPatterns.set(patternKey, {
                preferredSystem: decision.system,
                confidence: 0.6,
                occurrences: 1,
                lastUsed: new Date().toISOString()
            });
        }
    }

    /**
     * Atualiza métricas de performance
     */
    updateMetrics(decision) {
        this.performanceMetrics.systemUsage[decision.system]++;
        
        // Atualiza confiança média
        const totalConfidence = this.performanceMetrics.averageConfidence * 
            (this.performanceMetrics.totalDecisions - 1) + decision.confidence;
        this.performanceMetrics.averageConfidence = 
            totalConfidence / this.performanceMetrics.totalDecisions;
    }

    /**
     * Marca decisão como bem-sucedida ou falhada
     */
    markDecisionOutcome(decisionId, successful) {
        const decision = this.decisionHistory.find(d => 
            d.decision.metadata && d.decision.metadata.decisionId === decisionId
        );
        
        if (decision) {
            decision.successful = successful;
            if (successful) {
                this.performanceMetrics.successfulDecisions++;
            }
        }
    }

    /**
     * Gera ID único para decisão
     */
    generateDecisionId() {
        return `decision_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Obtém decisão de fallback em caso de erro
     */
    getFallbackDecision(operation, error) {
        return {
            system: 'taskmaster',
            confidence: 0.5,
            reasoning: `Fallback devido a erro: ${error.message}`,
            scores: { taskmaster: 0.5, sequential: 0, hybrid: 0 },
            fallback: null,
            error: error.message,
            metadata: {
                operation,
                timestamp: new Date().toISOString(),
                isFallback: true
            }
        };
    }

    /**
     * Obtém estatísticas avançadas
     */
    getAdvancedStats() {
        return {
            performance: { ...this.performanceMetrics },
            learningPatterns: {
                totalPatterns: this.learningPatterns.size,
                highConfidencePatterns: Array.from(this.learningPatterns.values())
                    .filter(p => p.confidence > 0.8).length
            },
            decisionHistory: {
                totalDecisions: this.decisionHistory.length,
                recentDecisions: this.decisionHistory.slice(-10)
            },
            rules: {
                taskmaster: {
                    operations: this.rules.taskmaster.operations.length,
                    contexts: this.rules.taskmaster.contexts.length,
                    keywords: this.rules.taskmaster.keywords.length
                },
                sequential: {
                    operations: this.rules.sequential.operations.length,
                    contexts: this.rules.sequential.contexts.length,
                    keywords: this.rules.sequential.keywords.length
                },
                hybrid: {
                    operations: this.rules.hybrid.operations.length,
                    contexts: this.rules.hybrid.contexts.length,
                    keywords: this.rules.hybrid.keywords.length
                }
            }
        };
    }

    /**
     * Exporta configuração de regras para backup
     */
    exportConfiguration() {
        return {
            rules: this.rules,
            priorityMatrix: this.priorityMatrix,
            learningPatterns: Array.from(this.learningPatterns.entries()),
            performanceMetrics: this.performanceMetrics,
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Importa configuração de regras
     */
    importConfiguration(config) {
        if (config.rules) this.rules = config.rules;
        if (config.priorityMatrix) this.priorityMatrix = config.priorityMatrix;
        if (config.learningPatterns) {
            this.learningPatterns = new Map(config.learningPatterns);
        }
        if (config.performanceMetrics) {
            this.performanceMetrics = { ...this.performanceMetrics, ...config.performanceMetrics };
        }
        
        this.logger.info('Configuração importada com sucesso');
    }
}

module.exports = { AdvancedRulesEngine };
