---
slug: "react-elements-components-rerender"
title: "Elements, Components, and Re-renders"
description: "Learn the difference between React elements and components, and how understanding this unlocks powerful optimization patterns."
author: "Soufiane Chaoufi"
publishedAt: "2025-03-01"
category: "technical"
tags: ["React", "Performance", "JavaScript", "Frontend", "Optimization"]
featured: true
---

# Elements, Components, and Re-renders

Ever had a component that re-renders way too much for no reason? I spent two hours debugging why my modal kept re-rendering during its animation, making everything janky. Turns out, I didn't understand the difference between elements and components.

Once I got it, I fixed the bug in 5 minutes and learned a powerful performance trick. Let me share what I learned.

## Components Are Just Functions

Seriously, that's all they are. Here's a component:

```jsx
const Parent = () => {
  return <Child />;
};
```

That's it! It's a function that returns some JSX. If it needs props, they're just the first argument:

```jsx
const Parent = (props) => {
  return <Child name={props.userName} />;
};
```

No magic, just JavaScript functions.

## So What Are Elements Then?

Every time you write those angle brackets (`<Child />`), you're creating an Element:

```jsx
<Child />  // This is an Element
<Parent /> // This is also an Element
<div />    // Yep, this too
```

An Element is just a plain JavaScript object that tells React what to show on screen. That nice HTML-looking syntax? It's just shorthand.

These are identical:

```jsx
// What you write (JSX)
<Child name="Alice" />

// What it becomes (plain JavaScript)
React.createElement(Child, { name: "Alice" }, null)
```

JSX is basically fancy syntax sugar. Your code gets converted to `React.createElement()` calls before it runs.

## The Secret: How React Compares Objects

Here's where it gets interesting. React needs to know if something changed, so it uses `Object.is()` to compare stuff.

`Object.is()` doesn't look at what's inside objects—it checks if they're literally the same object in memory:

```jsx
// Primitives work as expected
Object.is(5, 5);              // true
Object.is('hello', 'hello');  // true

// But objects? Different story
const obj1 = { name: 'React' };
const obj2 = { name: 'React' };  // Looks identical, right?
const obj3 = obj1;               // Points to the same object

Object.is(obj1, obj2); // false! Different objects in memory
Object.is(obj1, obj3); // true! Same object reference
```

**This is huge**: Even if two objects have the exact same stuff inside, `Object.is()` says they're different if they're separate objects.

Think of it like this: Two houses can have the same furniture and layout, but they're still different houses at different addresses.

Learn more about [`Object.is()` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

## What Happens During a Re-render

A re-render just means React runs your component function again. That's it.

Here's the process:

1. **Run your function** - React executes all your code and hooks
2. **Build element tree** - Creates a blueprint of what should be on screen
3. **Compare with last time** - What changed?
4. **Update the DOM** - Only touch what actually changed

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('Function running!'); // Logs every re-render

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Every click runs the entire function. That's a re-render.

## The Magic Rule That Changes Everything

Ready for the game-changer?

**If the element object is the same before and after re-render (same reference via `Object.is()`), React skips re-rendering that component and its children.**

React doesn't care what's inside the element. It only checks: "Is this literally the same object?"

Same reference = skip re-render. Different reference = re-render.

This one rule is the key to the performance trick I'm about to show you.

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

## The Solution: Pass Children as Props (Mind Blown 🤯)

Now watch this trick. Instead of creating the child inside Parent, pass it as a prop:

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
5. Child re-render skipped! 🎉

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

**The magic**: The child element is created outside Parent, so it doesn't get recreated when Parent re-renders.

Parent's state changes → Parent re-renders → Child doesn't! 🚀

## Real Example: The Theme Switcher

Let me show you this with a real scenario. Say you have a layout with a theme toggle:

### ❌ The Slow Way

```jsx
function Layout() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme}>
      <Header />
      <HeavySidebar /> {/* Re-renders on every theme toggle */}
      <HeavyContent /> {/* Re-renders on every theme toggle */}
      <Footer />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

Click the theme button → everything re-renders. If sidebar and content are heavy, your UI will lag.

### ✅ The Fast Way

```jsx
function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme}>
      {children} {/* Doesn't re-render! 🚀 */}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

// Create children OUTSIDE Layout
function App() {
  return (
    <Layout>
      <Header />
      <HeavySidebar />
      <HeavyContent />
      <Footer />
    </Layout>
  );
}
```

Now click the theme button → only Layout re-renders. Children are untouched. Butter smooth! 🧈

This is the exact pattern that fixed my janky modal animation.

## Wait, Children is Just a Prop?

Yep! This blew my mind when I learned it.

These are **exactly the same**:

```jsx
// Nested syntax (what you usually see)
<Parent>
  <Child />
</Parent>

// Explicit prop syntax (literally the same thing)
<Parent children={<Child />} />
```

`children` is just a special prop name. React automatically passes nested elements as the `children` prop.

Mind. Blown. 🤯

## Another Real Example: The Modal

Here's the modal that was killing me with janky animations:

```jsx
function Modal({ isOpen, children }) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation logic - updates state frequently
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isAnimating ? 'animating' : ''}`}>
      {children} {/* Doesn't re-render during animation! */}
    </div>
  );
}

// Usage
<Modal isOpen={showModal}>
  <HeavyForm /> {/* Renders once, not 60 times during animation */}
</Modal>
```

Before I knew this trick, the form would re-render during the animation. Laggy mess.

After? Smooth as butter. The form renders once, and the modal animates independently.

## What You Need to Remember

Let me distill this down to the essentials:

1. **Component = Function**
   ```jsx
   const MyComponent = () => <div>Hi</div>
   ```
   Just a function. Nothing fancy.

2. **Element = Object**
   ```jsx
   const element = <MyComponent />
   ```
   An object describing what to show.

3. **Re-render = Function runs again**
   When state updates, React calls your function again.

4. **Same reference = skip re-render**
   React uses `Object.is()` to check if an element changed.

5. **Pass children as props for free optimization**
   Element created outside parent → doesn't recreate on parent re-render → child skips re-render.

6. **`children` is just a normal prop**
   ```jsx
   <Parent><Child /></Parent>
   // Same as:
   <Parent children={<Child />} />
   ```

## When Should You Actually Use This?

Use the children-as-props pattern when:
- Parent has frequently changing state (animations, timers, counters)
- Children are heavy to render (big lists, complex forms, charts)
- Children don't need the parent's state

**Don't do this everywhere!** Only use it when you have an actual performance problem.

Profile first (React DevTools), optimize second.

## Final Thoughts

This pattern saved me hours of debugging and made my apps way smoother. It's not about being clever—it's about understanding how React works under the hood.

Elements and components seem like the same thing, but they're not. Once you get this difference, a lot of React's behavior suddenly makes sense.

Now go forth and build fast UIs! ⚡
