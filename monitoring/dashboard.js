// monitoring/dashboard.js
class TaskMasterDashboard {
  constructor(metricsCollector) {
    this.collector = metricsCollector;
  }

  async generateReport(timeframe = '24h') {
    const metrics = await this.collector.getMetrics(timeframe);
    
    return {
      overview: {
        totalTasks: metrics.tasksProcessed,
        sequentialThinkingUsage: `${metrics.sequentialPercentage}%`,
        avgComplexity: metrics.avgComplexity,
        successRate: `${metrics.successRate}%`
      },
      
      performance: {
        avgResponseTime: `${metrics.avgResponseTime}ms`,
        cacheHitRate: `${metrics.cacheHitRate}%`,
        apiCallsReduction: `${metrics.apiReduction}%`
      },
      
      costs: {
        estimatedSaved: `$${metrics.costsSaved}`,
        tokensUsed: metrics.totalTokens,
        tokensPerTask: metrics.avgTokensPerTask,
        costPerTask: `$${metrics.avgCostPerTask}`
      },
      
      recommendations: this.generateRecommendations(metrics)
    };
  }
  
  generateRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.cacheHitRate < 30) {
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
}

module.exports = TaskMasterDashboard;
