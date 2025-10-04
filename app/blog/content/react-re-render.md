---
slug: "react-re-render"
title: "Understanding React Re-renders: The Fundamentals"
description: "Learn the essential concepts of React re-renders: what triggers them, how they cascade, and when to move state down."
author: "Soufiane Chaoufi"
publishedAt: "2025-02-10"
category: "technical"
tags: ["React", "Performance", "JavaScript", "Frontend"]
featured: true
---

# Understanding React Re-renders

Without re-renders, there would be no interactivity in React applications. Re-rendering is how React updates your UI with new data. But understanding when and why components re-render is crucial for building applications that work as expected.

This guide covers the fundamental concepts of React re-renders based on key principles every React developer should know.

## 1. State Update: The Source of All Re-renders

**State update is the initial source of all re-renders.** When you call a state setter function from [`useState`](https://react.dev/reference/react/useState), React schedules a re-render of that component.

```jsx
function SearchBar() {
  const [text, setText] = useState("");

  // Each keystroke updates state → triggers re-render
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
```

This is fundamental: without state updates, there would be no way to update your UI in response to user interactions.

## 2. Parent Re-renders Trigger All Children

**Here's a crucial concept:** If a component's re-render is triggered, all nested components inside that component will be re-rendered.

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

The `Child` component re-renders even though its `name` prop remains constant. This leads us to an important point:

## 3. Props Don't Matter (Without Memoization)

**During the normal React re-renders cycle (without the use of memoization), props change doesn't matter: components will re-render even if they don't have any props.**

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildWithProps name="Alice" />
      <ChildWithoutProps /> {/* Still re-renders! */}
    </div>
  );
}

function ChildWithoutProps() {
  console.log("No props, but still re-rendering");
  return <div>I have no props</div>;
}
```

The child re-renders regardless of whether it has props or if those props changed. React's default behavior is to re-render everything in the component tree when a parent updates.

## 4. Moving State Down to Prevent Unnecessary Re-renders

**We can use the pattern known as "moving state down" to prevent unnecessary re-renders in big apps.**

Instead of keeping state in a parent component where it causes everything to re-render, move the state to the smallest component that actually needs it.

```jsx
// ❌ Bad: State in parent causes all children to re-render
function BadApp() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <HeavyHeader /> {/* Re-renders on every count change */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <HeavyContent /> {/* Re-renders on every count change */}
    </div>
  );
}

// ✅ Good: State moved down to Counter component
function GoodApp() {
  return (
    <div>
      <HeavyHeader /> {/* Never re-renders */}
      <Counter />
      <HeavyContent /> {/* Never re-renders */}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

By moving the state down, only the `Counter` component re-renders when the count changes. The heavy components remain untouched.

## 5. Hooks and Re-renders

**State update in a hook will trigger the re-render of a component that uses this hook, even if the state itself is not used.**

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return { increment }; // Notice: not returning count
}

function MyComponent() {
  const { increment } = useCounter(); // Still re-renders when count changes!

  return <button onClick={increment}>Increment</button>;
}
```

Even though `MyComponent` doesn't use the `count` value, it still re-renders when the count changes because the state lives in the hook.

### Hook Chains

**In the case of hooks using other hooks, any state update within that chain of hooks will trigger the re-render of a component that uses the very first hook.**

```jsx
function useInnerHook() {
  const [innerState, setInnerState] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setInnerState(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return innerState;
}

function useOuterHook() {
  const innerValue = useInnerHook(); // Uses the inner hook
  return innerValue * 2;
}

function MyComponent() {
  const value = useOuterHook(); // Uses the outer hook

  // Re-renders every second due to state update in useInnerHook
  return <div>Value: {value}</div>;
}
```

The state update in `useInnerHook` triggers a re-render in `MyComponent`, even though there are multiple hooks in the chain.

## Key Takeaways

This is just the beginning of understanding React re-renders. Here are the fundamental concepts to remember:

1. **Re-rendering enables interactivity** - Without re-renders, there would be no way to update the UI in response to user interactions.

2. **State update is the source** - State updates are the initial trigger for all re-renders in your application.

3. **Parent re-renders cascade** - If a component's re-render is triggered, all nested components inside that component will be re-rendered.

4. **Props don't matter (by default)** - During the normal React re-renders cycle (without memoization), components will re-render even if they don't have any props or if props haven't changed.

5. **Move state down** - Use the pattern known as "moving state down" to prevent unnecessary re-renders in big apps.

6. **Hook state triggers re-renders** - State update in a hook will trigger the re-render of a component that uses this hook, even if the state itself is not used.

7. **Hook chains propagate re-renders** - In the case of hooks using other hooks, any state update within that chain will trigger the re-render of a component that uses the very first hook.

## What's Next?

Understanding these fundamentals is essential before diving into optimization techniques like `React.memo`, `useMemo`, and `useCallback`. These concepts form the foundation of how React works and will help you build better applications.

For more advanced topics on React performance optimization, check out the [React documentation on performance](https://react.dev/learn/render-and-commit).
