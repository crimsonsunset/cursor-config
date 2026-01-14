# meeting_recap

Give me a quick recap of what we talked about in today's Sync2Hire meetings:

0. Get the current date first (run `date` command)
1. Get all calendar events from today
2. For each calendar event, extract the Notion meeting notes link from the description (if it exists)
3. Fetch each Notion page and extract:
   - Meeting title
   - Time
   - Key discussion points from the summary section
   - Action items (if any)
4. Present a concise recap in this format:

```
📅 [Date] Meeting Recap

## [Time] - [Meeting Title]
**Key Points:**
- [Point 1]
- [Point 2]
- [Point 3]

**Action Items:**
- [ ] [Action item]

---

## [Time] - [Next Meeting]
...
```

**Note**: If no Notion notes are found for a meeting, just show the calendar event title and note "No meeting notes available yet."







