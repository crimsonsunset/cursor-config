#!/usr/bin/env node

/**
 * Redacts sensitive information from mcp.json
 * Creates a safe version (mcp.example.json) that can be committed to git
 * Preserves configuration structure to document which MCP servers are used
 */

const fs = require('fs');
const path = require('path');

const MCP_FILE = path.join(__dirname, '../mcp.json');
const OUTPUT_FILE = path.join(__dirname, '../mcp.example.json');

// Sensitive field names to redact (case-insensitive)
const SENSITIVE_KEYS = [
  'token',
  'key',
  'secret',
  'password',
  'credentials',
  'auth',
  'api_key',
  'access_token',
  'client_secret',
  'client_id',
  'oauth',
  'ha_url', // Home Assistant URL
];

// Token prefixes that indicate sensitive values
const TOKEN_PREFIXES = [
  'sbp_',  // Supabase
  'sk_',   // Stripe, OpenAI
  'pk_',   // Publishable keys
  'eyJ',   // JWT tokens
  'ntn_',  // Notion
  'ghp_',  // GitHub Personal
  'gho_',  // GitHub OAuth
];

/**
 * Check if a key name indicates sensitive data
 */
function isSensitiveKey(key) {
  const lowerKey = key.toLowerCase();
  return SENSITIVE_KEYS.some(sensitive => lowerKey.includes(sensitive));
}

/**
 * Check if a string value looks like a token/secret
 */
function looksLikeToken(value) {
  if (typeof value !== 'string') return false;
  
  // Check for known token prefixes
  return TOKEN_PREFIXES.some(prefix => value.startsWith(prefix));
}

/**
 * Redact sensitive values in an object recursively
 */
function redactObject(obj, depth = 0) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => {
      // Check if array item looks like a token
      if (looksLikeToken(item)) {
        return '<REDACTED>';
      }
      return redactObject(item, depth + 1);
    });
  }

  const redacted = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (isSensitiveKey(key) || looksLikeToken(value)) {
      // Redact sensitive values but keep the key to show structure
      if (typeof value === 'string') {
        redacted[key] = value.startsWith('http') 
          ? '<REDACTED_URL>' 
          : '<REDACTED>';
      } else {
        redacted[key] = '<REDACTED>';
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects
      redacted[key] = redactObject(value, depth + 1);
    } else {
      // Keep non-sensitive values
      redacted[key] = value;
    }
  }

  return redacted;
}

/**
 * Main function
 */
function main() {
  try {
    // Check if mcp.json exists
    if (!fs.existsSync(MCP_FILE)) {
      console.error('❌ mcp.json not found at:', MCP_FILE);
      process.exit(1);
    }

    // Read and parse mcp.json
    const mcpContent = fs.readFileSync(MCP_FILE, 'utf8');
    const mcpConfig = JSON.parse(mcpContent);

    // Redact sensitive information
    const redactedConfig = redactObject(mcpConfig);

    // Add header comment
    const output = {
      _comment: [
        'This is a redacted version of mcp.json for documentation purposes.',
        'Sensitive values (API keys, tokens, secrets) have been replaced with <REDACTED>.',
        'To use: Copy to mcp.json and replace <REDACTED> values with your actual credentials.',
        `Generated: ${new Date().toISOString()}`
      ],
      ...redactedConfig
    };

    // Write to output file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

    console.log('✅ Successfully created redacted MCP configuration');
    console.log(`   Input:  ${MCP_FILE}`);
    console.log(`   Output: ${OUTPUT_FILE}`);
    console.log('');
    console.log('📋 Summary:');
    const serverCount = Object.keys(mcpConfig.mcpServers || {}).length;
    console.log(`   - ${serverCount} MCP servers documented`);
    console.log('   - Sensitive values redacted');
    console.log('   - Safe to commit to git');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
