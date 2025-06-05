// metrics.js - Sistema de monitoramento
class MetricsCollector {
  constructor() {
    this.metrics = {
      apiCalls: 0,
      tokensUsed: 0,
      cacheHits: 0,
      cacheMisses: 0,
      sequentialThinkingUsage: 0,
      errors: 0,
      avgResponseTime: 0,
      tasksProcessed: 0,
      sequentialPercentage: 0,
      avgComplexity: 0,
      successRate: 0,
      apiReduction: 0,
      costsSaved: 0,
      totalTokens: 0,
      avgTokensPerTask: 0,
      avgCostPerTask: 0
    };
    this.apiCallTimestamps = [];
  }

  track(event, data) {
    switch(event) {
      case 'api_call':
        this.metrics.apiCalls++;
        this.metrics.tokensUsed += data.tokens || 0;
        this.apiCallTimestamps.push({ timestamp: Date.now(), tokens: data.tokens || 0 });
        break;
      case 'cache_hit':
        this.metrics.cacheHits++;
        break;
      case 'cache_miss':
        this.metrics.cacheMisses++;
        break;
      case 'sequential_thinking':
        this.metrics.sequentialThinkingUsage++;
        break;
      case 'error':
        this.metrics.errors++;
        break;
      case 'task_processed':
        this.metrics.tasksProcessed++;
        this.metrics.avgComplexity = (this.metrics.avgComplexity * (this.metrics.tasksProcessed - 1) + data.complexity) / this.metrics.tasksProcessed;
        if (data.success) {
          this.metrics.successRate = (this.metrics.successRate * (this.metrics.tasksProcessed - 1) + 100) / this.metrics.tasksProcessed;
        } else {
          this.metrics.successRate = (this.metrics.successRate * (this.metrics.tasksProcessed - 1) + 0) / this.metrics.tasksProcessed;
        }
        break;
    }
    
    // Salvar métricas para análise (simulado)
    this.saveMetrics();
  }

  saveMetrics() {
    // Em um sistema real, isso salvaria em um DB ou arquivo
    // console.log('Métricas salvas:', this.metrics);
  }

  calculateCost() {
    // Simulação de cálculo de custo baseado em tokens
    const costPerThousandTokens = 0.002; // Exemplo: $2 por milhão de tokens
    return (this.metrics.tokensUsed / 1000) * costPerThousandTokens;
  }

  generateReport() {
    const totalCacheAttempts = this.metrics.cacheHits + this.metrics.cacheMisses;
    const efficiency = totalCacheAttempts > 0 ? (this.metrics.cacheHits / totalCacheAttempts) * 100 : 0;
    
    // Simulação de redução de API calls e custos salvos
    this.metrics.apiReduction = Math.min(99, (this.metrics.cacheHits / (this.metrics.apiCalls + this.metrics.cacheHits)) * 100 || 0);
    this.metrics.costsSaved = this.calculateCost() * (this.metrics.apiReduction / 100);

    this.metrics.sequentialPercentage = this.metrics.tasksProcessed > 0 ? (this.metrics.sequentialThinkingUsage / this.metrics.tasksProcessed) * 100 : 0;
    this.metrics.totalTokens = this.metrics.tokensUsed;
    this.metrics.avgTokensPerTask = this.metrics.tasksProcessed > 0 ? this.metrics.tokensUsed / this.metrics.tasksProcessed : 0;
    this.metrics.avgCostPerTask = this.metrics.tasksProcessed > 0 ? this.calculateCost() / this.metrics.tasksProcessed : 0;

    return {
      overview: {
        totalTasks: this.metrics.tasksProcessed,
        sequentialThinkingUsage: `${this.metrics.sequentialPercentage.toFixed(2)}%`,
        avgComplexity: this.metrics.avgComplexity.toFixed(2),
        successRate: `${this.metrics.successRate.toFixed(2)}%`
      },
      
      performance: {
        apiCalls: this.metrics.apiCalls,
        tokensUsed: this.metrics.tokensUsed,
        cacheHitRate: `${efficiency.toFixed(2)}%`,
        apiCallsReduction: `${this.metrics.apiReduction.toFixed(2)}%`,
        avgResponseTime: this.metrics.avgResponseTime.toFixed(2) // Precisa ser calculado de forma mais robusta
      },
      
      costs: {
        estimatedSaved: `$${this.metrics.costsSaved.toFixed(2)}`,
        totalTokens: this.metrics.totalTokens,
        tokensPerTask: this.metrics.avgTokensPerTask.toFixed(2),
        costPerTask: `$${this.metrics.avgCostPerTask.toFixed(2)}`,
        estimatedTotalCost: `$${this.calculateCost().toFixed(2)}`
      },
      
      recommendations: this.generateRecommendations(this.metrics)
    };
  }

  generateRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.cacheHits / (metrics.cacheHits + metrics.cacheMisses) < 0.3) {
      recommendations.push({
        priority: 'high',
        action: 'Increase cache TTL or improve cache key strategy',
        impact: 'Could reduce API calls by 20-30%'
      });
    }
    
    if (metrics.sequentialPercentage > 80) {
      recommendations.push({
        priority: 'medium',
        action: 'Review complexity thresholds - may be overusing Sequential Thinking',
        impact: 'Could reduce costs by 15-20%'
      });
    }
    
    return recommendations;
  }

  getMetrics(timeframe = '24h') {
    // Simula a recuperação de métricas para um determinado período
    // Em um sistema real, isso consultaria um DB de métricas
    return this.metrics; // Retorna as métricas atuais para simplificar
  }
}

module.exports = MetricsCollector;
