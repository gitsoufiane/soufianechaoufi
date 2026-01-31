# Project Category Filter

**Priority:** P1
**Effort:** S
**Status:** Pending

## Problem

Projects page has category data defined but no filter UI:

```typescript
// app/projects/page.tsx lines 13-18
const categories = [
  { name: "All", slug: "all", description: "All projects" },
  {
    name: "Web Apps",
    slug: "web-app",
    description: "Full-stack web applications",
  },
  { name: "Tools", slug: "tool", description: "Developer tools and utilities" },
  { name: "Libraries", slug: "library", description: "Open source libraries" },
];
```

Users can't filter projects by category.

## Solution

Add category filter UI to projects page, following the blog tag filter pattern.

### Pattern Reference (BlogClient.tsx)

```tsx
// State
const [selectedCategory, setSelectedCategory] = useState<string>("all");

// Filter logic
const filteredProjects = useMemo(() => {
  if (selectedCategory === "all") return projects;
  return projects.filter((p) => p.category === selectedCategory);
}, [projects, selectedCategory]);

// UI
<div className="flex flex-wrap items-center justify-center gap-2">
  {categories.map((cat) => (
    <Badge
      key={cat.slug}
      variant={selectedCategory === cat.slug ? "default" : "outline"}
      className="cursor-pointer"
      onClick={() => setSelectedCategory(cat.slug)}
    >
      {cat.name}
    </Badge>
  ))}
</div>;
```

### Placement

Add filter between Stats section and Featured Projects section:

```
┌─────────────────────────────────────┐
│  Header                             │
├─────────────────────────────────────┤
│  Stats Cards                        │
├─────────────────────────────────────┤
│  Category: [All] [Web Apps] [Tools] │  ← NEW
├─────────────────────────────────────┤
│  Featured Projects                  │
├─────────────────────────────────────┤
│  Other Projects                     │
└─────────────────────────────────────┘
```

## Acceptance Criteria

- [ ] Category filter UI visible
- [ ] "All" selected by default
- [ ] Clicking category filters projects
- [ ] Visual distinction for selected category (default vs outline Badge)
- [ ] Results count updates when filtered
- [ ] Works with existing Featured/Other separation
- [ ] Mobile responsive

## Technical Notes

- Add `useState` for `selectedCategory`
- Add `useMemo` for `filteredProjects`
- Split filtered results into featured/other
- Update stats to reflect filtered counts
- No new components needed - use existing Badge

## Implementation

1. Add state: `const [selectedCategory, setSelectedCategory] = useState("all")`
2. Add filter logic with useMemo
3. Add filter UI between stats and projects
4. Update featured/other to use filtered results
5. Optionally update stats to show filtered counts

## Related PRDs

- [Projects Expansion](../04-content-roadmap/projects-expansion.md) - More projects to filter
