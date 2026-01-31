# Portfolio PRDs

Product Requirements Documents for soufianechaoufi.com enhancements.

## Priority Matrix

| Pri | PRD | Effort | Status | Description |
|-----|-----|--------|--------|-------------|
| P1 | [Project Category Filter](02-features/project-category-filter.md) | S | Pending | Filter UI for projects page |
| P1 | [Book Interface Consolidation](03-tech-debt/book-interface-consolidation.md) | S | ✅ Complete | Fix type mismatch |
| P2 | [Blog Articles](04-content-roadmap/blog-articles.md) | Ongoing | 📝 In Progress | Content strategy (4 articles) |
| P2 | [Projects Expansion](04-content-roadmap/projects-expansion.md) | Ongoing | 📝 In Progress | Content strategy (2 projects) |
| P3 | [Testimonials](02-features/testimonials.md) | M | Pending | Social proof section |
| P3 | [Three.js Integration](02-features/three-js-integration.md) | L | Pending | Visual polish |

## Effort Key

- **S** - Small (< 2 hours)
- **M** - Medium (2-8 hours)
- **L** - Large (> 8 hours)

## Folder Structure

```
prd/
├── README.md                    # This file
├── 02-features/                 # Feature PRDs
├── 03-tech-debt/                # Technical debt PRDs
└── 04-content-roadmap/          # Content planning PRDs
```

## PRD Template

Each PRD follows this structure:

```markdown
# [Feature Name]

**Priority:** P1/P2/P3
**Effort:** S/M/L
**Status:** Pending | In Progress | Complete

## Problem

[What problem does this solve?]

## Solution

[How will we solve it?]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Technical Notes

[Implementation details, dependencies, etc.]
```

## Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Contact page | Social links only | Low maintenance, sufficient for portfolio |
| Analytics | Skip for now | Can add later if needed |
