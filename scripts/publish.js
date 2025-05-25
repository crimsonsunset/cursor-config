#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
let versionType = 'patch'; // default

// Check for version flags
if (args.includes('--major')) {
  versionType = 'major';
} else if (args.includes('--minor')) {
  versionType = 'minor';
} else if (args.includes('--patch')) {
  versionType = 'patch';
}

try {
  // Get current version
  const packagePath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const currentVersion = packageJson.version;
  
  console.log(`📦 Current version: ${currentVersion}`);
  console.log(`🔄 Bumping ${versionType} version...`);
  
  // Bump version
  const versionOutput = execSync(`npm version ${versionType}`, { encoding: 'utf8' });
  const newVersion = versionOutput.trim().replace('v', '');
  
  console.log(`✅ Version bumped: ${currentVersion} → ${newVersion}`);
  console.log(`📤 Publishing to npm...`);
  
  // Publish
  execSync('npm publish --access public', { stdio: 'inherit' });
  
  console.log(`🎉 Successfully published @crimsonsunset/cursor-config@${newVersion}`);
  console.log(`📋 Install with: npm install -D @crimsonsunset/cursor-config@${newVersion}`);
  
} catch (error) {
  console.error('❌ Publish failed:', error.message);
  process.exit(1);
} 