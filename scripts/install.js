const fs = require('fs');
const path = require('path');

// Find the consuming project's root (where package.json is)
const projectRoot = process.env.INIT_CWD || process.cwd();
const cursorDir = path.join(projectRoot, '.cursor');
const rulesFile = path.join(cursorDir, 'rules');

// Don't overwrite existing rules
if (fs.existsSync(rulesFile)) {
  console.log('✓ .cursor/rules already exists, skipping installation');
  process.exit(0);
}

try {
  // Create .cursor directory
  fs.mkdirSync(cursorDir, { recursive: true });
  
  // Copy rules file
  const sourceRules = path.join(__dirname, '../.cursor/rules');
  fs.copyFileSync(sourceRules, rulesFile);
  
  console.log('✓ Created .cursor/rules from @crimsonsunset/cursor-config');
} catch (error) {
  console.error('❌ Failed to install cursor rules:', error.message);
  process.exit(1);
} 