# dpw

Debug with Playwright using all available tools including screenshots, console logs, and network requests.

## Playwright Hygiene - Startup Protocol

### Before Playwright Automation
1. **Profile Health Check**: Clear any stale browser profiles
   ```bash
   rm -rf /Users/joe/Library/Caches/ms-playwright/mcp-chrome-profile || true
   ```

2. **MCP Health Test**: Start with simple navigation to verify MCP server is responsive
   - Navigate to a known working URL (like localhost or google.com)

3. **Dev Environment Check**: Ensure target application is running before browser automation
   - Use curl to check if the app is up

## Debugging Tools Available
- `mcp_playwright_browser_navigate` - Navigate to URLs
- `mcp_playwright_browser_screenshot` - Capture visual state
- `mcp_playwright_browser_console` - Check console logs
- `mcp_playwright_browser_network` - Inspect network requests
- `mcp_playwright_browser_evaluate` - Execute JavaScript in page context

## Debugging Process
1. Clear browser profiles first
2. Navigate to the target page
3. Take screenshot to see current state
4. Check console logs for JavaScript errors
5. Inspect network requests if API-related
6. Use evaluate to inspect DOM/state if needed
7. Report findings with evidence (screenshots, logs, network data)

## Cleanup Protocol
After debugging session:
1. Close browser gracefully with `mcp_playwright_browser_close`
2. Clear profiles if switching contexts

## Escalation Ladder
If issues persist:
- **Level 1**: Clear profiles, retry (try first)
- **Level 2**: Close MCP, wait, retry
- **Level 3**: Check for zombie processes
- **Level 4**: Restart Cursor (nuclear option)





