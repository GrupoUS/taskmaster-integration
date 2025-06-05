// sequential-thinking-adapter.js - Adicionar cache inteligente
class SequentialThinkingAdapter {
  constructor() {
    this.thoughtCache = new Map();
    this.contextWindow = {
      current: 0,
      max: 90, // Threshold em %
      snapshots: []
    };
  }

  async analyzeTaskComplexity(task) {
    // Determinar quando usar Sequential Thinking
    const complexityIndicators = {
      hasMultipleSteps: task.subtasks?.length > 3,
      requiresAnalysis: /analyze|design|architect|plan/i.test(task.description),
      unclearScope: task.confidence < 7,
      needsHypothesis: /test|verify|validate/i.test(task.description),
      requiresIteration: task.type === 'iterative'
    };
    
    const score = Object.values(complexityIndicators).filter(Boolean).length;
    return {
      shouldUseSequential: score >= 2,
      indicators: complexityIndicators,
      recommendedStages: this.getRecommendedStages(complexityIndicators)
    };
  }

  getRecommendedStages(complexityIndicators) {
    const stages = [];
    if (complexityIndicators.requiresAnalysis || complexityIndicators.unclearScope) {
      stages.push('problem_definition', 'analysis');
    }
    if (complexityIndicators.needsHypothesis || complexityIndicators.requiresIteration) {
      stages.push('synthesis');
    }
    // Adicionar mais lógica para determinar estágios com base nos indicadores
    return stages.length > 0 ? stages : ['problem_definition'];
  }
}

module.exports = SequentialThinkingAdapter;
