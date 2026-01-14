# find-mcp

## Finding MCP (Model Context Protocol) Servers

When searching for MCP servers or integrations, use this search strategy:

### **Step 1: MCP Registries First (Most Reliable)**
Search these dedicated MCP directories:
- `site:free-mcp-servers.app [service name] mcp`
- `site:mcpnow.io [service name] mcp server`
- `site:mcpservers.org [service name]`
- `site:smithery.ai [service name] mcp`

### **Step 2: GitHub Topics & Organizations**
- `site:github.com topic:mcp-server [service name]`
- `site:github.com topic:model-context-protocol [service name]`
- `site:github.com/modelcontextprotocol [service name]`
- Look at stars/forks/recent updates to gauge quality

### **Step 3: NPM Packages**
- `site:npmjs.com "mcp" [service name]`
- `"@modelcontextprotocol" [service name]`
- `[service-name]-mcp OR mcp-[service-name]`

### **Step 4: Known MCP Authors**
- Check GitHub profiles of authors of existing MCP servers you use
- Look at their other repositories for related integrations
- Example: If using `@gongrzhe/server-gmail-autoauth-mcp`, check what else @gongrzhe built

### **Red Flags (Pivot Strategy)**
If search results show:
- ❌ Consumer apps/products instead of developer tools
- ❌ General API documentation without MCP mentions
- ❌ Same irrelevant results after 2-3 attempts

**Then pivot immediately to:**
1. Try MCP registry search (Step 1) if not done yet
2. Search for "awesome-mcp" or "[service] mcp github" directly
3. Check if related service has MCP (e.g., if no Calendar MCP, check Sheets/Docs authors)

### **Comparison Criteria**
When multiple options found, prioritize:
1. ⭐ GitHub stars (>100 = established, >500 = popular)
2. 📅 Recent updates (last 3 months = actively maintained)
3. 📦 Installation method (npx > npm global > local build)
4. 🔐 OAuth compatibility with existing credentials
5. 📚 Documentation quality
6. 👥 Community activity (forks, contributors, issues)

### **Example: Finding Google Calendar MCP**
✅ **Good**: `site:free-mcp-servers.app google calendar`  
✅ **Good**: `site:github.com topic:mcp-server google calendar`  
✅ **Good**: `"google-calendar-mcp" OR "mcp-google-calendar" github stars:>50`  
❌ **Bad**: `google calendar integration tool` (returns consumer apps)  
❌ **Bad**: `best google calendar API` (returns API docs, not MCPs)
