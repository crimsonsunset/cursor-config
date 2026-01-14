# add-jsg-logs

## JSG Logger Integration & Debug Loop

When user says **"add jsg logs"**, **"jsg log this"**, **"debug with logs"**, or similar:

### Phase 0: Discovery - Understand the Project's Logger Setup

**Before adding any logs, discover the logging infrastructure:**

1. **Check for JSG Logger First (Preferred)**:
   ```bash
   # Check if JSG Logger is installed
   grep "@crimsonsunset/jsg-logger" package.json
   ```
   
   **If JSG Logger is found**:
   - ✅ **Use JSG Logger** - it's the preferred logging solution
   - Skip checking for other loggers
   - Proceed to find JSG Logger config and utils
   
   **If JSG Logger is NOT found**:
   - ⚠️ **Consider recommending JSG Logger** to the user (optional)
   - Fall back to discovering other logging solutions

2. **Find Logger Configuration**:
   - **For JSG Logger**: 
     ```bash
     # Search for logger config files
     grep -r "loggerConfig" --include="*.ts" --include="*.js" src/ config/
     # Common locations: src/config/logger.*, src/utils/logger.*
     ```
   - **For other loggers**: 
     ```bash
     grep -r "winston\|pino\|bunyan" package.json
     grep -r "createLogger\|Logger" --include="*.config.*" src/
     ```

3. **Read Logger Config File**:
   - **If JSG Logger**: Look for `loggerConfig` object with `components` section
   - **If other**: Identify available log levels, categories, and usage patterns
   - Note: Component names, emojis (JSG Logger), log levels, and special configurations

4. **Find Logger Utility Functions**:
   - Search for getter functions: `grep -r "getLogger\|createLogger" src/`
   - Identify server-side vs client-side implementations
   - Note the import paths and usage patterns

5. **Examine Existing Usage**:
   - Find files already using the logger: `grep -r "getLogger\|logger\." src/ -l | head -5`
   - Read 1-2 examples to understand the pattern
   - Note: How components are selected, how messages are structured

6. **Determine Available Components/Categories**:
   - Extract component list from config file
   - Understand naming conventions (kebab-case, camelCase, etc.)
   - Note which components are relevant to the code being debugged

**Example Discovery Process:**

```bash
# Step 1: Check for JSG Logger (ALWAYS FIRST)
grep "@crimsonsunset/jsg-logger" package.json
# Output: "@crimsonsunset/jsg-logger": "^1.7.15" ✅ FOUND - Use JSG Logger!

# Step 2: Find JSG Logger config
grep -r "loggerConfig" src/config/
# Found: src/config/logger.config.ts

# Step 3: Read the config
read_file src/config/logger.config.ts

# Step 4: Find usage examples  
grep -r "getLogger" src/ -l | head -3
read_file src/services/example.service.ts

# Step 5: Extract components
# Parse the config to find: components: { core: {...}, api: {...}, ... }
```

**If JSG Logger is not installed:**

```bash
# Step 1: Check package.json
grep "@crimsonsunset/jsg-logger" package.json
# No output - JSG Logger not found

# Step 2: Look for alternative loggers
grep -E "winston|pino|bunyan|consola" package.json

# Step 3: (Optional) Inform user
# "Note: JSG Logger (@crimsonsunset/jsg-logger) is not installed. 
#  Would you like to use JSG Logger for better structured logging?
#  For now, I'll work with [discovered logger]."
```

### Phase 1: Understand the Logger System

**After discovery, document the logger architecture:**

**Logger Type**: [JSG Logger / Winston / Pino / Console / Custom]

**Server-side Usage**:
```typescript
// Pattern discovered from utils/logger files
const loggerInstance = getServerLogger(); // or discovered pattern
const logger = loggerInstance?.getComponent('component-name');
```

**Client-side Usage**:
```typescript
// Pattern discovered from utils/logger files
const loggerInstance = getLogger(); // or discovered pattern (may be same as server)
const logger = loggerInstance?.getComponent('component-name');
```

**Available Components/Categories**: [Extract from config file]
- Example: `api`, `database`, `ui`, `core`, etc.
- Note emojis if present (helps identify logs in output)
- Note log levels for each component

**Log Levels** (standard across most loggers):
- `logger.debug()` - Detailed debugging info (function entry/exit, variable values)
- `logger.info()` - General informational messages (workflow steps, success states)
- `logger.warn()` - Warning conditions (missing optional data, fallback behavior)
- `logger.error()` - Error conditions (exceptions, failures, validation errors)

### Phase 2: Strategic Log Placement

**Add logs at key decision points:**

1. **Function Entry/Exit**:
   ```typescript
   logger?.debug('Function started', { inputParam1, inputParam2 });
   // ... function logic ...
   logger?.debug('Function completed', { result });
   ```

2. **Conditional Branches**:
   ```typescript
   if (condition) {
     logger?.debug('Taking branch A', { condition, relatedData });
   } else {
     logger?.debug('Taking branch B', { condition, relatedData });
   }
   ```

3. **API Calls & External Operations**:
   ```typescript
   logger?.info('Making API request', { url, method, payload });
   const response = await fetch(url, options);
   logger?.info('API response received', { status: response.status, data });
   ```

4. **Error Handling**:
   ```typescript
   try {
     // operation
   } catch (error) {
     logger?.error('Operation failed', {
       error: error instanceof Error ? error.message : String(error),
       stack: error instanceof Error ? error.stack : undefined,
       context: relevantContextData,
     });
   }
   ```

5. **Data Transformations**:
   ```typescript
   logger?.debug('Transforming data', { before: inputData });
   const transformed = transform(inputData);
   logger?.debug('Data transformed', { after: transformed });
   ```

6. **State Changes**:
   ```typescript
   logger?.debug('State update', { 
     previous: previousState, 
     next: nextState,
     trigger: 'user action / api response / etc'
   });
   ```

### Phase 3: Automated Debug Loop

**After adding logs, create a feedback loop:**

#### A. Server-Side Debugging (Terminal Logs)

1. **Run the Application/Test**:
   - Start dev server: `npm run dev` (or `yarn dev`, check `package.json` scripts)
   - Execute the code path being debugged
   - Capture terminal output with log messages

2. **Consume Logs Programmatically**:
   ```bash
   # Read terminal output to analyze logs
   cat terminals/[terminal-id].txt
   
   # Filter by log patterns (adapt to your logger format)
   # For JSG Logger: grep by emojis
   grep -E "(🎯|🔍|🎵|🏙️|🔌|🎨|💾|📝)" terminals/[terminal-id].txt
   
   # For Winston/Pino: grep by level
   grep -E "(error|warn|info|debug)" terminals/[terminal-id].txt
   
   # For generic: grep by component names discovered in config
   grep -E "(API|DATABASE|CORE)" terminals/[terminal-id].txt
   ```

3. **Analyze Log Output**:
   - Look for error patterns: `grep "error\|ERROR\|failed\|Failed" terminals/*.txt`
   - Check for unexpected values in debug payloads
   - Verify control flow matches expectations
   - Identify missing or null values
   - Spot timing/ordering issues
   - Match log format to logger type (JSON for Pino, structured for Winston, etc.)

#### B. Frontend Debugging (Browser Console Logs)

**Use Cursor Browser Tools for frontend debugging:**

1. **Launch Browser & Navigate**:
   ```typescript
   // Start dev server if not running
   npm run dev (in background)
   
   // Navigate to the page
   mcp_cursor-ide-browser_browser_navigate({ url: 'http://localhost:3000/your-page' })
   ```

2. **Capture Console Logs**:
   ```typescript
   // Get all console messages (JSG Logger output, errors, warnings)
   mcp_cursor-ide-browser_browser_console_messages()
   ```

3. **Analyze Console Output**:
   - **Logger messages**: Look for structured logs from your logger (check format from discovery phase)
   - **React errors**: Hydration errors, component errors, render warnings
   - **Network issues**: Failed fetch requests, CORS errors
   - **JavaScript errors**: Uncaught exceptions, type errors, null references
   - **Performance warnings**: Slow renders, memory leaks
   - **Custom patterns**: Adapt grep/search to logger format discovered earlier

4. **Interactive Debugging**:
   ```typescript
   // Take snapshot of current page state
   mcp_cursor-ide-browser_browser_snapshot()
   
   // Interact with UI elements to trigger logs
   mcp_cursor-ide-browser_browser_click({ element: 'Submit button', ref: 'e123' })
   
   // Check console for new logs after interaction
   mcp_cursor-ide-browser_browser_console_messages()
   
   // Take screenshot if visual inspection needed
   mcp_cursor-ide-browser_browser_take_screenshot({ filename: 'debug-state.png' })
   ```

5. **Network Request Analysis**:
   ```typescript
   // Get all network requests since page load
   mcp_cursor-ide-browser_browser_network_requests()
   
   // Look for failed requests, slow responses, incorrect payloads
   ```

#### C. Combined Server + Frontend Debugging

**For full-stack debugging, monitor both simultaneously:**

1. **Setup**: 
   - Dev server running in terminal (background)
   - Browser open to the page under test
   - Ready to capture both server logs and browser console

2. **Trigger the flow**:
   - Interact with UI via browser tools
   - Immediately check browser console for client-side logs
   - Check terminal output for server-side API logs
   - Compare timestamps to understand request/response flow

3. **Correlation**:
   - Match client-side API request logs (🔌 [API]) with server-side route logs
   - Verify data transformations on both sides
   - Identify where data gets corrupted or lost
   - Check for timing issues (race conditions, async problems)

#### D. Iterate & Fix

1. **Identify Root Cause**:
   - Based on log analysis (terminal + browser), pinpoint the issue
   - Look for patterns: repeated errors, null values, wrong types
   - Check error stack traces for file/line numbers

2. **Make Targeted Fixes**:
   - Fix the specific issue identified in logs
   - Add more granular logs if root cause unclear

3. **Re-run & Verify**:
   - Re-run the flow (refresh browser or re-trigger action)
   - Check both terminal and browser logs
   - Verify logs show expected behavior

4. **Loop Until Resolved**:
   - Continue running → analyzing logs (both sides) → fixing → re-running
   - Each iteration should narrow down the issue
   - Stop when logs show healthy execution flow on both client and server

### Phase 4: Log Quality Standards

**Good Log Practices:**
- ✅ Include relevant context objects: `{ userId, venueId, requestId }`
- ✅ Use consistent component names (match `logger.config.ts`)
- ✅ Choose appropriate log level (debug vs info vs warn vs error)
- ✅ Include data transformations (before/after)
- ✅ Log both success and failure paths
- ✅ Use optional chaining: `logger?.debug()` (handles null logger)

**Bad Log Practices:**
- ❌ Logging sensitive data (passwords, API keys, tokens)
- ❌ Excessive logging in loops (use sampling or aggregate)
- ❌ Console.log instead of logger (bypasses structured logging)
- ❌ Missing error context (log error message AND stack trace)
- ❌ Vague messages without data: `logger?.debug('here')` 

### Phase 5: Component Selection Guide

**Dynamically choose the right component** for your code:

1. **Check Config File First**:
   - Re-read the logger config to see available components
   - Look for domain-specific components (e.g., `chat`, `search`, `payment`)
   - Look for layer-specific components (e.g., `api`, `database`, `ui`)

2. **Match Code Location to Component**:
   - **API Routes** (`src/app/api/*`, `pages/api/*`): Use `api` or API-specific component
   - **Services** (`src/services/*`): Use domain-specific component matching the service
   - **Components** (`src/components/*`): Use `ui` or feature-specific component
   - **Hooks** (`src/hooks/*`, `hooks/*`): Use related feature component
   - **Utils** (`src/utils/*`, `lib/*`): Use `core` or `utils` if available
   - **Database** (Prisma, queries, ORM): Use `database`, `db`, or similar
   - **Background Jobs**: Use `jobs`, `queue`, `worker`, or similar

3. **When Component Doesn't Exist**:
   - Use the closest related component available
   - OR create new component by adding to logger config:
     ```typescript
     // In logger.config.ts (or equivalent)
     components: {
       newComponent: {
         emoji: '🎯',  // Choose unique emoji (if using JSG Logger)
         color: '#70e000',  // Choose color
         name: 'NEW-COMPONENT',  // Display name
         level: 'debug',  // Default log level
       }
     }
     ```
   - Document the new component in project docs

4. **Sub-Components / Nested Naming**:
   - Some loggers support: `logger.getComponent('api.parse-event')`
   - Naming convention: `parent.child` or `parent-child`
   - Check existing usage for project conventions

### Example Workflow

#### Discovery Example

**User**: "add jsg logs to the payment processing flow"

**AI Discovery Process**:

1. **Find logger config**:
   ```bash
   grep -r "logger" --include="*.config.*" src/
   # Found: src/config/logger.config.ts
   ```

2. **Read config**:
   ```typescript
   // src/config/logger.config.ts
   export const loggerConfig = {
     components: {
       api: { emoji: '🔌', level: 'info' },
       payment: { emoji: '💳', level: 'debug' },
       database: { emoji: '💾', level: 'info' },
     }
   }
   ```

3. **Find logger utils**:
   ```bash
   grep -r "getLogger" src/utils/
   # Found: src/utils/logger.util.ts
   ```

4. **Check usage pattern**:
   ```typescript
   // src/services/auth.service.ts (example)
   import { getServerLogger } from '@/utils/logger.util';
   const logger = getServerLogger()?.getComponent('auth');
   logger?.info('User authenticated', { userId });
   ```

5. **Proceed with logging**: Now we know:
   - Use `getServerLogger()` from `@/utils/logger.util`
   - Payment component exists: `'payment'`
   - Pattern: `logger?.info('message', { data })`

#### Server-Side Example (Generic)

**User**: "add jsg logs to the chat submission flow"

**AI Response** (using discovered patterns):

1. **Identify files**: `ChatInterface.component.tsx`, `api/parse-event/route.ts`, `ai-parser.service.ts`

2. **Add strategic logs** (using discovered logger pattern):
   ```typescript
   // ChatInterface.component.tsx
   import { getLogger } from '@/utils/logger.util'; // or discovered path
   const logger = getLogger()?.getComponent('chat'); // or discovered component
   
   const handleSubmit = async () => {
     logger?.info('User submitted chat message', { 
       messageLength: inputText.length, 
       venueId 
     });
     
     try {
       const response = await fetch('/api/parse-event', { ... });
       logger?.info('Parse response received', { 
         success: response.ok, 
         status: response.status 
       });
     } catch (error) {
       logger?.error('Chat submission failed', {
         error: error instanceof Error ? error.message : String(error),
         stack: error instanceof Error ? error.stack : undefined,
       });
     }
   };
   ```

3. **Run & Capture**:
   ```bash
   npm run dev  # Or discovered dev command from package.json
   # User performs test action
   # Check terminals/X.txt for log output
   ```

4. **Analyze Logs** (using discovered log format):
   - Look for component identifier (emoji, name, or prefix from config)
   - Verify message data structure
   - Check for error logs with stack traces
   - Confirm expected workflow

5. **Iterate**:
   - If logs reveal issue, fix it
   - Re-run and verify logs show expected behavior
   - Continue until logs show healthy execution

#### Frontend Example with Browser Tools

**User**: "debug why the chat interface isn't submitting properly"

**AI Response** (using discovered patterns):

1. **Add Client-Side Logs**:
   ```typescript
   // ChatInterface.component.tsx (or discovered component path)
   import { getLogger } from '@/utils/logger.util'; // or discovered path
   const logger = getLogger()?.getComponent('chat'); // or closest component
   
   const handleSendMessage = () => {
     logger?.debug('Send button clicked', { 
       inputText, 
       hasText: inputText.trim().length > 0,
       venueId 
     });
     
     if (!inputText.trim()) {
       logger?.warn('Empty message, not submitting');
       return;
     }
     
     logger?.info('Calling submitMessage');
     submitMessage(inputText);
   };
   ```

2. **Launch Browser & Test**:
   ```typescript
   // Navigate to submit page (adapt URL to project)
   mcp_cursor-ide-browser_browser_navigate({ url: 'http://localhost:3000/submit' })
   
   // Snapshot to see page state and get element refs
   mcp_cursor-ide-browser_browser_snapshot()
   
   // Interact with UI (refs from snapshot)
   mcp_cursor-ide-browser_browser_click({ element: 'Chat input field', ref: 'e42' })
   mcp_cursor-ide-browser_browser_type({ element: 'Chat input field', ref: 'e42', text: 'test message' })
   mcp_cursor-ide-browser_browser_click({ element: 'Send button', ref: 'e55' })
   ```

3. **Capture Console Logs**:
   ```typescript
   mcp_cursor-ide-browser_browser_console_messages()
   ```
   
   **Look for** (adapt to discovered logger format):
   - Logger messages with component identifier (emoji, prefix, or name)
   - Specific log messages: `"Send button clicked"`, `"Calling submitMessage"`
   - Any React errors or warnings
   - Network request logs

4. **Analyze Console Output**:
   - **Example finding**: `[CHAT] Send button clicked { inputText: '', hasText: false }`
   - **Issue Identified**: Input text is empty even though we typed it
   - **Hypothesis**: State not updating, or wrong ref

5. **Add More Granular Logs**:
   ```typescript
   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
     const newValue = e.target.value;
     logger?.debug('Input changed', { newValue, length: newValue.length, previousValue: inputText });
     setInputText(newValue);
   };
   ```

6. **Test Again & Analyze**:
   - Type in input again, check console
   - **Found**: No "Input changed" logs firing
   - **Root Cause**: `onChange` handler not attached to textarea

7. **Fix & Verify**:
   - Add `onChange={handleInputChange}` to textarea
   - Refresh and test again
   - Console shows expected logs with correct values
   - **Fixed!**

#### Full-Stack Debug Example

**User**: "chat submission returns 500 error"

**AI Response** (using discovered patterns):

1. **Add Logs on Both Sides**:
   
   **Client** (ChatInterface.component.tsx):
   ```typescript
   import { getLogger } from '@/utils/logger.util'; // discovered path
   const logger = getLogger()?.getComponent('chat'); // discovered component
   
   logger?.info('Sending parse request', { text, venueId, endpoint: '/api/parse-event' });
   const response = await fetch('/api/parse-event', { method: 'POST', body: JSON.stringify({ text, venueId }) });
   logger?.info('Parse response', { status: response.status, ok: response.ok });
   ```
   
   **Server** (api/parse-event/route.ts):
   ```typescript
   import { getServerLogger } from '@/utils/logger.util'; // discovered path
   const logger = getServerLogger()?.getComponent('api'); // discovered component
   
   logger?.info('Parse request received', { bodyText: body.text?.substring(0, 50), venueId: body.venueId });
   
   try {
     const result = await parseEventText(body.text, body.venueId);
     logger?.info('Parse successful', { hasArtist: !!result.artist });
   } catch (error) {
     logger?.error('Parse failed', { error, body });
   }
   ```

2. **Test & Capture Both**:
   - Browser: Type message and submit
   - Browser console: `mcp_cursor-ide-browser_browser_console_messages()`
   - Terminal: `cat terminals/5.txt | tail -n 50`

3. **Analyze** (adapt to discovered log format):
   
   **Browser Console Shows**:
   ```
   [CHAT] Sending parse request { text: 'arcade fire at 9pm', venueId: 'v123' }
   [API] API Request { method: POST, url: /api/parse-event }
   [CHAT] Parse response { status: 500, ok: false }
   ```
   
   **Terminal Shows** (format depends on logger type):
   ```
   [API] Parse request received { bodyText: 'arcade fire at 9pm', venueId: 'v123' }
   [API] Parse failed { error: 'OPENROUTER_API_KEY is not defined', body: {...} }
   ```

4. **Root Cause Identified**:
   - Request reaches server correctly
   - venueId is correct
   - **Missing environment variable**: `OPENROUTER_API_KEY`

5. **Fix**: Add API key to `.env.local` (or appropriate env file)

6. **Verify**: 
   - Test again
   - Browser console: `status: 200, ok: true`
   - Terminal: `Parse successful { hasArtist: true }`
   - **Fixed!**

### Integration with Existing Workflows

- **Works with**: `fl` (fix lints), `rd` (run dev), `rfn` (read first), `pw` (playwright browser automation)
- **Before logging**: Run `rfn` to understand code flow
- **After logging**: Run `rd` to test and capture logs
- **Frontend debugging**: Use Cursor browser tools to capture console logs and interact with UI
- **If logs reveal lint issues**: Run `fl` to fix
- **Log terminal ID**: Note which terminal has dev server for log analysis

### Quick Reference: Browser Tools for Frontend Debugging

**Navigation & Setup**:
- `mcp_cursor-ide-browser_browser_navigate({ url: 'http://localhost:3000/page' })` - Open page
- `mcp_cursor-ide-browser_browser_snapshot()` - Get page structure with element refs

**Log Capture**:
- `mcp_cursor-ide-browser_browser_console_messages()` - **Most important**: Get all console logs including JSG Logger output
- `mcp_cursor-ide-browser_browser_network_requests()` - See all network requests/responses

**Interaction** (to trigger logs):
- `mcp_cursor-ide-browser_browser_click({ element: 'description', ref: 'e123' })` - Click element
- `mcp_cursor-ide-browser_browser_type({ element: 'input', ref: 'e42', text: 'test' })` - Type text
- `mcp_cursor-ide-browser_browser_press_key({ key: 'Enter' })` - Press keyboard key
- `mcp_cursor-ide-browser_browser_wait_for({ time: 2 })` - Wait for async operations

**Visual Debugging**:
- `mcp_cursor-ide-browser_browser_take_screenshot({ filename: 'debug.png' })` - Screenshot current state

**Tab Management**:
- `mcp_cursor-ide-browser_browser_tabs({ action: 'list' })` - List open tabs
- `mcp_cursor-ide-browser_browser_tabs({ action: 'new' })` - New tab for parallel testing

### Summary

**Command trigger**: "add jsg logs", "jsg log this", "debug with logs"

**Process**:
1. **Check for JSG Logger** - Always check `package.json` for `@crimsonsunset/jsg-logger` first
   - ✅ If found: Use JSG Logger (preferred) - skip checking other loggers
   - ⚠️ If not found: Fall back to discovering other logging solutions (Winston, Pino, etc.)
2. **Discover** logger setup (config files, utils, existing usage patterns)
3. **Import** logger utilities using discovered paths
4. **Get component** instance with appropriate name (from discovered components)
5. **Add strategic logs** at decision points (using discovered patterns)
6. **Run code** to generate logs
7. **Analyze logs from BOTH sources**:
   - **Server logs**: `cat terminals/[id].txt` or `grep` for patterns
   - **Browser logs**: `mcp_cursor-ide-browser_browser_console_messages()`
8. **Fix issues** revealed by logs (client-side or server-side)
9. **Loop until resolved**

**Key principle**: Logs are not just for humans to read—AI should:
- **Prioritize JSG Logger** when available (it's the preferred solution)
- **Discover** the project's logger setup automatically
- **Adapt** to different logger types (JSG Logger, Winston, Pino, console, custom)
- **Consume** logs from both terminal AND browser console
- **Understand** runtime behavior and self-correct bugs without user intervention

**Debug Strategy**:
- **Backend issues**: Terminal logs + server-side logging
- **Frontend issues**: Browser console + client-side logging + React errors
- **Full-stack issues**: Monitor BOTH simultaneously to trace request/response flow
- **Prefer JSG Logger**: Always use JSG Logger if installed, even if other loggers exist
