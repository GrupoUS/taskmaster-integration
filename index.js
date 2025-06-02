/**
 * TaskMaster + Sequential Thinking Integration
 * 
 * Ponto de entrada principal para a integração
 */

const { UnifiedCommands } = require('./src/interfaces/unified-commands');
const { TaskMasterCoordinator } = require('./src/core/coordinator');
const { SyncManager } = require('./src/core/sync-manager');
const { RulesEngine } = require('./src/core/rules-engine');
const { ContextManager } = require('./src/utils/context-manager');
const { Logger } = require('./src/utils/logger');

// Configuração
const config = require('./config/default.json');

/**
 * Classe principal da integração
 */
class TaskMasterIntegration {
    constructor(customConfig = {}) {
        this.config = { ...config, ...customConfig };
        this.logger = new Logger('TaskMasterIntegration');
        this.unifiedCommands = null;
        this.isInitialized = false;
    }

    /**
     * Inicializa a integração completa
     */
    async initialize() {
        if (this.isInitialized) {
            return { success: true, message: 'Já inicializado' };
        }

        this.logger.info('Inicializando TaskMaster + Sequential Thinking Integration...');

        try {
            // Inicializa comandos unificados
            this.unifiedCommands = new UnifiedCommands();
            await this.unifiedCommands.initialize();

            this.isInitialized = true;
            
            this.logger.info('Integração inicializada com sucesso');
            
            return {
                success: true,
                message: 'TaskMaster + Sequential Thinking Integration inicializada',
                version: this.config.system.version,
                environment: this.config.system.environment
            };

        } catch (error) {
            this.logger.error('Erro ao inicializar integração:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Obtém interface de comandos unificados
     */
    getCommands() {
        if (!this.isInitialized) {
            throw new Error('Integração não inicializada. Chame initialize() primeiro.');
        }
        return this.unifiedCommands;
    }

    /**
     * Executa comando híbrido
     */
    async execute(command, ...args) {
        const commands = this.getCommands();
        return await commands.executeCommand(command, ...args);
    }

    /**
     * Obtém status da integração
     */
    async getStatus() {
        if (!this.isInitialized) {
            return { initialized: false };
        }

        const commands = this.getCommands();
        return await commands.getSystemStatus();
    }

    /**
     * Lista comandos disponíveis
     */
    getAvailableCommands() {
        if (!this.isInitialized) {
            return { error: 'Não inicializado' };
        }

        const commands = this.getCommands();
        return commands.getAvailableCommands();
    }

    /**
     * Finaliza a integração
     */
    async shutdown() {
        this.logger.info('Finalizando integração...');
        
        // Aqui seria implementada a lógica de cleanup
        // Por exemplo, fechar conexões MCP, salvar contexto, etc.
        
        this.isInitialized = false;
        this.logger.info('Integração finalizada');
    }
}

/**
 * Função de conveniência para criar e inicializar
 */
async function createIntegration(config = {}) {
    const integration = new TaskMasterIntegration(config);
    await integration.initialize();
    return integration;
}

/**
 * Função de conveniência para uso rápido
 */
async function quickStart() {
    const integration = await createIntegration();
    return integration.getCommands();
}

// Exportações
module.exports = {
    TaskMasterIntegration,
    createIntegration,
    quickStart,
    
    // Componentes individuais para uso avançado
    UnifiedCommands,
    TaskMasterCoordinator,
    SyncManager,
    RulesEngine,
    ContextManager,
    Logger
};

// Se executado diretamente, mostra exemplo de uso
if (require.main === module) {
    async function exemploUso() {
        console.log('=== TaskMaster + Sequential Thinking Integration ===\n');
        
        try {
            // Inicialização rápida
            const commands = await quickStart();
            
            console.log('✅ Integração inicializada com sucesso!\n');
            
            // Mostra comandos disponíveis
            const disponíveis = commands.getAvailableCommands();
            console.log('📋 Comandos disponíveis:');
            
            Object.entries(disponíveis).forEach(([categoria, comandos]) => {
                console.log(`\n${categoria.toUpperCase()}:`);
                comandos.forEach(cmd => {
                    console.log(`  - ${cmd.name}: ${cmd.description}`);
                });
            });
            
            console.log('\n=== Exemplo de Uso ===\n');
            
            // Exemplo de análise e planejamento
            console.log('🔍 Executando análise e planejamento...');
            const resultado = await commands.analyzeAndPlan(
                "Criar sistema de notificações em tempo real",
                "Deve suportar WebSockets, push notifications e email"
            );
            
            console.log('✅ Análise concluída:');
            console.log(`   Complexidade: ${resultado.analysis?.complexity || 'N/A'}`);
            console.log(`   Riscos identificados: ${resultado.analysis?.risks?.length || 0}`);
            console.log(`   Tarefas criadas: ${resultado.planning?.tasks?.length || 0}`);
            
            console.log('\n🎯 Próxima tarefa sugerida...');
            const proximaTarefa = await commands.smartNextTask();
            
            if (proximaTarefa.success && proximaTarefa.task) {
                console.log(`✅ Tarefa sugerida: ${proximaTarefa.task.title}`);
                console.log(`   Complexidade: ${proximaTarefa.analysis?.complexity || 'N/A'}`);
            } else {
                console.log('ℹ️  Nenhuma tarefa disponível no momento');
            }
            
            console.log('\n📊 Status do sistema:');
            const status = await commands.getSystemStatus();
            console.log(`   Inicializado: ${status.initialized}`);
            console.log(`   Contexto: ${status.context?.contextSize?.totalMemory || 0} bytes`);
            
            console.log('\n🎉 Exemplo concluído com sucesso!');
            
        } catch (error) {
            console.error('❌ Erro no exemplo:', error.message);
        }
    }
    
    exemploUso();
}
