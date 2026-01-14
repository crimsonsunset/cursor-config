# session-startup

# Playwright Hygiene Rules for Cursor

## 🚀 **Session Startup Protocol**

### Before Any Playwright Automation
1. **Profile Health Check**: Clear any stale browser profiles
   ```bash
   rm -rf /Users/joe/Library/Caches/ms-playwright/mcp-chrome-profile || true
   ```

2. **MCP Health Test**: Start with simple navigation to verify MCP server is responsive
   ```
   mcp_playwright_browser_navigate to a known working URL (like localhost or google.com)
   ```

3. **Dev Environment Check**: Ensure target application is running before browser automation
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT
   ```

## 🧹 **Session Cleanup Protocol**

### After Playwright Sessions
1. **Graceful Browser Close**: Always close browser when switching contexts
   ```
   mcp_playwright_browser_close when done with testing session
   ```

2. **Task Boundary Cleanup**: Close browser between different types of tasks
    - After completing e2e testing → close browser
    - Before switching to different site → close browser
    - When switching from debugging to development → close browser

## 🔧 **Debugging Escalation Ladder**

### Level 1: Profile Management (Try First)
**Symptoms**: "Browser is already in use", connection refused errors
**Actions**:
1. Clear browser profiles: `rm -rf /Users/joe/Library/Caches/ms-playwright/mcp-chrome-profile`
2. Retry the failing Playwright command
3. If successful → continue, if not → escalate to Level 2

### Level 2: MCP State Reset (Moderate)
**Symptoms**: Profiles cleared but still getting "already in use" or tool interruptions
**Actions**:
1. Close any existing browser sessions: `mcp_playwright_browser_close`
2. Wait 3-5 seconds for cleanup
3. Clear profiles again if needed
4. Test with simple navigation command
5. If successful → continue, if not → escalate to Level 3

### Level 3: Process Investigation (Advanced)
**Symptoms**: MCP state reset didn't work, persistent connection issues
**Actions**:
1. Check for zombie processes: `ps aux | grep -E "(playwright|chrome.*headless|mcp.*playwright)"`
2. Look for port conflicts if using specific ports
3. Check system resources (memory, disk space)
4. If process issues found → kill specific processes, if not → escalate to Level 4

### Level 4: Nuclear Option (Last Resort)
**Symptoms**: All above failed, MCP server appears corrupted
**Actions**:
1. **Cursor Restart**: This restarts all MCP servers including playwright
2. After restart, start fresh with Level 1 protocols
3. Document what led to this state for pattern recognition

## ⚠️ **Anti-Patterns to Avoid**

### ❌ Don't Do These
1. **Mass Process Killing**: Don't kill all Chrome processes (user's main browser)
2. **Ignore Profile Errors**: Address "already in use" errors immediately
3. **Leave Sessions Open**: Don't leave browser sessions hanging between tasks
4. **Skip Health Checks**: Always verify MCP responsiveness before complex automation
5. **Process First**: Don't jump to process killing before trying profile management

### ✅ Do These Instead
1. **Profile-First Approach**: Start debugging with profile clearing
2. **Graceful Boundaries**: Clean browser sessions at natural task boundaries
3. **Test Early**: Simple health checks prevent complex failures
4. **Document Patterns**: Note what causes MCP corruption for future prevention
5. **State Awareness**: Understand MCP server persistence between tool calls

## 🎯 **Quick Reference Commands**

### Prevention
```bash
# Clean start
rm -rf /Users/joe/Library/Caches/ms-playwright/mcp-chrome-profile || true

# Health check
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321
```

### Diagnosis
```bash
# Check for playwright processes (informational only)
ps aux | grep -E "(playwright|mcp)" | grep -v grep

# Check for profile locks
ls -la /Users/joe/Library/Caches/ms-playwright/
```

### Recovery
```bash
# Level 1: Profile reset
rm -rf /Users/joe/Library/Caches/ms-playwright/mcp-chrome-profile

# Level 4: Document and restart Cursor
echo "MCP playwright required restart at $(date)" >> ~/playwright-issues.log
```

## 🧠 **Mental Model**

**Remember**:
- **MCP servers maintain state** between tool calls
- **Browser profiles can lock** when sessions don't close cleanly
- **Process killing** addresses symptoms, not root cause
- **Cursor restart** resets all MCP servers (nuclear but effective)
- **Prevention** through good session hygiene is better than reactive debugging

**Key Insight**: Treat Playwright MCP server like a **stateful service** that needs proper session management, not like a stateless tool.
