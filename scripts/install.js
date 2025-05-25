const fs = require('fs');
const path = require('path');

// Find the consuming project's root (where package.json is)
const projectRoot = process.env.INIT_CWD || process.cwd();
const cursorDir = path.join(projectRoot, '.cursor');
const rulesDir = path.join(cursorDir, 'rules');

// Don't overwrite existing rules directory
if (fs.existsSync(rulesDir)) {
  console.log('✓ .cursor/rules directory already exists, skipping installation');
  process.exit(0);
}

try {
  // Create .cursor/rules directory
  fs.mkdirSync(rulesDir, { recursive: true });
  
  // Copy all .mdc files from .cursor directory
  const sourceDir = path.join(__dirname, '../.cursor');
  const files = fs.readdirSync(sourceDir);
  const mdcFiles = files.filter(file => file.endsWith('.mdc'));
  
  const autoRules = [];
  const manualRules = [];
  
  mdcFiles.forEach(ruleFile => {
    const sourcePath = path.join(sourceDir, ruleFile);
    const destPath = path.join(rulesDir, ruleFile);
    fs.copyFileSync(sourcePath, destPath);
    
    // Check if rule is auto-applied
    const content = fs.readFileSync(sourcePath, 'utf8');
    const isAutoApply = content.includes('alwaysApply: true');
    const ruleName = ruleFile.replace('.mdc', '');
    
    if (isAutoApply) {
      autoRules.push(ruleName);
    } else {
      manualRules.push(`@${ruleName}`);
    }
  });
  
  console.log('✓ Created .cursor/rules/ directory from @crimsonsunset/cursor-config');
  if (autoRules.length > 0) {
    console.log('✓ Auto-applied rules:', autoRules.join(', '));
  }
  if (manualRules.length > 0) {
    console.log('✓ Manual rules available:', manualRules.join(', '));
  }
} catch (error) {
  console.error('❌ Failed to install cursor rules:', error.message);
  process.exit(1);
} 