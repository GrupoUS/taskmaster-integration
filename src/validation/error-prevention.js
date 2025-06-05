// error-prevention.js - Sistema de validação
class ErrorPrevention {
  validateBeforeExecution(task, thoughts) {
    const validations = {
      hasCompleteContext: this.checkContext(thoughts),
      noDuplicateTasks: this.checkDuplicates(task),
      resourcesAvailable: this.checkResources(task),
      dependenciesMet: this.checkDependencies(task)
    };
    
    const errors = Object.entries(validations)
      .filter(([_, valid]) => !valid)
      .map(([key]) => key);
    
    if (errors.length > 0) {
      return {
        valid: false,
        errors,
        suggestions: this.getSuggestions(errors)
      };
    }
    
    return { valid: true };
  }

  checkContext(thoughts) {
    // Lógica para verificar se o contexto está completo
    return thoughts && thoughts.length > 0;
  }

  checkDuplicates(task) {
    // Lógica para verificar tarefas duplicadas
    // Isso pode envolver consultar o TaskMaster ou um cache de tarefas
    return true; // Placeholder
  }

  checkResources(task) {
    // Lógica para verificar recursos disponíveis (ex: API quotas)
    return true; // Placeholder
  }

  checkDependencies(task) {
    // Lógica para verificar se as dependências da tarefa foram atendidas
    return true; // Placeholder
  }

  getSuggestions(errors) {
    const suggestions = [];
    if (errors.includes('hasCompleteContext')) {
      suggestions.push('Ensure all previous Sequential Thinking stages are complete.');
    }
    if (errors.includes('noDuplicateTasks')) {
      suggestions.push('Check TaskMaster for existing similar tasks.');
    }
    // Adicionar mais sugestões com base nos erros
    return suggestions;
  }
}

module.exports = ErrorPrevention;
