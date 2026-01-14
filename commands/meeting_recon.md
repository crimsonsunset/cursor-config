# meeting_recon

Organize Sync2Hire meeting notes from today:

0. Get the current date first (run `date` command)
1. Get all calendar events from today using the actual date
2. Find matching Notion meeting notes for each event (search for auto-generated titles like "@Today [time]")
3. Rename meeting notes to follow the Sync2Hire naming convention:
   **Format**: `[Date] @ [Time] | [Meeting Type] | [Brief Description]`
   
   **Examples**:
   - `Jan 6, 2026 @ 9AM (MST) | Stand-Up Call | Day 2 Onboarding and Technical Sync`
   - `Jan 6, 2026 @ 10AM (MST) | Partner Spring Intro | Partnership Strategy Discussion`
   
   **Meeting Types**: Stand-Up Call, Technical Onboarding, Business Strategy, Partner Discussion, Team Sync, etc.

4. Move all Sync2Hire meeting notes to the 🔄 Sync2Hire folder:
   - **Destination**: Page ID `2df24584-254b-8040-94d3-dfb56506b0be`
   - This folder lives under: `📁 Job Notes` → `🔄 Sync2Hire`

5. Add Notion meeting notes links to calendar event descriptions using this format:
   ```
   📝 Meeting Notes: [Notion URL]
   
   [One-line summary from the meeting notes]
   ```

6. Show me a summary with links to both the calendar events and Notion pages

**Note**: This command is specific to Sync2Hire work meetings. All notes go to the same Sync2Hire folder.
