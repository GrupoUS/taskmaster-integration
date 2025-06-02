/**
 * Gerenciador de Contexto Compartilhado
 * 
 * Mantém o contexto sincronizado entre TaskMaster e Sequential Thinking
 */

const { Logger } = require('./logger');

class ContextManager {
    constructor() {
        this.logger = new Logger('ContextManager');
        this.sharedContext = {
            currentProject: null,
            activeTasks: [],
            analysisHistory: [],
            decisions: [],
            insights: [],
            metadata: {}
        };
        this.contextHistory = [];
        this.maxHistorySize = 100;
    }

    /**
     * Inicializa o gerenciador de contexto
     */
    async initialize() {
        this.logger.info('Inicializando ContextManager...');
        
        // Carrega contexto persistido se existir
        await this.loadPersistedContext();
        
        this.logger.info('ContextManager inicializado');
        return { success: true };
    }

    /**
     * Atualiza o contexto compartilhado
     */
    async updateContext(update) {
        this.logger.debug('Atualizando contexto compartilhado');
        
        // Salva estado anterior no histórico
        this.saveToHistory();
        
        // Aplica atualização
        if (update.project) {
            this.sharedContext.currentProject = update.project;
        }
        
        if (update.tasks) {
            this.sharedContext.activeTasks = update.tasks;
        }
        
        if (update.analysis) {
            this.sharedContext.analysisHistory.push({
                ...update.analysis,
                timestamp: new Date().toISOString()
            });
        }
        
        if (update.decision) {
            this.sharedContext.decisions.push({
                ...update.decision,
                timestamp: new Date().toISOString()
            });
        }
        
        if (update.insight) {
            this.sharedContext.insights.push({
                ...update.insight,
                timestamp: new Date().toISOString()
            });
        }
        
        if (update.metadata) {
            this.sharedContext.metadata = {
                ...this.sharedContext.metadata,
                ...update.metadata
            };
        }
        
        // Atualiza timestamp da última modificação
        this.sharedContext.lastUpdated = new Date().toISOString();
        
        // Persiste contexto
        await this.persistContext();
        
        this.logger.debug('Contexto atualizado com sucesso');
    }

    /**
     * Sincroniza resultados de operações
     */
    async syncResults(results) {
        this.logger.info('Sincronizando resultados entre sistemas');
        
        const syncData = {
            syncId: this.generateSyncId(),
            timestamp: new Date().toISOString(),
            results
        };
        
        // Extrai insights dos resultados
        const insights = this.extractInsights(results);
        
        // Atualiza contexto com insights
        await this.updateContext({
            insight: {
                source: 'sync-results',
                data: insights,
                syncId: syncData.syncId
            },
            metadata: {
                lastSync: syncData.timestamp,
                syncCount: (this.sharedContext.metadata.syncCount || 0) + 1
            }
        });
        
        return syncData;
    }

    /**
     * Obtém contexto atual
     */
    getContext() {
        return {
            ...this.sharedContext,
            contextSize: this.calculateContextSize(),
            historySize: this.contextHistory.length
        };
    }

    /**
     * Obtém contexto relevante para operação específica
     */
    getRelevantContext(operation, params = {}) {
        const relevantContext = {
            operation,
            timestamp: new Date().toISOString()
        };
        
        // Adiciona projeto atual se relevante
        if (this.sharedContext.currentProject) {
            relevantContext.project = this.sharedContext.currentProject;
        }
        
        // Adiciona tarefas ativas se relevante para TaskMaster
        if (operation.includes('task') || params.includeActiveTasks) {
            relevantContext.activeTasks = this.sharedContext.activeTasks;
        }
        
        // Adiciona análises recentes se relevante para Sequential Thinking
        if (operation.includes('analyze') || params.includeAnalysis) {
            relevantContext.recentAnalysis = this.sharedContext.analysisHistory.slice(-5);
        }
        
        // Adiciona decisões recentes
        if (params.includeDecisions) {
            relevantContext.recentDecisions = this.sharedContext.decisions.slice(-3);
        }
        
        // Adiciona insights relevantes
        relevantContext.insights = this.getRelevantInsights(operation, params);
        
        return relevantContext;
    }

    /**
     * Extrai insights dos resultados
     */
    extractInsights(results) {
        const insights = {
            patterns: [],
            correlations: [],
            trends: [],
            recommendations: []
        };
        
        // Analisa padrões nos resultados
        if (results.analysis && results.planning) {
            insights.patterns.push('Operação híbrida analyze-and-plan executada');
            
            if (results.analysis.complexity > 7) {
                insights.trends.push('Tendência de alta complexidade detectada');
            }
        }
        
        // Extrai recomendações
        if (results.analysis && results.analysis.recommendations) {
            insights.recommendations.push(...results.analysis.recommendations);
        }
        
        return insights;
    }

    /**
     * Obtém insights relevantes para operação
     */
    getRelevantInsights(operation, params) {
        return this.sharedContext.insights
            .filter(insight => {
                // Filtra insights relevantes baseado na operação
                if (operation.includes('analyze') && insight.source === 'sequential-thinking') {
                    return true;
                }
                if (operation.includes('task') && insight.source === 'taskmaster') {
                    return true;
                }
                return insight.source === 'sync-results';
            })
            .slice(-5); // últimos 5 insights relevantes
    }

    /**
     * Salva estado atual no histórico
     */
    saveToHistory() {
        this.contextHistory.push({
            ...JSON.parse(JSON.stringify(this.sharedContext)),
            savedAt: new Date().toISOString()
        });
        
        // Limita tamanho do histórico
        if (this.contextHistory.length > this.maxHistorySize) {
            this.contextHistory = this.contextHistory.slice(-this.maxHistorySize);
        }
    }

    /**
     * Restaura contexto de um ponto no histórico
     */
    restoreFromHistory(index) {
        if (index >= 0 && index < this.contextHistory.length) {
            this.sharedContext = JSON.parse(JSON.stringify(this.contextHistory[index]));
            this.logger.info(`Contexto restaurado do histórico (índice ${index})`);
            return true;
        }
        return false;
    }

    /**
     * Calcula tamanho do contexto
     */
    calculateContextSize() {
        return {
            activeTasks: this.sharedContext.activeTasks.length,
            analysisHistory: this.sharedContext.analysisHistory.length,
            decisions: this.sharedContext.decisions.length,
            insights: this.sharedContext.insights.length,
            totalMemory: JSON.stringify(this.sharedContext).length
        };
    }

    /**
     * Limpa contexto antigo para otimizar memória
     */
    cleanupOldContext() {
        const cutoffDate = new Date();
        cutoffDate.setHours(cutoffDate.getHours() - 24); // 24 horas atrás
        
        // Remove análises antigas
        this.sharedContext.analysisHistory = this.sharedContext.analysisHistory
            .filter(analysis => new Date(analysis.timestamp) > cutoffDate);
        
        // Remove decisões antigas
        this.sharedContext.decisions = this.sharedContext.decisions
            .filter(decision => new Date(decision.timestamp) > cutoffDate);
        
        // Remove insights antigos
        this.sharedContext.insights = this.sharedContext.insights
            .filter(insight => new Date(insight.timestamp) > cutoffDate);
        
        this.logger.info('Contexto antigo limpo');
    }

    /**
     * Persiste contexto (simulado)
     */
    async persistContext() {
        // Em implementação real, salvaria em arquivo ou banco de dados
        this.logger.debug('Contexto persistido');
    }

    /**
     * Carrega contexto persistido (simulado)
     */
    async loadPersistedContext() {
        // Em implementação real, carregaria de arquivo ou banco de dados
        this.logger.debug('Contexto carregado');
    }

    /**
     * Gera ID único para sincronização
     */
    generateSyncId() {
        return `ctx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Obtém estatísticas do contexto
     */
    getStats() {
        return {
            contextSize: this.calculateContextSize(),
            historySize: this.contextHistory.length,
            lastUpdated: this.sharedContext.lastUpdated,
            syncCount: this.sharedContext.metadata.syncCount || 0
        };
    }
}

module.exports = { ContextManager };
