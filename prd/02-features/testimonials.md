# Testimonials

**Priority:** P3
**Effort:** M
**Status:** Pending

## Problem

No social proof on the site. Potential clients/employers can't see:
- What others say about working with me
- Professional reputation
- Collaboration style

## Solution

Add testimonials section (likely on homepage or About page).

### Layout Options

**Option A: Carousel**
```
What People Say
═══════════════════════════════════════
┌─────────────────────────────────────┐
│  "Quote text here..."               │
│                                     │
│  — Name, Role at Company           │
│     [Avatar]                        │
└─────────────────────────────────────┘
        ○ ● ○ ○  (pagination)
```

**Option B: Grid**
```
What People Say
═══════════════════════════════════════
┌──────────────┐  ┌──────────────┐
│ "Quote..."   │  │ "Quote..."   │
│ — Name       │  │ — Name       │
└──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│ "Quote..."   │  │ "Quote..."   │
│ — Name       │  │ — Name       │
└──────────────┘  └──────────────┘
```

**Option C: Marquee/Scroll**
Continuous scrolling testimonials banner.

## Acceptance Criteria

- [ ] Testimonials displayed on site
- [ ] Name, role, company visible
- [ ] Avatar/photo (optional)
- [ ] Responsive layout
- [ ] Accessible
- [ ] Easy to add new testimonials

## Technical Notes

### Data Structure

```typescript
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  relationship?: 'colleague' | 'manager' | 'client' | 'mentee';
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Soufiane is an exceptional developer...',
    author: 'Jane Doe',
    role: 'Engineering Manager',
    company: 'Tech Corp',
    relationship: 'manager',
  },
];
```

### Component Options

1. **Simple Cards** - Use existing Card component
2. **Embla Carousel** - Add embla-carousel-react for carousel
3. **Framer Motion** - Animate with existing Framer Motion

## Content Sources

Unresolved question from plan:

> **Testimonials source**: LinkedIn recommendations? Colleague quotes?

Options:
1. LinkedIn recommendations (ask permission to quote)
2. Direct quotes from colleagues
3. Client feedback (if applicable)
4. Open source collaboration feedback

## Placement

- **Homepage** - Below featured projects
- **About page** - Social proof section
- **Both** - Shorter version on home, full on about

## Related PRDs

- [About Page](../01-content/about-page.md) - Potential container
