const fs = require('fs');
const path = require('path');

// Find the consuming project's root (where package.json is)
const projectRoot = process.env.INIT_CWD || process.cwd();
const cursorDir = path.join(projectRoot, '.cursor');
const rulesDir = path.join(cursorDir, 'rules');

try {
  // Create .cursor/rules directory if it doesn't exist
  if (!fs.existsSync(rulesDir)) {
    fs.mkdirSync(rulesDir, { recursive: true });
    console.log('✓ Created .cursor/rules/ directory');
  }
  
  // Copy all .mdc and .md files from rules directory
  const sourceDir = path.join(__dirname, '../rules');
  const files = fs.readdirSync(sourceDir);
  const ruleFiles = files.filter(file => file.endsWith('.mdc') || file.endsWith('.md'));
  
  const autoRules = [];
  const manualRules = [];
  const skippedRules = [];
  const installedRules = [];
  
  ruleFiles.forEach(ruleFile => {
    const sourcePath = path.join(sourceDir, ruleFile);
    const destPath = path.join(rulesDir, ruleFile);
    const ruleName = ruleFile.replace(/\.(mdc|md)$/, '');
    
    // Check if rule already exists
    if (fs.existsSync(destPath)) {
      skippedRules.push(ruleName);
      return;
    }
    
    // Copy the rule file
    fs.copyFileSync(sourcePath, destPath);
    installedRules.push(ruleName);
    
    // Check if rule is auto-applied
    const content = fs.readFileSync(sourcePath, 'utf8');
    const isAutoApply = content.includes('alwaysApply: true');
    
    if (isAutoApply) {
      autoRules.push(ruleName);
    } else {
      manualRules.push(`@${ruleName}`);
    }
  });
  
  // Provide clear feedback
  if (installedRules.length > 0) {
    console.log('✓ Installed cursor rules from @crimsonsunset/cursor-config:', installedRules.join(', '));
    if (autoRules.length > 0) {
      console.log('  → Auto-applied rules:', autoRules.join(', '));
    }
    if (manualRules.length > 0) {
      console.log('  → Manual rules available:', manualRules.join(', '));
    }
  }
  
  if (skippedRules.length > 0) {
    console.log('⚠️  Skipped existing rules:', skippedRules.join(', '));
  }
  
  if (installedRules.length === 0 && skippedRules.length > 0) {
    console.log('✓ All cursor rules already exist, no changes made');
  }
  
} catch (error) {
  console.error('❌ Failed to install cursor rules:', error.message);
  process.exit(1);
} 