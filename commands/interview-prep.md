# interview-prep

Execute comprehensive interview preparation workflow to create a battle-tested interview prep document.

**Inputs Required:** COMPANY url and ROLE url (provided after invocation)

---

## PHASE 1: CONTEXT GATHERING

1. **Read candidate's complete experience** from https://resume.joesangiorgio.com
   - Extract full work history, technical skills, leadership experience
   - Note key achievements and technologies across all roles
   - Understand career progression and expertise areas

2. **Read job search context** from `/Users/joe/Desktop/Repos/Personal/priv/job-search/job-search.md`
   - Understand overall job search strategy and status
   - Note technical stack, experience, and preferences
   - Identify current pipeline and priorities

3. **Read structural template** from `/Users/joe/Desktop/Repos/Personal/priv/job-search/interview-notes/barnwell-bio.md`
   - Use this as the format/structure template
   - Match the tone, format, and section organization
   - Note the level of detail and strategic thinking

---

## PHASE 2: COMPREHENSIVE COMPANY RESEARCH (Be Relentless)

Conduct parallel multi-angle web searches covering:

**Essential Searches (Run These in Parallel):**
1. `[Company Name] company overview products services 2024 2025`
2. `[Company Name] leadership team founders executives`
3. `[Company Name] funding valuation revenue financials`
4. `[Company Name] technology stack engineering culture`
5. `[Company Name] recent news announcements 2024 2025`
6. `[Company Name] competitors market position`
7. `[Company Name] employee reviews Glassdoor Blind culture`
8. `[Company Name] case studies customer success stories`

**Research Goals:**
- What does this company actually do? (Products, services, business model)
- Who runs it? (Founders, leadership team, their backgrounds)
- How are they doing? (Funding, growth, market position)
- What's their tech like? (Stack, engineering practices, scale)
- What's happening now? (Recent news, product launches, pivots)
- How do they compare? (Competitors, market positioning, differentiators)
- What's it like there? (Culture, values, employee sentiment)

**Quality Check:** Can you confidently explain this company to someone in 2 minutes? Can you name 3 key differentiators? If not, keep searching.

---

## PHASE 3: JD ANALYSIS

Extract and Analyze:
1. Core responsibilities (what will you actually do day-to-day?)
2. Required technical skills (hard requirements)
3. Preferred technical skills (nice-to-haves)
4. Leadership/soft skill requirements
5. Team structure hints (distributed? size? reporting?)
6. Product/platform focus (what are you building?)

---

## PHASE 4: BUILD THE PREP DOCUMENT

Create `/Users/joe/Desktop/Repos/Personal/priv/job-search/interview-notes/[company-name-lowercase].md`

### Required Sections (Follow barnwell-bio.md structure exactly):

#### 1. Role Overview
- Position title and location (include hybrid/remote details)
- One-line role summary
- Key focus areas from JD
- Tech stack (confirmed from research + JD)

#### 2. Strongest Angles (CRITICAL)
Map candidate's experience to this role's needs. For each angle:
- State the requirement from JD
- Connect to specific candidate experience (be specific: company, project, tech)
- Explain why it's a strong fit
- Include concrete examples they can reference

**Common Angles to Cover:**
- Tech stack matches (React, Node, NestJS, Python, AWS, etc.)
- Domain experience (ML, platform engineering, fintech, etc.)
- Leadership experience (team size, distributed teams, etc.)
- System architecture experience
- CI/CD and infrastructure
- Code quality and engineering culture
- Relevant company culture matches

#### 3. Company Deep Dive
Synthesize research into:
- **What They Do**: Products, services, business model
- **Market Position**: Industry, competitors, differentiators
- **Leadership**: Founders/key executives and their backgrounds
- **Scale & Growth**: Team size, funding, revenue indicators
- **Technology**: Confirmed tech stack, engineering practices
- **Recent Developments**: Major announcements, pivots, launches (2024-2025)
- **Culture Indicators**: Values, working style, employee sentiment

#### 4. JD Requirements Breakdown
Create a detailed mapping table:

| JD Requirement | Candidate Experience | Strength | Notes |
|----------------|---------------------|----------|-------|
| [Specific tech/skill] | [Specific experience] | ✅ Strong / ⚠️ Moderate / ❌ Gap | [How to position/address] |

**After the table:**
- **Strongest Matches**: Top 3-5 requirements where candidate excels
- **Moderate Fits**: Areas with some experience but could be stronger
- **Gaps to Address**: Requirements where candidate is weak (be honest)

#### 5. Prepared Answers
Write full, rehearsable answers to:

**A. "Walk me through your background / Tell me about yourself"**
- Tailor to THIS role's focus areas
- Emphasize relevant experience
- Connect the dots between past work and this role

**B. "Why [Company Name]?"**
- Show you understand their business and mission
- Connect their needs to your strengths
- Demonstrate genuine interest (not generic)

**C. "Why this role?"**
- Address the specific job, not just the company
- Highlight what excites you about the work
- Show strategic thinking about your career

**D. For each identified GAP:**
- Acknowledge it directly but briefly
- Pivot to transferable skills
- Show learning agility with examples
- Position it as an opportunity for growth

#### 6. Questions to Ask
Provide 10-15 strategic questions organized by category:
- **Role/Team Questions**: Day-to-day, team structure, success metrics
- **Product/Technical Questions**: Architecture, scale, technical challenges
- **Process Questions**: Development practices, deployment, collaboration
- **Culture Questions**: Values, decision-making, work style
- **Growth Questions**: Learning opportunities, career trajectory

Make questions SPECIFIC to this company/role, not generic.

#### 7. Key Talking Points
Bullet list of 8-12 strategic points to weave into conversation:
- Specific projects/achievements that align with role needs
- Technical decisions and their business impact
- Leadership examples (if applicable)
- How you'd approach challenges mentioned in JD
- Your philosophy on [relevant topic from JD]

#### 8. Interview Style Reminders
Quick tactical reminders:
- Be conversational, not rehearsed
- Use STAR format for behavioral questions
- Ask clarifying questions when needed
- Take notes during the conversation
- Show enthusiasm without overselling
- Remember: you're evaluating them too

#### 9. Red Flags to Watch For
List 3-5 potential concerns to listen for during interview:
- Based on company research (e.g., Glassdoor reviews, funding concerns)
- Based on role requirements (e.g., unclear ownership, scope creep)
- Based on candidate's preferences (e.g., travel, on-call, tech debt)

#### 10. Day-of Checklist
- [ ] Review this entire doc (15-20 min)
- [ ] Review relevant study docs from `/Users/joe/Desktop/Repos/Personal/priv/job-search/study-notes/` [list which ones]
- [ ] Prepare 2-3 questions based on recent company news
- [ ] Test tech setup (if remote)
- [ ] Have examples ready for top 5 requirements

#### 11. Competitive Advantages Summary
Quick-hit list of why candidate is a strong fit:
- 3-5 bullet points of strongest differentiators
- Frame these as "what makes me uniquely positioned for this role"

---

## PHASE 5: QUALITY ASSURANCE

Before delivering, verify:
- [ ] All sections present and complete
- [ ] Company research is current (2024-2025)
- [ ] JD requirements are thoroughly mapped
- [ ] Gaps are addressed with honest, strong responses
- [ ] Questions are specific to this company, not generic
- [ ] Talking points are concrete with examples
- [ ] Tech stack details are accurate
- [ ] Document matches barnwell-bio.md format and tone

---

## EXECUTION PROTOCOL

1. Wait for user to provide COMPANY URL and ROLE URL after invoking this command
2. Read resume website FIRST before any other action
3. Then proceed with Phase 1 file reads
4. Execute all web searches in parallel for efficiency
5. Create the comprehensive interview prep document
6. Verify all quality checks pass before delivery

---

**Quality Bar:** Would this document give you confidence walking into a final-round interview? If not, keep researching and refining.

**Deliverable:** A complete, strategic interview prep document that makes the candidate feel prepared, confident, and ready to have a director-level conversation about both the technical work and the strategic fit.


