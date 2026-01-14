# read_docs

Perform comprehensive document analysis and intelligence briefing:

## Documentation Structure Assessment
1. **Get current date first** with `date` command for accurate analysis timestamps
2. **Check for MD files** - search for them first (common place: `docs/` directory)
   - If `docs/` doesn't exist or MD files don't exist: **Bootstrap Mode** - Create foundational documentation structure
   - If MD files or `docs/` exists: **Analysis Mode** - Read existing documentation thoroughly

## Bootstrap Mode (First Time in Repo)
Create `docs/` structure with foundational files:
- `docs/next-session.md` (working document for active session planning)
- `docs/roadmap.md` (complete project roadmap and historical progress)
- `docs/system/` directory for system-specific documentation

## Analysis Mode (Existing Documentation)
Read documentation files top to bottom:
- `docs/next-session.md` - Current development context and active priorities
- `docs/roadmap.md` - Project overview, phases, and historical progress
- `docs/state-resolution.md` - Technical architecture and design decisions
- `docs/system/*.md` - System-specific technical documentation

## Document Discovery & Processing
- Scan and catalog all document types in workspace/specified folder
- Auto-convert using MarkItDown for: `.pdf, .docx, .pptx, .xlsx, .html, .rtf, .epub`
- Parse directly: `.md, .txt, .json, .yaml, .csv, .toml`
- Report discovery: List all documents found with types and sizes

## Individual Document Analysis
Create a digest for each document including:
- Document type and purpose
- Key findings and main points
- Important data, metrics, or decisions
- Stakeholders or roles mentioned
- Dates, timelines, or versions noted

## Synthesis & Intelligence
Analyze relationships between documents:
- Cross-reference information and identify connections
- Spot contradictions, gaps, or inconsistencies
- Identify patterns and recurring themes
- Map out project timeline and evolution

## Provide Comprehensive Synthesis
- **Executive Summary**: What this project/effort is about
- **Key Insights**: Reading between the lines and implications
- **Stakeholder Map**: Who's involved and their roles
- **Current State**: Where things stand based on latest information
- **Critical Issues**: Problems, blockers, or concerns identified
- **Opportunities**: Potential improvements or next steps

Present output as an intelligence briefing with:
- Documentation structure status (bootstrapped vs. existing)
- Document inventory with brief descriptions
- Individual document digests
- Cross-document analysis and synthesis
- Strategic insights and recommendations





