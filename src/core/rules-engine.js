/**
 * Rules Engine para TaskMaster + Sequential Thinking
 * 
 * Define regras claras sobre quando usar cada sistema e como coordená-los
 * para evitar conflitos e maximizar eficiência.
 */

const { Logger } = require('../utils/logger');

class RulesEngine {
    constructor() {
        this.logger = new Logger('RulesEngine');
        this.rules = this.initializeRules();
    }

    /**
     * Inicializa as regras de coordenação
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
                    'status_tracking', 'project_initialization', 'prd_parsing'
                ],
                keywords: [
                    'criar tarefa', 'listar tarefas', 'atualizar status', 'dependência',
                    'projeto', 'subtarefa', 'organizar', 'estruturar', 'planejar'
                ]
            },

            // Regras para Sequential Thinking (análise e resolução de problemas)
            sequential: {
                operations: [
                    'analyze', 'complexity-report', 'expand-task', 'expand-all',
                    'validate-dependencies', 'problem-solving', 'decision-making'
                ],
                contexts: [
                    'problem_analysis', 'complex_reasoning', 'decision_making',
                    'solution_validation', 'risk_assessment', 'strategy_planning'
                ],
                keywords: [
                    'analisar', 'complexidade', 'problema', 'solução', 'decisão',
                    'avaliar', 'validar', 'estratégia', 'risco', 'abordagem'
                ]
            },

            // Regras para operações híbridas (ambos os sistemas)
            hybrid: {
                operations: [
                    'analyze-and-plan', 'smart-next-task', 'expand-with-thinking',
                    'validate-solution', 'intelligent-breakdown', 'strategic-planning'
                ],
                contexts: [
                    'comprehensive_analysis', 'intelligent_planning', 'solution_validation',
                    'strategic_execution', 'complex_project_setup'
                ],
                keywords: [
                    'analisar e planejar', 'próxima tarefa inteligente', 'expandir com análise',
                    'validar solução', 'planejamento estratégico', 'análise completa'
                ]
            }
        };
    }

    /**
     * Avalia qual sistema usar baseado na operação e contexto
     */
    async evaluate(operation, context = {}) {
        this.logger.info(`Avaliando operação: ${operation}`);

        try {
            // 1. Verifica se é operação híbrida explícita
            if (this.isHybridOperation(operation)) {
                return {
                    system: 'hybrid',
                    confidence: 1.0,
                    reasoning: 'Operação híbrida explícita',
                    workflow: this.getHybridWorkflow(operation)
                };
            }

            // 2. Verifica se é operação TaskMaster
            if (this.isTaskMasterOperation(operation, context)) {
                return {
                    system: 'taskmaster',
                    confidence: this.calculateConfidence(operation, 'taskmaster'),
                    reasoning: 'Operação de estruturação/organização',
                    nextActions: this.getTaskMasterActions(operation)
                };
            }

            // 3. Verifica se é operação Sequential Thinking
            if (this.isSequentialOperation(operation, context)) {
                return {
                    system: 'sequential',
                    confidence: this.calculateConfidence(operation, 'sequential'),
                    reasoning: 'Operação de análise/resolução de problemas',
                    nextActions: this.getSequentialActions(operation)
                };
            }

            // 4. Análise baseada em contexto e palavras-chave
            const contextAnalysis = this.analyzeContext(operation, context);
            
            return {
                system: contextAnalysis.recommendedSystem,
                confidence: contextAnalysis.confidence,
                reasoning: contextAnalysis.reasoning,
                fallback: contextAnalysis.fallback
            };

        } catch (error) {
            this.logger.error('Erro na avaliação:', error);
            return {
                system: 'taskmaster', // fallback seguro
                confidence: 0.5,
                reasoning: 'Fallback devido a erro na avaliação',
                error: error.message
            };
        }
    }

    /**
     * Verifica se é operação híbrida
     */
    isHybridOperation(operation) {
        return this.rules.hybrid.operations.includes(operation);
    }

    /**
     * Verifica se é operação TaskMaster
     */
    isTaskMasterOperation(operation, context) {
        // Verifica operações diretas
        if (this.rules.taskmaster.operations.includes(operation)) {
            return true;
        }

        // Verifica contextos
        if (context.type && this.rules.taskmaster.contexts.includes(context.type)) {
            return true;
        }

        // Verifica palavras-chave
        const text = `${operation} ${context.description || ''}`.toLowerCase();
        return this.rules.taskmaster.keywords.some(keyword => text.includes(keyword));
    }

    /**
     * Verifica se é operação Sequential Thinking
     */
    isSequentialOperation(operation, context) {
        // Verifica operações diretas
        if (this.rules.sequential.operations.includes(operation)) {
            return true;
        }

        // Verifica contextos
        if (context.type && this.rules.sequential.contexts.includes(context.type)) {
            return true;
        }

        // Verifica palavras-chave
        const text = `${operation} ${context.description || ''}`.toLowerCase();
        return this.rules.sequential.keywords.some(keyword => text.includes(keyword));
    }

    /**
     * Analisa contexto para determinar sistema recomendado
     */
    analyzeContext(operation, context) {
        const scores = {
            taskmaster: 0,
            sequential: 0,
            hybrid: 0
        };

        // Análise de complexidade
        if (context.complexity) {
            if (context.complexity > 7) {
                scores.sequential += 0.3;
                scores.hybrid += 0.4;
            } else if (context.complexity < 4) {
                scores.taskmaster += 0.3;
            }
        }

        // Análise de tipo de problema
        if (context.problemType) {
            switch (context.problemType) {
                case 'organizational':
                    scores.taskmaster += 0.4;
                    break;
                case 'analytical':
                    scores.sequential += 0.4;
                    break;
                case 'strategic':
                    scores.hybrid += 0.4;
                    break;
            }
        }

        // Análise de dependências
        if (context.hasDependencies) {
            scores.taskmaster += 0.2;
            scores.hybrid += 0.1;
        }

        // Análise de necessidade de raciocínio
        if (context.requiresReasoning) {
            scores.sequential += 0.3;
            scores.hybrid += 0.2;
        }

        // Determina sistema recomendado
        const maxScore = Math.max(...Object.values(scores));
        const recommendedSystem = Object.keys(scores).find(key => scores[key] === maxScore);

        return {
            recommendedSystem: recommendedSystem || 'taskmaster',
            confidence: maxScore || 0.5,
            reasoning: this.generateReasoning(scores, context),
            fallback: maxScore < 0.6 ? 'hybrid' : null
        };
    }

    /**
     * Calcula confiança da decisão
     */
    calculateConfidence(operation, system) {
        const directMatch = this.rules[system].operations.includes(operation);
        return directMatch ? 0.9 : 0.7;
    }

    /**
     * Gera workflow para operações híbridas
     */
    getHybridWorkflow(operation) {
        const workflows = {
            'analyze-and-plan': [
                'Sequential Thinking: Análise do problema',
                'TaskMaster: Estruturação em tarefas',
                'Sequential Thinking: Validação do plano',
                'TaskMaster: Criação de dependências'
            ],
            'smart-next-task': [
                'TaskMaster: Busca próxima tarefa',
                'Sequential Thinking: Análise de complexidade',
                'Hybrid: Geração de recomendações'
            ],
            'expand-with-thinking': [
                'TaskMaster: Busca tarefa original',
                'Sequential Thinking: Análise profunda',
                'TaskMaster: Criação de subtarefas',
                'Sequential Thinking: Validação da expansão'
            ],
            'validate-solution': [
                'Sequential Thinking: Validação da solução',
                'TaskMaster: Atualização de status',
                'Sequential Thinking: Geração de feedback'
            ]
        };

        return workflows[operation] || ['Workflow não definido'];
    }

    /**
     * Gera ações para TaskMaster
     */
    getTaskMasterActions(operation) {
        const actions = {
            'add-task': ['Validar dados', 'Criar tarefa', 'Definir dependências'],
            'get-tasks': ['Buscar tarefas', 'Filtrar resultados', 'Ordenar por prioridade'],
            'parse-prd': ['Analisar documento', 'Extrair requisitos', 'Criar estrutura de tarefas']
        };

        return actions[operation] || ['Executar operação padrão'];
    }

    /**
     * Gera ações para Sequential Thinking
     */
    getSequentialActions(operation) {
        const actions = {
            'analyze': ['Iniciar análise', 'Quebrar problema', 'Avaliar soluções'],
            'complexity-report': ['Avaliar complexidade', 'Identificar riscos', 'Gerar relatório']
        };

        return actions[operation] || ['Executar análise padrão'];
    }

    /**
     * Gera explicação do raciocínio
     */
    generateReasoning(scores, context) {
        const reasons = [];

        if (scores.taskmaster > 0.3) {
            reasons.push('Operação requer estruturação/organização');
        }
        if (scores.sequential > 0.3) {
            reasons.push('Operação requer análise/raciocínio');
        }
        if (scores.hybrid > 0.3) {
            reasons.push('Operação se beneficia de abordagem híbrida');
        }

        if (context.complexity > 7) {
            reasons.push('Alta complexidade detectada');
        }

        return reasons.join('; ') || 'Análise baseada em padrões padrão';
    }

    /**
     * Adiciona nova regra personalizada
     */
    addCustomRule(system, rule) {
        if (!this.rules[system]) {
            this.rules[system] = { operations: [], contexts: [], keywords: [] };
        }

        if (rule.operations) {
            this.rules[system].operations.push(...rule.operations);
        }
        if (rule.contexts) {
            this.rules[system].contexts.push(...rule.contexts);
        }
        if (rule.keywords) {
            this.rules[system].keywords.push(...rule.keywords);
        }

        this.logger.info(`Regra personalizada adicionada para ${system}`);
    }

    /**
     * Obtém estatísticas das regras
     */
    getStats() {
        return {
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
        };
    }
}

module.exports = { RulesEngine };
