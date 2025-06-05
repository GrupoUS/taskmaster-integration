// prompts/sequential-templates.js
const SEQUENTIAL_THINKING_TEMPLATES = {
  problemDefinition: `
    [SEQUENTIAL THINKING - STAGE 1: PROBLEM DEFINITION]
    
    Task: {task_description}
    Confidence Level Required: {confidence_threshold}/10
    
    Please analyze and define:
    1. Core problem to solve
    2. Success criteria
    3. Constraints and limitations
    4. Dependencies
    5. Potential risks
    
    Output format: Structured JSON with confidence score
  `,
  
  analysis: `
    [SEQUENTIAL THINKING - STAGE 2: DEEP ANALYSIS]
    
    Previous thoughts: {previous_thoughts}
    
    Perform analysis:
    1. Break down into atomic components
    2. Identify patterns and relationships
    3. Evaluate multiple approaches
    4. Consider edge cases
    5. Estimate complexity for each component
    
    If confidence < 7, identify what information is missing
  `,
  
  synthesis: `
    [SEQUENTIAL THINKING - STAGE 3: SYNTHESIS]
    
    Based on analysis: {analysis_results}
    
    Synthesize solution:
    1. Combine insights into coherent plan
    2. Prioritize implementation steps
    3. Create detailed task breakdown
    4. Estimate resources and timeline
    5. Define validation criteria
    
    Generate TaskMaster-compatible task structure
  `
};

module.exports = SEQUENTIAL_THINKING_TEMPLATES;
