---
slug: "react-re-render"
title: "Understanding React Re-renders: A Deep Dive"
description: "Learn how React re-renders work, when they happen, and how to optimize your components for better performance."
author: "Soufiane Chaoufi"
publishedAt: "2025-02-10"
category: "technical"
tags: ["React", "Performance", "JavaScript", "Frontend", "Optimization"]
featured: true
---

# Understanding React Re-renders: A Deep Dive

React re-renders are one of the most misunderstood aspects of the framework. Understanding when and why components re-render is crucial for building performant applications. Performance issues often stem from unnecessary re-renders cascading through your component tree, causing sluggish UI updates and degraded user experience.

This guide covers the mechanics of React re-renders, their triggers, optimization strategies, and debugging techniques.

## Component Lifecycle Phases

React components go through three distinct lifecycle phases. Understanding these phases is fundamental to controlling re-renders. Learn more in the [React Component Lifecycle documentation](https://react.dev/learn/lifecycle-of-reactive-effects).

**Mounting**

- Component instance is created
- Initial state and props are set
- Component is inserted into the DOM
- `useEffect` hooks with empty dependency arrays run

**Updating (Re-rendering)**

- State or props change
- Component function re-executes
- Virtual DOM is reconciled with previous render
- Only changed DOM nodes are updated
- `useEffect` hooks with dependencies run if deps changed

**Unmounting**

- Component is removed from the DOM
- Cleanup functions from `useEffect` execute
- Component state is destroyed

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounted"); // Runs once on mount

    return () => {
      console.log("Unmounted"); // Runs on unmount
    };
  }, []);

  console.log("Rendering"); // Runs on every render

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

## What Triggers Re-renders?

React re-renders occur in four primary scenarios. Understanding these triggers is essential for performance optimization.

### 1. State Updates

When you call a state setter function from [`useState`](https://react.dev/reference/react/useState), React schedules a re-render of that component.

```jsx
function SearchBar() {
  const [text, setText] = useState("");

  // Each keystroke updates state → triggers re-render
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
```

**Note:** State updates for controlled inputs are intentional and necessary. This is the expected behavior.

### 2. Parent Component Re-renders

By default, when a parent re-renders, all child components re-render regardless of whether their props changed. This is React's default reconciliation behavior.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="Alice" /> {/* Re-renders on every parent update */}
    </div>
  );
}

function Child({ name }) {
  console.log("Child rendered");
  return <div>Hello {name}</div>;
}
```

The `Child` component re-renders even though its `name` prop remains constant. React doesn't perform prop comparison by default—it re-renders all children when the parent updates.

#### Preventing Unnecessary Re-renders with React.memo

[`React.memo`](https://react.dev/reference/react/memo) is a higher-order component that memoizes your component based on props. It performs a shallow comparison of props and skips re-rendering if they haven't changed.

```jsx
// Without memoization
function RegularChild({ name }) {
  console.log("Regular child rendered");
  return <div>Hello {name}</div>;
}

// With React.memo - skips re-render if props unchanged
const MemoizedChild = React.memo(function Child({ name }) {
  console.log("Memoized child rendered");
  return <div>Hello {name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <RegularChild name="Alice" /> {/* Re-renders every click */}
      <MemoizedChild name="Bob" /> {/* Only re-renders if name changes */}
    </div>
  );
}
```

**Performance Consideration:** `React.memo` adds a shallow prop comparison overhead. Only use it for:

- Components with expensive render operations
- Components that re-render frequently with the same props
- Components deep in the component tree

Avoid premature optimization. Profile first using [React DevTools Profiler](https://react.dev/learn/react-developer-tools).

### 3. Context Value Changes

Components consuming context via [`useContext`](https://react.dev/reference/react/useContext) re-render when the context value updates.

```jsx
const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext); // Subscribes to context
  return <button className={theme}>Click me</button>;
}

// Provider update triggers re-render in all consumers
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <ThemedButton /> {/* Re-renders when theme changes */}
    </ThemeContext.Provider>
  );
}
```

**Context Optimization:** Every context consumer re-renders when the value changes, even if it only uses a subset of the context data. Consider splitting contexts or using context selectors for better performance.

### 4. Custom Hook State Changes

Custom hooks that manage state will trigger re-renders in components that use them.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function MyComponent() {
  const width = useWindowWidth(); // Re-renders on window resize
  return <div>Width: {width}px</div>;
}
```

Custom hooks encapsulate stateful logic. Any state update within the hook triggers a re-render of the component using it.

## What Doesn't Trigger Re-renders?

Understanding what doesn't cause re-renders is equally important for performance optimization.

```jsx
function NoRerender() {
  const countRef = useRef(0);
  let regularVar = 0;

  const increment = () => {
    countRef.current += 1; // Doesn't trigger re-render
    regularVar += 1; // Doesn't trigger re-render (resets next render)
    console.log(countRef.current, regularVar);
  };

  return <button onClick={increment}>Increment</button>;
}
```

**Operations that don't trigger re-renders:**

- [`useRef`](https://react.dev/reference/react/useRef) value mutations
- Regular variable updates (reset on next render)
- Direct DOM manipulation (imperative operations)
- Promise resolutions (unless calling state setters)
- Event listener modifications

**Use refs for:** Storing mutable values that don't affect rendering (DOM references, timers, previous values, animation frame IDs).

## The Render and Commit Phases

React's re-rendering process consists of two distinct phases. Understanding this architecture is crucial for optimization. Learn more about [React's Reconciliation Algorithm](https://react.dev/learn/preserving-and-resetting-state#the-ui-tree).

### Render Phase (Reconciliation)

During the render phase, React:

1. Calls your component function
2. Builds a virtual DOM tree (React elements)
3. Compares the new tree with the previous one (diffing)
4. Determines what DOM updates are needed

This phase is pure and can be interrupted. No side effects should occur here.

### Commit Phase

During the commit phase, React:

1. Applies the minimal set of DOM mutations
2. Calls `useLayoutEffect` cleanup and effects
3. Paints to the screen
4. Calls `useEffect` cleanup and effects

```jsx
function Example() {
  const [count, setCount] = useState(0);

  console.log("1. Render phase - component function executes");

  useLayoutEffect(() => {
    console.log("2. Commit phase - DOM updated, not yet painted");
  });

  useEffect(() => {
    console.log("3. Commit phase - screen painted");
  });

  return <div>{count}</div>;
}
```

**Key Optimization:** React only updates DOM nodes that changed. If reconciliation determines the output is identical, React skips the commit phase entirely. This is why re-renders don't always mean DOM updates.

Read more about [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture) for deeper internals.

## Performance Optimization Strategies

Optimize only when you have measured performance issues using profiling tools. Premature optimization adds complexity without benefit.

### 1. useMemo - Memoize Expensive Computations

[`useMemo`](https://react.dev/reference/react/useMemo) caches the result of expensive calculations, recomputing only when dependencies change.

```jsx
function ProductList({ products }) {
  // Memoized sort - only recomputes when products array changes
  const sortedProducts = useMemo(() => {
    console.log("Sorting products");
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]);

  return (
    <ul>
      {sortedProducts.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

**When to use `useMemo`:**

- Expensive computations (sorting/filtering large datasets, complex calculations)
- Creating objects/arrays passed to memoized child components
- Computations with measurable performance impact (profile first)

**When to avoid:**

- Simple operations (string concatenation, basic math)
- Operations faster than memoization overhead
- Every calculation (adds complexity and memory overhead)

### 2. useCallback - Stabilize Function References

[`useCallback`](https://react.dev/reference/react/useCallback) memoizes function references, preventing unnecessary re-renders in memoized child components.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Memoized function - same reference across renders
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = React.memo(function Child({ onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});
```

**When to use `useCallback`:**

- Functions passed as props to `React.memo` components
- Dependencies for `useEffect`, `useMemo`, or other hooks
- Functions passed to context providers

**When to avoid:**

- Without `React.memo` (no benefit, adds overhead)
- Event handlers not passed as props
- Functions recreated infrequently

### 3. Component Composition - State Colocation

The most effective optimization is often architectural: move state closer to where it's used, preventing unnecessary re-renders in unrelated components.

```jsx
// ❌ Inefficient: search state causes entire layout to re-render
function BadLayout() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <ExpensiveHeader /> {/* Re-renders on every keystroke */}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ExpensiveContent /> {/* Re-renders on every keystroke */}
    </div>
  );
}

// ✅ Optimized: state colocated in SearchBar component
function GoodLayout() {
  return (
    <div>
      <ExpensiveHeader /> {/* Unaffected by search state */}
      <SearchBar /> {/* Only component that re-renders */}
      <ExpensiveContent /> {/* Unaffected by search state */}
    </div>
  );
}

function SearchBar() {
  const [search, setSearch] = useState("");
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

**Principle:** Lift state up only as high as necessary. State at the lowest possible level minimizes re-render scope.

## Common Performance Anti-Patterns

### Anti-Pattern 1: Inline Object/Array Literals

Creating objects or arrays inline breaks reference equality, defeating `React.memo` optimizations.

```jsx
// ❌ Inefficient: new object reference every render
function Inefficient() {
  return <MemoizedChild config={{ theme: "dark" }} />;
}

// ✅ Better: memoized object
function Better() {
  const config = useMemo(() => ({ theme: "dark" }), []);
  return <MemoizedChild config={config} />;
}

// ✅ Best: static constant (no re-creation)
const CONFIG = { theme: "dark" };
function Best() {
  return <MemoizedChild config={CONFIG} />;
}
```

**Why this matters:** JavaScript creates new object references even for identical content. [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) compares references, not values, so `{ theme: 'dark' } !== { theme: 'dark' }`.

### Anti-Pattern 2: Inline Function Definitions

```jsx
// ❌ New function reference every render
<MemoizedChild onClick={() => doSomething()} />;

// ✅ Stable function reference
const handleClick = useCallback(() => doSomething(), []);
<MemoizedChild onClick={handleClick} />;
```

Without `useCallback`, the inline arrow function creates a new reference each render, causing memoized children to re-render.

### Anti-Pattern 3: Premature Optimization

Over-optimizing adds complexity, reduces code readability, and provides minimal benefit for fast-rendering components.

```jsx
// ❌ Unnecessary overhead for simple component
const SimpleText = React.memo(function Text({ children }) {
  return <p>{children}</p>;
});

// ✅ Cleaner and sufficient for simple components
function SimpleText({ children }) {
  return <p>{children}</p>;
}
```

**Optimization Strategy:** Profile first with React DevTools Profiler, identify bottlenecks, then optimize specific problem areas. Avoid blanket optimizations.

## Debugging Re-render Performance Issues

Use profiling tools to identify performance bottlenecks before optimizing.

### React DevTools Profiler

The [React DevTools Profiler](https://react.dev/learn/react-developer-tools#profiler) provides detailed performance metrics for your component tree.

**Setup:**

1. Install [React DevTools](https://react.dev/learn/react-developer-tools) browser extension
2. Open browser DevTools → Profiler tab
3. Click record ⏺️, interact with your application, stop recording ⏹️
4. Analyze flame graphs to identify slow components and re-render frequency

**Key Metrics:**

- Render duration for each component
- Number of re-renders during interaction
- Commit phase timing
- Component hierarchies and props

### Console Logging Strategy

Strategic console logs help track component lifecycle and prop changes:

```jsx
function Component(props) {
  console.log("Rendered with props:", props);

  useEffect(() => {
    console.log("Props changed:", props);
  }, [props]);

  return <div>...</div>;
}
```

For production debugging, use [React Profiler API](https://react.dev/reference/react/Profiler) to programmatically measure rendering performance.

### why-did-you-render

[`@welldone-software/why-did-you-render`](https://github.com/welldone-software/why-did-you-render) automatically detects and logs avoidable re-renders:

```bash
yarn add -D @welldone-software/why-did-you-render
```

Enable it in development to identify unnecessary re-renders caused by props/state that haven't meaningfully changed.

### Chrome DevTools Performance Tab

For comprehensive performance analysis including re-renders, JavaScript execution, and layout:

1. Open Chrome DevTools → Performance tab
2. Record interaction
3. Look for "Render" and "Paint" events
4. Correlate with User Timing API marks from React

Learn more: [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance)

## Key Takeaways

**Re-render Fundamentals:**

- Re-renders are React's core mechanism for UI updates
- State updates, parent re-renders, context changes, and custom hooks trigger re-renders
- Refs, regular variables, and DOM manipulation don't trigger re-renders

**Performance Principles:**

- Parent component re-renders cascade to all children by default
- `React.memo` enables shallow prop comparison to skip unnecessary re-renders
- State colocation (moving state closer to usage) prevents unnecessary re-render cascades

**Optimization Guidelines:**

- Profile first using React DevTools Profiler before optimizing
- Use `useMemo` for expensive computations, not simple operations
- Use `useCallback` only with `React.memo` or as hook dependencies
- Avoid premature optimization—most re-renders are fast enough

**Debugging Strategy:**

- Use React DevTools Profiler to identify performance bottlenecks
- Leverage `why-did-you-render` for detecting avoidable re-renders
- Monitor render/commit phases with Chrome DevTools Performance tab
- Implement strategic console logging during development

**Development Workflow:**

1. Build features first, focusing on correctness
2. Profile application performance with real-world usage patterns
3. Identify specific bottlenecks through measurement
4. Apply targeted optimizations to proven problem areas
5. Re-profile to validate performance improvements

React's rendering system is highly optimized. Focus on architectural patterns (component composition, state colocation) over micro-optimizations. Measure performance impact before and after optimization to ensure improvements justify added complexity.

## Further Reading

- [React Documentation - Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React Performance Optimization Guide](https://react.dev/learn/render-and-commit)
- [Understanding React Reconciliation](https://react.dev/learn/preserving-and-resetting-state#the-ui-tree)
- [Web.dev - React Performance](https://web.dev/react)
