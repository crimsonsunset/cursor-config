# fix-lints

## fix lints (fl) - Systematic Lint Fixing

When user says "fix lints", "fl", or similar:

### Phase 1: Understanding the Lint Setup
1. **Check for lint script**: Look for common lint script locations:
    - `scripts/jsg-lint.js` or similar custom script
    - `package.json` scripts section
    - Read the lint script/package.json to understand:
        - Does it support single file mode?
        - What's the command syntax?
        - What linters are included (ESLint, TSC, Stylelint, etc.)?

### Phase 2: Get Full Lint Report
2. **Run full lint check** (without --fix):
    - If custom script exists: `node scripts/jsg-lint.js` or `npm run lint`
    - If no custom script: `npx eslint . && tsc --noEmit`
    - Capture and parse the complete output
    - Group errors by file
    - Count total errors per file

3. **Present triage summary**:
   ```
   📋 Lint Report Summary:
   - src/components/chat/Message.tsx: 12 errors
   - src/services/auth.service.ts: 8 errors  
   - src/hooks/chat.hooks.ts: 5 errors
   Total: 25 errors across 3 files
   ```

### Phase 3: Fix Files One at a Time
4. **Process files sequentially** (starting with fewest errors first for quick wins):
    - Read the file completely first (rfn principle)
    - Run lint on single file to see specific errors
    - Fix ALL errors in that one file
    - Verify the fix by running lint on that file again
    - Move to next file only after current file is clean

5. **Progress tracking** after each file:
   ```
   ✅ Fixed: src/hooks/chat.hooks.ts (5/25 errors resolved)
   🔧 Working on: src/services/auth.service.ts (8 errors)
   ⏳ Remaining: src/components/chat/Message.tsx (12 errors)
   ```

### Phase 4: Final Verification
6. **Run full lint check again** to ensure:
    - All individual file fixes didn't introduce new errors elsewhere
    - Type dependencies are still valid
    - No new errors were introduced

### Key Rules
- **NEVER skip reading the lint script** - understand the tool first
- **ALWAYS get full report before fixing** - need the complete picture
- **ONE file at a time** - complete each file before moving to next
- **Verify each fix** - run lint on that specific file after fixing
- **Sort by error count** - fix simple files first (fewest errors)
- **Read file before editing** - understand context to avoid breaking things (rfn)
- **Use --fix flag when safe** - for auto-fixable issues like formatting
- **Manual fixes for logic** - for type errors, unsafe calls, etc.
- **Never stop until all errors are fixed** - don't claim victory prematurely

### Variants
- **fl** or **fix lints** = full systematic flow (default)
- **fl --auto** = try auto-fix first with --fix flag, then manual for remaining errors
- **fl [file]** = fix lints only for specified file(s)

### Example Flow
```bash
# 1. Read lint script
cat scripts/jsg-lint.js  # or read package.json

# 2. Get full report
npm run lint

# 3. Fix files one at a time (sorted by error count)
node scripts/jsg-lint.js src/utils/helper.ts
# [read file, fix errors, verify]

node scripts/jsg-lint.js src/hooks/use-data.ts  
# [read file, fix errors, verify]

# 4. Final verification
npm run lint
# ✅ All checks passed!
```

### Integration Notes
- Works with jsg-lint.js script (supports single file mode)
- Compatible with standard npm lint scripts
- Respects project's ESLint, TSC, Stylelint, and other configurations
- Follows rfn (read first, nondestructive) principle
- Never leaves project with lint errors
