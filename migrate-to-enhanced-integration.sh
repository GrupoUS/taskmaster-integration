#!/bin/bash
# migrate-to-enhanced-integration.sh

echo "🚀 Migrando para TaskMaster + Sequential Thinking Enhanced..."

# 1. Backup da implementação atual
echo "📦 Criando backup..."
cp -r taskmaster-integration taskmaster-integration.backup

# 2. Instalar dependências
echo "📚 Instalando dependências..."
cd taskmaster-integration
npm install sequential-thinking-mcp cache-manager metrics-collector

# 3. Aplicar patches
echo "🔧 Aplicando melhorias..."
git apply ../patches/sequential-thinking-enhancement.patch

# 4. Atualizar configurações
echo "⚙️ Atualizando configurações..."
node scripts/update-config.js

# 5. Executar testes
echo "🧪 Executando testes..."
npm test

# 6. Gerar relatório inicial
echo "📊 Gerando relatório de baseline..."
npm run metrics:baseline

echo "✅ Migração concluída! Verifique o relatório em ./reports/migration.html"
