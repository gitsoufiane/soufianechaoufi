# Projects Expansion Content Strategy

**Priority:** P2
**Effort:** Ongoing
**Status:** In Progress
**Last Updated:** 2026-01-30

## Problem

Only 1 project (SheSwap) listed. Need more projects to:

- Demonstrate range of skills
- Show work history
- Provide portfolio depth
- Support category filtering

## Current State

| Project            | Category   | Status     | Featured |
| ------------------ | ---------- | ---------- | -------- |
| Personal Portfolio | web-app    | maintained | Yes      |
| SheSwap            | mobile-app | ongoing    | Yes      |

## Project Categories

From project types:

- `web-app` - Full-stack web applications
- `tool` - Developer tools and utilities
- `library` - Open source libraries
- `mobile-app` - Mobile applications
- `other` - Miscellaneous

## Project Ideas by Category

### Web Apps

- [x] Portfolio website (this site!)
- [ ] E-commerce demo
- [ ] Dashboard/admin panel
- [ ] Blog platform
- [ ] Task management app

### Tools

- [ ] CLI tool (npm package)
- [ ] VS Code extension
- [ ] Browser extension
- [ ] Development utility

### Libraries

- [ ] React component library
- [ ] Custom hooks collection
- [ ] Utility functions package

### Open Source Contributions

- [ ] Document meaningful PRs to popular repos
- [ ] Fork and improve existing projects

## Content Requirements

Each project needs (from Project interface):

```typescript
{
  id: string;
  title: string;
  description: string;          // Card preview
  longDescription?: string;     // Detail view
  technologies: string[];       // Tech badges
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;            // Screenshot
  featured?: boolean;
  category: string;
  status: 'completed' | 'ongoing' | 'maintained';
  publishedAt: string;
  highlights?: string[];        // Key features
}
```

## Quality Checklist

Before adding a project:

- [ ] Has working demo OR detailed screenshots
- [ ] README is complete
- [ ] Code is clean and well-documented
- [ ] Demonstrates relevant skills
- [ ] Different from existing projects

## Prioritization

**High priority (add first):**

1. This portfolio site - meta but relevant
2. Any production apps used by real users
3. Open source with stars/usage

**Medium priority:** 4. Side projects demonstrating specific skills 5. Tutorial/learning projects with unique twists

**Low priority:** 6. Basic tutorials without differentiation 7. Incomplete or abandoned projects

## Related PRDs

- [Project Category Filter](../02-features/project-category-filter.md) - Needs projects to filter
