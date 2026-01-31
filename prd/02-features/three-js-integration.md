# Three.js Integration

**Priority:** P3
**Effort:** L
**Status:** Pending

## Problem

Three.js is configured (transpiled in next.config) but unused. Questions:
- Worth the bundle size cost?
- Where would it add value?
- Performance implications?

## Current Setup

From `next.config.ts`:
```javascript
// Three.js packages transpiled
transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']
```

Dependencies available:
- `three`
- `@react-three/fiber`
- `@react-three/drei`

## Potential Use Cases

### 1. Hero Background Animation
**Visual impact:** High
**Performance cost:** Medium-High

```
┌─────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓                               ▓  │
│  ▓   Soufiane Chaoufi           ▓  │
│  ▓   Frontend Developer         ▓  │
│  ▓                               ▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│     (3D particles/geometry)         │
└─────────────────────────────────────┘
```

Options:
- Particle field
- Geometric shapes (low-poly)
- Noise/wave effects
- Interactive mouse tracking

### 2. Skills Visualization
**Visual impact:** Medium
**Performance cost:** Medium

```
       [React]
      /       \
  [TS]───○───[Next.js]
      \       /
      [Node]
```

3D node graph of skills/technologies.

### 3. Project Showcase
**Visual impact:** Medium
**Performance cost:** High

3D gallery of project screenshots/cards.

### 4. 404 Page
**Visual impact:** Fun
**Performance cost:** Low (single page)

Interactive 3D element on error page.

## Acceptance Criteria

- [ ] Meaningful Three.js implementation
- [ ] Graceful fallback for low-power devices
- [ ] Respects `prefers-reduced-motion`
- [ ] Mobile performance acceptable
- [ ] Bundle size impact justified
- [ ] Lazy loaded (dynamic import)

## Technical Considerations

### Bundle Size
Three.js adds significant bundle size. Mitigate with:
- Dynamic imports (`next/dynamic`)
- Code splitting
- Tree shaking

```typescript
const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
});
```

### Performance
- Use `frameloop="demand"` for non-continuous animation
- Limit draw calls
- Test on mobile devices
- Provide CSS fallback

### Accessibility
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  return <StaticHero />;
}
```

## Decision Framework

| Factor | Weight | Hero BG | Skills Viz | 404 |
|--------|--------|---------|------------|-----|
| Visual impact | 30% | High | Medium | Low |
| Performance | 25% | Medium | Low | Low |
| Uniqueness | 20% | High | High | Medium |
| Effort | 25% | High | Medium | Low |

**Recommendation:** Start with 404 page (low risk, fun) or skills viz (differentiated).

## Unresolved Questions

From plan:
> **Three.js**: Worth bundle size for hero background or skills viz?

Consider:
1. Target audience (developers appreciate visual flair)
2. Mobile traffic percentage
3. Core Web Vitals impact
4. Time investment vs. other PRDs

## Related PRDs

- [Skills Showcase](../01-content/skills-showcase.md) - Potential integration point
