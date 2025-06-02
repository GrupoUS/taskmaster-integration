/**
 * Interface de Comandos Unificados
 * 
 * Fornece uma interface única para executar comandos híbridos
 * que combinam TaskMaster e Sequential Thinking
 */

const { TaskMasterCoordinator } = require('../core/coordinator');
const { Logger } = require('../utils/logger');

class UnifiedCommands {
    constructor() {
        this.coordinator = new TaskMasterCoordinator();
        this.logger = new Logger('UnifiedCommands');
        this.isInitialized = false;
    }

    /**
     * Inicializa o sistema de comandos unificados
     */
    async initialize() {
        if (this.isInitialized) return { success: true };
        
        this.logger.info('Inicializando sistema de comandos unificados...');
        
        try {
            await this.coordinator.initialize();
            this.isInitialized = true;
            
            this.logger.info('Sistema de comandos unificados inicializado');
            return { success: true };
        } catch (error) {
            this.logger.error('Erro ao inicializar comandos unificados:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Analisa problema e cria plano estruturado
     * Combina Sequential Thinking (análise) + TaskMaster (estruturação)
     */
    async analyzeAndPlan(problem, requirements = '') {
        await this.ensureInitialized();
        
        this.logger.info('Executando comando: analyze-and-plan');
        
        return await this.coordinator.executeHybridCommand('analyze-and-plan', {
            problem,
            requirements
        });
    }

    /**
     * Sugere próxima tarefa com análise inteligente
     * Combina TaskMaster (busca tarefa) + Sequential Thinking (análise)
     */
    async smartNextTask(projectId = null, filters = {}) {
        await this.ensureInitialized();
        
        this.logger.info('Executando comando: smart-next-task');
        
        return await this.coordinator.executeHybridCommand('smart-next-task', {
            projectId,
            filters
        });
    }

    /**
     * Expande tarefa com análise profunda
     * Combina TaskMaster (busca tarefa) + Sequential Thinking (análise) + TaskMaster (expansão)
     */
    async expandWithThinking(taskId) {
        await this.ensureInitialized();
        
        this.logger.info('Executando comando: expand-with-thinking');
        
        return await this.coordinator.executeHybridCommand('expand-with-thinking', {
            taskId
        });
    }

    /**
     * Valida solução e atualiza status
     * Combina Sequential Thinking (validação) + TaskMaster (atualização)
     */
    async validateSolution(taskId, solution) {
        await this.ensureInitialized();
        
        this.logger.info('Executando comando: validate-solution');
        
        return await this.coordinator.executeHybridCommand('validate-solution', {
            taskId,
            solution
        });
    }

    /**
     * Executa comando TaskMaster puro
     */
    async executeTaskMaster(operation, params = {}) {
        await this.ensureInitialized();
        
        this.logger.info(`Executando comando TaskMaster: ${operation}`);
        
        const decision = await this.coordinator.decideSystem(operation, params);
        
        if (decision.system !== 'taskmaster') {
            this.logger.warn(`Operação ${operation} redirecionada para ${decision.system}`);
        }
        
        return await this.coordinator.syncManager.executeTaskMaster(operation, params);
    }

    /**
     * Executa análise Sequential Thinking pura
     */
    async executeSequentialThinking(thought, options = {}) {
        await this.ensureInitialized();
        
        this.logger.info('Executando análise Sequential Thinking');
        
        const params = {
            thought,
            nextThoughtNeeded: options.nextThoughtNeeded || true,
            thoughtNumber: options.thoughtNumber || 1,
            totalThoughts: options.totalThoughts || 5,
            ...options
        };
        
        return await this.coordinator.syncManager.executeSequentialThinking(params);
    }

    /**
     * Obtém status do sistema
     */
    async getSystemStatus() {
        if (!this.isInitialized) {
            return { initialized: false };
        }
        
        const coordinatorStatus = this.coordinator.getStatus();
        const syncManagerStats = this.coordinator.syncManager.getStats();
        const contextStats = this.coordinator.contextManager.getStats();
        
        return {
            initialized: true,
            coordinator: coordinatorStatus,
            syncManager: syncManagerStats,
            context: contextStats,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Lista comandos disponíveis
     */
    getAvailableCommands() {
        return {
            hybrid: [
                {
                    name: 'analyzeAndPlan',
                    description: 'Analisa problema e cria plano estruturado',
                    params: ['problem', 'requirements?']
                },
                {
                    name: 'smartNextTask',
                    description: 'Sugere próxima tarefa com análise inteligente',
                    params: ['projectId?', 'filters?']
                },
                {
                    name: 'expandWithThinking',
                    description: 'Expande tarefa com análise profunda',
                    params: ['taskId']
                },
                {
                    name: 'validateSolution',
                    description: 'Valida solução e atualiza status',
                    params: ['taskId', 'solution']
                }
            ],
            taskmaster: [
                {
                    name: 'executeTaskMaster',
                    description: 'Executa comando TaskMaster específico',
                    params: ['operation', 'params?']
                }
            ],
            sequential: [
                {
                    name: 'executeSequentialThinking',
                    description: 'Executa análise Sequential Thinking',
                    params: ['thought', 'options?']
                }
            ],
            system: [
                {
                    name: 'getSystemStatus',
                    description: 'Obtém status do sistema',
                    params: []
                },
                {
                    name: 'getAvailableCommands',
                    description: 'Lista comandos disponíveis',
                    params: []
                }
            ]
        };
    }

    /**
     * Executa comando por nome
     */
    async executeCommand(commandName, ...args) {
        await this.ensureInitialized();
        
        this.logger.info(`Executando comando: ${commandName}`);
        
        switch (commandName) {
            case 'analyzeAndPlan':
                return await this.analyzeAndPlan(...args);
            
            case 'smartNextTask':
                return await this.smartNextTask(...args);
            
            case 'expandWithThinking':
                return await this.expandWithThinking(...args);
            
            case 'validateSolution':
                return await this.validateSolution(...args);
            
            case 'executeTaskMaster':
                return await this.executeTaskMaster(...args);
            
            case 'executeSequentialThinking':
                return await this.executeSequentialThinking(...args);
            
            case 'getSystemStatus':
                return await this.getSystemStatus();
            
            case 'getAvailableCommands':
                return this.getAvailableCommands();
            
            default:
                throw new Error(`Comando desconhecido: ${commandName}`);
        }
    }

    /**
     * Garante que o sistema está inicializado
     */
    async ensureInitialized() {
        if (!this.isInitialized) {
            await this.initialize();
        }
    }

    /**
     * Executa múltiplos comandos em sequência
     */
    async executeBatch(commands) {
        await this.ensureInitialized();
        
        this.logger.info(`Executando batch de ${commands.length} comandos`);
        
        const results = [];
        
        for (const command of commands) {
            try {
                const result = await this.executeCommand(command.name, ...command.args);
                results.push({
                    command: command.name,
                    success: true,
                    result
                });
            } catch (error) {
                results.push({
                    command: command.name,
                    success: false,
                    error: error.message
                });
                
                // Para execução em caso de erro se especificado
                if (command.stopOnError) {
                    break;
                }
            }
        }
        
        return {
            success: true,
            totalCommands: commands.length,
            successfulCommands: results.filter(r => r.success).length,
            results
        };
    }

    /**
     * Cria pipeline de comandos com dependências
     */
    async createPipeline(pipelineConfig) {
        await this.ensureInitialized();
        
        this.logger.info('Criando pipeline de comandos');
        
        const pipeline = {
            id: this.generatePipelineId(),
            config: pipelineConfig,
            status: 'created',
            results: {},
            startTime: new Date().toISOString()
        };
        
        try {
            pipeline.status = 'running';
            
            for (const step of pipelineConfig.steps) {
                // Resolve dependências
                const resolvedArgs = this.resolvePipelineDependencies(step.args, pipeline.results);
                
                // Executa comando
                const result = await this.executeCommand(step.command, ...resolvedArgs);
                
                // Armazena resultado
                pipeline.results[step.id] = result;
                
                this.logger.info(`Pipeline step ${step.id} concluído`);
            }
            
            pipeline.status = 'completed';
            pipeline.endTime = new Date().toISOString();
            
        } catch (error) {
            pipeline.status = 'failed';
            pipeline.error = error.message;
            pipeline.endTime = new Date().toISOString();
        }
        
        return pipeline;
    }

    /**
     * Resolve dependências no pipeline
     */
    resolvePipelineDependencies(args, results) {
        return args.map(arg => {
            if (typeof arg === 'string' && arg.startsWith('$')) {
                // Referência a resultado anterior
                const [stepId, path] = arg.substring(1).split('.');
                const stepResult = results[stepId];
                
                if (path) {
                    return this.getNestedValue(stepResult, path);
                }
                
                return stepResult;
            }
            
            return arg;
        });
    }

    /**
     * Obtém valor aninhado de objeto
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Gera ID único para pipeline
     */
    generatePipelineId() {
        return `pipeline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

module.exports = { UnifiedCommands };
