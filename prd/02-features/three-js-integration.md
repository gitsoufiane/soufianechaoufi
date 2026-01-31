# Three.js Integration

**Priority:** P3
**Effort:** L
**Status:** Complete (404 Page)

## Problem

Three.js is configured (transpiled in next.config) but unused. Questions:

- Worth the bundle size cost?
- Where would it add value?
- Performance implications?

## Current Setup

From `next.config.ts`:

```javascript
// Three.js packages transpiled
transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"];
```

Dependencies installed:

- `three`
- `@react-three/fiber`
- `@react-three/drei`

## Implementation Progress

### Completed: 404 Page - Starfield Universe ✅

**Files created/updated:**

- `components/NotFoundScene.tsx` - Three.js canvas with rotating starfield
- `components/NotFoundSceneWrapper.tsx` - Wrapper with lazy loading and reduced motion support
- `app/not-found.tsx` - Integrated full-screen 3D starfield background

**Features implemented:**

- 5000 stars using `@react-three/drei` Stars component
- Full-screen coverage (`position: fixed`, `100vw` x `100vh`)
- Slow rotation animation (X and Y axes)
- Theme-aware backgrounds:
  - Dark mode: Black background with bright white stars
  - Light mode: Light gray background with subtle darker stars
- Lazy loaded via `next/dynamic` with `ssr: false`
- Graceful static fallback for `prefers-reduced-motion`
- Static star dots fallback during loading

**Technical details:**

```typescript
<Stars
  radius={100}
  depth={80}
  count={5000}
  factor={isDark ? 6 : 4}
  saturation={0}
  fade
  speed={1.5}
/>
```

## Acceptance Criteria

- [x] Meaningful Three.js implementation
- [x] Graceful fallback for low-power devices
- [x] Respects `prefers-reduced-motion`
- [x] Mobile performance acceptable (lightweight starfield)
- [x] Bundle size impact justified (isolated to 404)
- [x] Lazy loaded (dynamic import)
- [x] Works in both dark and light themes

## Potential Future Use Cases

### 1. Hero Background Animation

**Visual impact:** High
**Performance cost:** Medium-High

Could reuse starfield or add particle effects.

### 2. Skills Visualization

**Visual impact:** Medium
**Performance cost:** Medium

3D node graph of skills/technologies.

### 3. Project Showcase

**Visual impact:** Medium
**Performance cost:** High

3D gallery of project screenshots/cards.

## Technical Considerations

### Bundle Size

Three.js bundle is isolated to 404 page via dynamic imports:

```typescript
const NotFoundScene = dynamic(() => import("./NotFoundScene"), {
  ssr: false,
  loading: () => null,
});
```

### Performance

- Stars component is GPU-optimized
- Slow rotation minimizes CPU usage
- No continuous physics or complex calculations
- `pointerEvents: "none"` prevents unnecessary event handling

### Accessibility

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  return <StaticFallback isDark={isDark} />;
}
```

## Related PRDs

- [Skills Showcase](../01-content/skills-showcase.md) - Potential future integration
