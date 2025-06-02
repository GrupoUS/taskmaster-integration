/**
 * TaskMaster + Sequential Thinking Coordinator
 * 
 * Sistema principal de coordenação que decide quando usar cada ferramenta
 * e gerencia a sincronização entre TaskMaster e Sequential Thinking.
 */

const { ContextManager } = require('../utils/context-manager');
const { RulesEngine } = require('./rules-engine');
const { SyncManager } = require('./sync-manager');
const { Logger } = require('../utils/logger');

class TaskMasterCoordinator {
    constructor() {
        this.contextManager = new ContextManager();
        this.rulesEngine = new RulesEngine();
        this.syncManager = new SyncManager();
        this.logger = new Logger('TaskMasterCoordinator');
        
        // Estado atual do sistema
        this.currentMode = 'idle'; // idle, taskmaster, sequential, hybrid
        this.activeSession = null;
        this.sharedContext = {};
    }

    /**
     * Inicializa o sistema de coordenação
     */
    async initialize() {
        this.logger.info('Inicializando TaskMaster Coordinator...');
        
        try {
            await this.contextManager.initialize();
            await this.syncManager.initialize();
            
            this.logger.info('TaskMaster Coordinator inicializado com sucesso');
            return { success: true, message: 'Sistema inicializado' };
        } catch (error) {
            this.logger.error('Erro ao inicializar:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Decide qual sistema usar baseado no tipo de operação
     */
    async decideSystem(operation, context = {}) {
        const decision = await this.rulesEngine.evaluate(operation, context);
        
        this.logger.info(`Decisão para operação '${operation}': ${decision.system}`);
        
        return decision;
    }

    /**
     * Executa comando híbrido que pode usar ambos os sistemas
     */
    async executeHybridCommand(command, params = {}) {
        this.logger.info(`Executando comando híbrido: ${command}`);
        
        try {
            // Atualiza contexto compartilhado
            await this.contextManager.updateContext({
                command,
                params,
                timestamp: new Date().toISOString()
            });

            switch (command) {
                case 'analyze-and-plan':
                    return await this.analyzeAndPlan(params);
                
                case 'smart-next-task':
                    return await this.smartNextTask(params);
                
                case 'expand-with-thinking':
                    return await this.expandWithThinking(params);
                
                case 'validate-solution':
                    return await this.validateSolution(params);
                
                default:
                    throw new Error(`Comando híbrido desconhecido: ${command}`);
            }
        } catch (error) {
            this.logger.error(`Erro ao executar comando ${command}:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Analisa problema com Sequential Thinking e estrutura com TaskMaster
     */
    async analyzeAndPlan(params) {
        const { problem, requirements } = params;
        
        this.logger.info('Iniciando análise e planejamento...');
        
        // Fase 1: Análise com Sequential Thinking
        const analysisResult = await this.syncManager.executeSequentialThinking({
            thought: `Analisando problema: ${problem}. Requisitos: ${requirements}. Preciso quebrar este problema em componentes menores e identificar dependências, complexidade e possíveis soluções.`,
            nextThoughtNeeded: true,
            thoughtNumber: 1,
            totalThoughts: 5
        });

        // Fase 2: Estruturação com TaskMaster
        if (analysisResult.success) {
            const planningResult = await this.syncManager.executeTaskMaster('parse-prd', {
                content: `${problem}\n\nAnálise: ${analysisResult.analysis}\n\nRequisitos: ${requirements}`
            });

            // Sincroniza contexto
            await this.contextManager.syncResults({
                analysis: analysisResult,
                planning: planningResult,
                type: 'analyze-and-plan'
            });

            return {
                success: true,
                analysis: analysisResult,
                planning: planningResult,
                nextSteps: await this.generateNextSteps(analysisResult, planningResult)
            };
        }

        return { success: false, error: 'Falha na análise inicial' };
    }

    /**
     * Sugere próxima tarefa de forma inteligente
     */
    async smartNextTask(params) {
        this.logger.info('Sugerindo próxima tarefa inteligente...');
        
        // Busca próxima tarefa no TaskMaster
        const nextTaskResult = await this.syncManager.executeTaskMaster('next-task', params);
        
        if (nextTaskResult.success && nextTaskResult.task) {
            // Analisa complexidade com Sequential Thinking
            const complexityAnalysis = await this.syncManager.executeSequentialThinking({
                thought: `Analisando tarefa: ${nextTaskResult.task.title}. Descrição: ${nextTaskResult.task.description}. Preciso avaliar: 1) Complexidade técnica, 2) Dependências, 3) Riscos potenciais, 4) Estratégia de execução.`,
                nextThoughtNeeded: true,
                thoughtNumber: 1,
                totalThoughts: 4
            });

            return {
                success: true,
                task: nextTaskResult.task,
                analysis: complexityAnalysis,
                recommendation: await this.generateTaskRecommendation(nextTaskResult.task, complexityAnalysis)
            };
        }

        return { success: false, error: 'Nenhuma tarefa encontrada' };
    }

    /**
     * Expande tarefa usando ambos os sistemas
     */
    async expandWithThinking(params) {
        const { taskId } = params;
        
        this.logger.info(`Expandindo tarefa ${taskId} com análise profunda...`);
        
        // Busca tarefa no TaskMaster
        const taskResult = await this.syncManager.executeTaskMaster('get-task', { taskId });
        
        if (taskResult.success) {
            // Análise profunda com Sequential Thinking
            const deepAnalysis = await this.syncManager.executeSequentialThinking({
                thought: `Expandindo tarefa: ${taskResult.task.title}. Preciso quebrar esta tarefa em subtarefas específicas, identificar dependências técnicas, considerar diferentes abordagens e prever possíveis obstáculos.`,
                nextThoughtNeeded: true,
                thoughtNumber: 1,
                totalThoughts: 6
            });

            // Expande no TaskMaster baseado na análise
            const expansionResult = await this.syncManager.executeTaskMaster('expand-task', {
                taskId,
                analysis: deepAnalysis.analysis
            });

            return {
                success: true,
                originalTask: taskResult.task,
                analysis: deepAnalysis,
                expansion: expansionResult
            };
        }

        return { success: false, error: 'Tarefa não encontrada' };
    }

    /**
     * Valida solução e atualiza status
     */
    async validateSolution(params) {
        const { taskId, solution } = params;
        
        this.logger.info(`Validando solução para tarefa ${taskId}...`);
        
        // Validação com Sequential Thinking
        const validation = await this.syncManager.executeSequentialThinking({
            thought: `Validando solução: ${solution}. Preciso verificar: 1) Se atende aos requisitos, 2) Qualidade da implementação, 3) Possíveis problemas, 4) Sugestões de melhoria.`,
            nextThoughtNeeded: true,
            thoughtNumber: 1,
            totalThoughts: 4
        });

        // Atualiza status no TaskMaster baseado na validação
        const statusUpdate = await this.syncManager.executeTaskMaster('set-task-status', {
            taskId,
            status: validation.isValid ? 'completed' : 'needs_revision',
            notes: validation.feedback
        });

        return {
            success: true,
            validation,
            statusUpdate,
            recommendations: validation.recommendations || []
        };
    }

    /**
     * Gera próximos passos baseado na análise e planejamento
     */
    async generateNextSteps(analysis, planning) {
        return [
            'Revisar tarefas criadas no TaskMaster',
            'Priorizar tarefas baseado na análise de complexidade',
            'Identificar dependências críticas',
            'Começar com tarefas de menor risco'
        ];
    }

    /**
     * Gera recomendação para execução de tarefa
     */
    async generateTaskRecommendation(task, analysis) {
        return {
            priority: analysis.complexity > 7 ? 'high' : 'medium',
            estimatedTime: this.estimateTime(analysis.complexity),
            approach: analysis.recommendedApproach || 'standard',
            warnings: analysis.risks || []
        };
    }

    /**
     * Estima tempo baseado na complexidade
     */
    estimateTime(complexity) {
        if (complexity <= 3) return '1-2 horas';
        if (complexity <= 6) return '4-8 horas';
        if (complexity <= 8) return '1-2 dias';
        return '3+ dias';
    }

    /**
     * Obtém status atual do sistema
     */
    getStatus() {
        return {
            mode: this.currentMode,
            activeSession: this.activeSession,
            contextSize: Object.keys(this.sharedContext).length,
            uptime: process.uptime()
        };
    }
}

module.exports = { TaskMasterCoordinator };
