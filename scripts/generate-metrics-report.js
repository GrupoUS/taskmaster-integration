const MetricsCollector = require('../src/metrics/metrics');
const TaskMasterDashboard = require('../monitoring/dashboard');
const fs = require('fs');
const path = require('path');

async function generateMetricsReport() {
  const metricsCollector = new MetricsCollector();
  const dashboard = new TaskMasterDashboard(metricsCollector);

  // Simular algumas métricas para o relatório
  metricsCollector.track('api_call', { tokens: 1000 });
  metricsCollector.track('api_call', { tokens: 500 });
  metricsCollector.track('cache_hit');
  metricsCollector.track('task_processed', { complexity: 7, success: true });
  metricsCollector.track('sequential_thinking');

  const report = await dashboard.generateReport();

  const reportPath = path.join(__dirname, '../reports/metrics-report.json');
  const reportHtmlPath = path.join(__dirname, '../reports/metrics-report.html');

  // Criar diretório reports se não existir
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`✅ Relatório de métricas gerado em: ${reportPath}`);

  // Gerar um HTML simples para visualização
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TaskMaster Metrics Report</title>
      <style>
        body { font-family: sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
        .container { max-width: 900px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1, h2 { color: #0056b3; }
        pre { background: #eee; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .metric-section { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .metric-section:last-child { border-bottom: none; }
        .recommendation { background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 10px; margin-top: 10px; border-radius: 4px; }
        .recommendation p { margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>TaskMaster Metrics Report</h1>
        <p>Gerado em: ${new Date().toLocaleString()}</p>

        <div class="metric-section">
          <h2>Overview</h2>
          <pre>${JSON.stringify(report.overview, null, 2)}</pre>
        </div>

        <div class="metric-section">
          <h2>Performance</h2>
          <pre>${JSON.stringify(report.performance, null, 2)}</pre>
        </div>

        <div class="metric-section">
          <h2>Costs</h2>
          <pre>${JSON.stringify(report.costs, null, 2)}</pre>
        </div>

        <div class="metric-section">
          <h2>Recommendations</h2>
          ${report.recommendations.map(rec => `
            <div class="recommendation">
              <p><strong>Priority:</strong> ${rec.priority}</p>
              <p><strong>Action:</strong> ${rec.action}</p>
              <p><strong>Impact:</strong> ${rec.impact}</p>
            </div>
          `).join('')}
          ${report.recommendations.length === 0 ? '<p>No specific recommendations at this time.</p>' : ''}
        </div>
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync(reportHtmlPath, htmlContent, 'utf8');
  console.log(`✅ Relatório HTML gerado em: ${reportHtmlPath}`);
}

generateMetricsReport();
