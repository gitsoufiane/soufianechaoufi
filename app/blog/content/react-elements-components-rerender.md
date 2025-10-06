---
slug: "react-elements-components-rerender"
title: "React Elements vs Components: Understanding the Difference"
description: "Master the fundamental difference between React elements and components, and learn the 'components as props' and 'children as props' patterns."
author: "Soufiane Chaoufi"
publishedAt: "2025-03-01"
category: "technical"
tags: ["React", "JavaScript", "Frontend"]
featured: true
---

# React Elements vs Components: Understanding the Difference

Understanding the difference between elements and components is one of the most important React concepts. Once you get this, patterns like "components as props" and "children as props" suddenly make perfect sense.

Let me break it down in the simplest way possible.

## What is a Component?

**A Component is just a function that accepts an argument (props) and returns Elements that should be rendered when this Component renders on the screen.**

```jsx
// This is a Component
const A = () => <B />;

// Component with props
const Parent = (props) => {
  return <Child name={props.userName} />;
};
```

That's it! Components are functions. Nothing more. They take props as input and return what should appear on screen.

## What is an Element?

**An Element is an object that describes what needs to be rendered on the screen, with the type either a string for DOM elements or a reference to a Component for components.**

```jsx
// This is an Element (notice the JSX - the angle brackets)
const b = <B />;

// All of these are Elements
<Child />  // Element with Component reference
<Parent /> // Element with Component reference
<div />    // Element with string type "div"
```

When you write JSX, you're creating an Element object. It's just a plain JavaScript object that describes what should appear on screen.

These are identical:

```jsx
// What you write (JSX)
<Child name="Alice" />

// What it becomes (plain JavaScript)
React.createElement(Child, { name: "Alice" }, null)
```

JSX is syntax sugar. Behind the scenes, it creates Element objects.

## What is a Re-render?

**Re-render is just React calling the Component's function.**

That's all it is. When React re-renders a component, it calls your component function again.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('Component function called - this is a render!');

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Every click updates state → triggers re-render → React calls `Counter()` again.

## When Does a Component Re-render?

**A component re-renders when its element object changes, as determined by `Object.is` comparison of it before and after re-render.**

This is the key to understanding React's re-render behavior. React uses `Object.is()` to compare element objects.

`Object.is()` compares object references, not their contents:

```jsx
// Primitives work as expected
Object.is(5, 5);              // true
Object.is('hello', 'hello');  // true

// Objects are compared by reference
const obj1 = { name: 'React' };
const obj2 = { name: 'React' };  // Same content, different object
const obj3 = obj1;               // Same reference

Object.is(obj1, obj2); // false! Different objects in memory
Object.is(obj1, obj3); // true! Same object reference
```

**This is crucial**: Even if two objects have identical content, `Object.is()` says they're different if they're separate objects in memory.

Learn more about [`Object.is()` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

## The Pattern: Elements Passed as Props Don't Re-render

Here's where it gets powerful:

**When elements are passed as props to a component, and this component triggers a re-render through a state update, elements that are passed as props won't re-render.**

Why? Because the element object reference stays the same! Let me show you:

## The Problem: Why Children Keep Re-rendering

Here's a common scenario that causes unnecessary re-renders:

```jsx
const Parent = () => {
  const [state, setState] = useState(0);

  return <Child />; // Creating the element here
};
```

When you update state, here's what happens:

1. `setState` called → Parent re-renders
2. Parent function runs again
3. `<Child />` gets created **again** → new object in memory
4. React compares: `Object.is(oldChild, newChild)` → **false**
5. Child re-renders even though nothing about it changed!

Think about it:

```jsx
// First render
const elementRender1 = <Child />; // New object

// Second render (after setState)
const elementRender2 = <Child />; // Different new object

Object.is(elementRender1, elementRender2); // false! 🔴
```

**The result**: Parent re-renders → creates new child element → child re-renders.

Even though `Child` doesn't use Parent's state! Wasteful, right?

## The Solution: Components as Props Pattern

Now watch this. Instead of creating the child inside Parent, pass it as a prop:

```jsx
const Parent = ({ child }) => {
  const [state, setState] = useState(0);

  return child; // Just using the prop
};

// Create the child element OUTSIDE Parent
<Parent child={<Child />} />
```

Now when state updates:

1. `setState` called → Parent re-renders
2. Parent function runs again
3. Returns `child` prop → **same object reference!**
4. React compares: `Object.is(oldChild, newChild)` → **true** ✅
5. Child re-render skipped! ✅

Here's why it works:

```jsx
// Child element created ONCE, outside Parent
const childElement = <Child />;

// First render
<Parent child={childElement} /> // Using this reference

// Second render (after setState)
<Parent child={childElement} /> // SAME reference!

Object.is(childElement, childElement); // true! ✅
```

**The key**: The child element is created outside Parent, so it doesn't get recreated when Parent re-renders.

Parent's state changes → Parent re-renders → Child doesn't!

## The Children as Props Pattern

**"children" are just props and behave like any other prop when they are passed via JSX nesting syntax.**

Here's the important part: these are **exactly the same**:

```jsx
// Nested syntax (what you usually see)
<Parent>
  <Child />
</Parent>

// Explicit prop syntax (literally the same thing)
<Parent children={<Child />} />
```

`children` is just a special prop name. React automatically passes nested elements as the `children` prop.

### Real Example: Theme Switcher

Here's a practical example:

```jsx
// ❌ Children re-render on every theme change
function BadLayout() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme}>
      <HeavySidebar /> {/* Re-renders on theme toggle */}
      <HeavyContent /> {/* Re-renders on theme toggle */}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

// ✅ Children DON'T re-render - passed as props!
function GoodLayout({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme}>
      {children} {/* Doesn't re-render! */}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

// Create children OUTSIDE Layout
function App() {
  return (
    <GoodLayout>
      <HeavySidebar />
      <HeavyContent />
    </GoodLayout>
  );
}
```

Theme changes → only `GoodLayout` re-renders → children elements stay the same reference → children skip re-render!

## Another Example: Modal with Animation

Here's another practical use case:

```jsx
function Modal({ isOpen, children }) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation logic updates state frequently
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isAnimating ? 'animating' : ''}`}>
      {children} {/* Element passed as prop - doesn't re-render! */}
    </div>
  );
}

// Usage
<Modal isOpen={showModal}>
  <HeavyForm /> {/* Created outside Modal, won't re-render during animation */}
</Modal>
```

The `<HeavyForm />` element is created outside the `Modal` component. When `isAnimating` state updates, `Modal` re-renders, but `children` (the `HeavyForm` element) has the same object reference, so it doesn't re-render.

Result: Smooth animations without unnecessary form re-renders!

## Key Takeaways

Hope this made sense and you're now confident with the "components as props" and "children as props" patterns. Here are the essential concepts to remember:

1. **A Component is just a function** that accepts an argument (props) and returns Elements that should be rendered when this Component renders on the screen.
   ```jsx
   const A = () => <B />; // This is a Component
   ```

2. **An Element is an object** that describes what needs to be rendered on the screen, with the type either a string for DOM elements or a reference to a Component for components.
   ```jsx
   const b = <B />; // This is an Element
   ```

3. **Re-render is just React calling the Component's function.** That's all a re-render is—React executing your component function again.

4. **A component re-renders when its element object changes**, as determined by `Object.is` comparison of it before and after re-render.

5. **When elements are passed as props to a component, and this component triggers a re-render through a state update, elements that are passed as props won't re-render.**
   ```jsx
   function Parent({ child }) {
     const [state, setState] = useState(0);
     return child; // child won't re-render when state updates
   }
   ```

6. **"children" are just props** and behave like any other prop when they are passed via JSX nesting syntax:
   ```jsx
   <Parent>
     <Child />
   </Parent>
   // Identical to:
   <Parent children={<Child />} />
   ```

## What's Next?

These patterns aren't just for performance—they're useful for composing components in flexible ways. Understanding the difference between elements and components is fundamental to mastering React.

For more on React composition patterns, check out the [React documentation on composition](https://react.dev/learn/passing-props-to-a-component).

## References

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) - Official React documentation
- [Object.is() Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) - MDN documentation
- [React.createElement](https://react.dev/reference/react/createElement) - Official React documentation on JSX transformation
- [React Developer Tools](https://react.dev/learn/react-developer-tools) - Profiling and debugging tools
- "Advanced React" by Nadia Makarevich - Deep dive into React elements, components, and re-render patterns
