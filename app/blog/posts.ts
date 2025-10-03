import { BlogPost } from "@/types/blog";

// Blog posts array - currently empty for clean slate
// Add new articles by following the BlogPost interface structure
export const posts: BlogPost[] = [
  {
    slug: "react-re-render",
    title: "Understanding React Re-renders: A Deep Dive",
    description: "Learn how React re-renders work, when they happen, and how to optimize your components for better performance.",
    content: `# Understanding React Re-renders: A Deep Dive

React's declarative nature makes building UIs intuitive, but understanding when and why components re-render is crucial for building performant applications. In this article, we'll explore the mechanics of React re-renders and learn how to optimize them.

## Component Lifecycle: Mount, Update, Unmount

React components go through three lifecycle phases:

**Component Created → 🟢 Mount → 🔵 Re-render ↻ → 🔴 Unmount**

**🟢 Mounting** - Component first appears on screen:
- React creates the component instance
- Initializes state and runs hooks
- Appends elements to the DOM

**🔵 Re-rendering** - Component updates with new information:
- React re-uses the existing instance
- Runs hooks and calculations
- Updates the DOM with new attributes

**🔴 Unmounting** - Component is removed:
- React performs cleanup
- Destroys the instance and state
- Removes DOM elements

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mounted'); // Runs once on mount

    return () => {
      console.log('Unmounted'); // Cleanup on unmount
    };
  }, []);

  console.log('Re-rendered'); // Runs on every render

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## When Do Re-renders Happen?

React components re-render in these scenarios:

### 1. State Changes

When you update state using \`useState\` or \`useReducer\`:

\`\`\`jsx
function App() {
  const [text, setText] = useState('');

  // Typing triggers re-renders
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
\`\`\`

### 2. Parent Re-renders

When a parent component re-renders, all its children re-render by default—**regardless of whether props changed**:

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="Alice" /> {/* Re-renders even though name prop never changes */}
    </div>
  );
}

function Child({ name }) {
  console.log('Child rendered');
  return <div>Hello {name}</div>;
}
\`\`\`

**Important**: Props don't prevent re-renders by default. React doesn't check if props changed—it just re-renders the child whenever the parent re-renders.

#### When Props Actually Matter: React.memo

Props only matter for re-renders when you wrap a component with \`React.memo\`:

\`\`\`jsx
// Without React.memo - re-renders every time parent re-renders
function RegularChild({ name }) {
  console.log('Regular child rendered');
  return <div>Hello {name}</div>;
}

// With React.memo - only re-renders when props change
const MemoizedChild = React.memo(function Child({ name }) {
  console.log('Memoized child rendered');
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
\`\`\`

When a component is wrapped in \`React.memo\`:
1. React stops the natural re-render chain
2. Checks if **any** prop has changed
3. If **all props are the same** → skip re-render
4. If **even one prop changes** → re-render as usual

This is a common misconception: many developers think passing the same props prevents re-renders. In reality, React only checks props when you explicitly opt in with \`React.memo\`.

### 3. Context Changes

When a context value changes, all components using that context re-render:

\`\`\`jsx
const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
\`\`\`

### 4. Hook Changes

Custom hooks that use state or context can trigger re-renders:

\`\`\`jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
\`\`\`

## What Doesn't Cause Re-renders?

These common scenarios do NOT trigger re-renders:

- Updating refs with \`useRef\`
- Changing regular variables
- DOM mutations outside React
- Promise resolutions (unless they update state)

\`\`\`jsx
function NoRerender() {
  const countRef = useRef(0);
  let regularVar = 0;

  const increment = () => {
    countRef.current += 1; // No re-render
    regularVar += 1; // No re-render
    console.log(countRef.current, regularVar);
  };

  return <button onClick={increment}>Increment</button>;
}
\`\`\`

## How React Processes Re-renders

Now that we know when re-renders happen, let's understand how React handles them internally.

When a re-render happens:

1. **Render Phase**: React calls your component function
2. **Reconciliation**: React compares the new virtual DOM with the previous one
3. **Commit Phase**: React updates the actual DOM with only the changes

\`\`\`jsx
function Example() {
  const [count, setCount] = useState(0);

  console.log('1. Render phase'); // Always runs

  useLayoutEffect(() => {
    console.log('2. After DOM mutations, before paint');
  });

  useEffect(() => {
    console.log('3. After paint');
  });

  return <div>{count}</div>;
}
\`\`\`

## Optimizing Re-renders

Now that we understand when and how re-renders happen, let's look at techniques to optimize them when needed.

### 1. useMemo

Memoizes expensive calculations:

\`\`\`jsx
function ProductList({ products }) {
  const sortedProducts = useMemo(() => {
    console.log('Sorting products...');
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]); // Only re-sort when products change

  return (
    <ul>
      {sortedProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
\`\`\`

### 3. useCallback

Memoizes function references:

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, new function on every render
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Function reference stays the same

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

const MemoizedChild = React.memo(function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
\`\`\`

### 4. Component Composition

Move state down to avoid re-rendering unrelated components:

\`\`\`jsx
// ❌ Bad: entire layout re-renders on input change
function BadLayout() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <ExpensiveHeader />
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ExpensiveContent />
    </div>
  );
}

// ✅ Good: only SearchBar re-renders
function GoodLayout() {
  return (
    <div>
      <ExpensiveHeader />
      <SearchBar />
      <ExpensiveContent />
    </div>
  );
}

function SearchBar() {
  const [search, setSearch] = useState('');
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
\`\`\`

## Common Re-render Mistakes

### Creating Objects/Arrays Inline

\`\`\`jsx
// ❌ New object on every render
function Bad() {
  return <Child config={{ theme: 'dark' }} />;
}

// ✅ Stable reference
function Good() {
  const config = useMemo(() => ({ theme: 'dark' }), []);
  return <Child config={config} />;
}
\`\`\`

### Inline Functions in Props

\`\`\`jsx
// ❌ New function every time
<Child onClick={() => doSomething()} />

// ✅ Stable function reference
const handleClick = useCallback(() => doSomething(), []);
<Child onClick={handleClick} />
\`\`\`

### Over-optimization

Don't optimize prematurely! React is fast. Only optimize when you have actual performance issues:

\`\`\`jsx
// ❌ Over-optimized for simple component
const SimpleText = React.memo(function Text({ children }) {
  return <p>{children}</p>;
});

// ✅ Simple component doesn't need memo
function SimpleText({ children }) {
  return <p>{children}</p>;
}
\`\`\`

## Debugging Re-renders

### React DevTools Profiler

1. Install React DevTools browser extension
2. Open DevTools → Profiler tab
3. Click record and interact with your app
4. Analyze which components re-rendered and why

### Console Logging

\`\`\`jsx
function Component(props) {
  console.log('Component rendered', props);

  useEffect(() => {
    console.log('Props changed', props);
  }, [props]);

  return <div>...</div>;
}
\`\`\`

### why-did-you-render Library

Helpful npm package that logs unnecessary re-renders:

\`\`\`bash
npm install @welldone-software/why-did-you-render
\`\`\`

## Key Takeaways

1. **Re-renders power interactivity** - Without them, your React app would be static. They're essential, not just a performance concern.

2. **State is the trigger** - Every re-render starts with a state change somewhere in your component tree.

3. **Children always follow parents** - When a parent re-renders, all children inside re-render too, regardless of props.

4. **Props don't matter by default** - React ignores prop changes during normal re-renders. Only \`React.memo\` makes props relevant.

5. **Position state wisely** - Moving state closer to where it's used prevents unrelated components from re-rendering (better than premature memoization).

6. **Hooks trigger their host component** - If a custom hook updates state, the component using that hook re-renders, even if it doesn't directly use that state.

7. **Hook chains propagate upward** - When hooks use other hooks, any state change in the chain triggers a re-render of the top-level component.

8. **Measure first, optimize later** - Use React DevTools Profiler to find actual bottlenecks before adding \`memo\`, \`useMemo\`, or \`useCallback\`.

9. **Composition over optimization** - Restructuring your component tree is often simpler and more effective than adding memoization everywhere.

Understanding re-renders is fundamental to writing performant React applications. Use this knowledge wisely, but remember: premature optimization is the root of all evil. Profile first, then optimize!`,
    author: "Soufiane Chaoufi",
    publishedAt: "2025-02-10",
    readingTime: 10,
    category: "technical",
    tags: ["React", "Performance", "JavaScript", "Frontend", "Optimization"],
    featured: true,
  },
  {
    slug: "npm-vs-yarn-vs-pnpm-vs-bun",
    title: "npm vs Yarn vs pnpm vs Bun: Choosing the Right Package Manager",
    description: "A practical guide to JavaScript package managers. Compare npm, Yarn, pnpm, and Bun to find the best fit for your project.",
    content: `# npm vs Yarn vs pnpm vs Bun: Choosing the Right Package Manager

Package managers are tools that help you install, update, and manage the libraries (packages) your project depends on. Think of them as app stores for code. While they all do the same basic job, they differ in speed, disk usage, and features.

## The Players

### npm (Node Package Manager)

The original and default package manager that comes with [Node.js](https://nodejs.org). If you've installed Node.js, you already have [npm](https://docs.npmjs.com).

**Pros:**
- Comes pre-installed with Node.js
- Largest ecosystem and community
- Works everywhere, no setup needed

**Cons:**
- Slower than alternatives
- Uses more disk space (duplicates packages)
- Can be inconsistent across different machines

### Yarn

Created by Facebook to solve npm's early problems. [Yarn](https://yarnpkg.com) Classic (v1) is stable and widely used. [Yarn Berry](https://yarnpkg.com/getting-started) (v2+) is a complete rewrite with new features.

**Pros:**
- Faster than npm
- Offline mode - works without internet
- Better security with [checksums](https://en.wikipedia.org/wiki/Checksum)
- [Workspaces](https://yarnpkg.com/features/workspaces) for managing multiple packages

**Cons:**
- Yarn Berry has a learning curve
- Some compatibility issues with certain packages
- Extra tool to install

### pnpm (Performant npm)

Uses a clever trick: instead of copying packages for each project, [pnpm](https://pnpm.io) stores them once and creates links. This saves tons of disk space.

**Pros:**
- Incredibly fast installations
- Saves massive amounts of disk space
- Strict with dependencies (catches errors early)
- Great for [monorepos](https://monorepo.tools)

**Cons:**
- [Symlinks](https://en.wikipedia.org/wiki/Symbolic_link) can confuse some tools
- Smaller community than npm/Yarn
- Strict mode can break poorly configured packages

### Bun

The new kid on the block. [Bun](https://bun.sh) isn't just a package manager - it's also a [runtime](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript) and [bundler](https://bundlers.tooling.report). Built with [Zig](https://ziglang.org) for maximum speed.

**Pros:**
- Blazingly fast (often 10-20x faster)
- All-in-one toolkit (runtime + bundler + package manager)
- Compatible with npm packages
- Built-in testing and bundling

**Cons:**
- Still relatively new (less mature)
- Smaller ecosystem
- Some npm packages don't work yet

## Quick Comparison

| Feature | npm | Yarn | pnpm | Bun |
|---------|-----|------|------|-----|
| **Speed** | Slowest | Fast | Very Fast | Fastest |
| **Disk Space** | Most | Moderate | Least | Low |
| **Setup** | Built-in | Install separately | Install separately | Install separately |
| **Monorepo Support** | Basic | Excellent | Excellent | Good |
| **Offline Mode** | Limited | Yes | Yes | Yes |
| **Maturity** | Very Mature | Mature | Mature | New |

## Common Commands

Here's how to do the same tasks with each tool:

\`\`\`bash
# Install dependencies
npm install
yarn install
pnpm install
bun install

# Add a package
npm install react
yarn add react
pnpm add react
bun add react

# Remove a package
npm uninstall react
yarn remove react
pnpm remove react
bun remove react

# Update packages
npm update
yarn upgrade
pnpm update
bun update

# Run a script
npm run dev
yarn dev
pnpm dev
bun dev
\`\`\`

## Which Should You Use?

**Choose npm if:**
- You're just starting out
- You want zero setup
- You're working on simple projects
- Maximum compatibility is important

**Choose Yarn if:**
- You work with monorepos
- You need offline support
- You want a good balance of speed and stability
- Your team already uses it

**Choose pnpm if:**
- You have limited disk space
- You work with many projects on one machine
- You want the fastest install times
- You manage a monorepo

**Choose Bun if:**
- You want cutting-edge performance
- You're starting a new project
- You want an all-in-one toolkit
- You're okay with occasional compatibility issues

## My Recommendation

For most developers: **Start with npm**, learn the basics, then try **pnpm** or **Yarn** when you need speed or better monorepo support.

For new projects in 2025: **pnpm** is my go-to. It's fast, stable, and the disk space savings are incredible when you work on multiple projects.

For experimentation: **Bun** is exciting and impressively fast. Keep an eye on it, but verify compatibility for production projects.

## Quick Migration Tips

Switching is easier than you think:

1. **Delete old files:**
   \`\`\`bash
   rm -rf node_modules
   rm package-lock.json  # for npm
   rm yarn.lock          # for Yarn
   rm pnpm-lock.yaml     # for pnpm
   rm bun.lockb          # for Bun
   \`\`\`

2. **Install with new package manager:**
   \`\`\`bash
   pnpm install  # or yarn, or bun install
   \`\`\`

3. **Update your [CI/CD](https://about.gitlab.com/topics/ci-cd/) scripts** to use the new package manager

4. **Commit the new lock file**

That's it! Your [\`package.json\`](https://docs.npmjs.com/creating-a-package-json-file) stays the same.

## Final Thoughts

There's no "best" package manager - it depends on your needs. npm is reliable and universal. Yarn and pnpm offer better performance. Bun is the future (maybe).

Try them out, see what fits your workflow. Most importantly: pick one and stick with it for consistency across your project.

Happy coding!`,
    author: "Soufiane Chaoufi",
    publishedAt: "2025-01-15",
    readingTime: 7,
    category: "tools",
    tags: ["npm", "yarn", "pnpm", "bun", "JavaScript", "Node.js"],
    featured: true,
  },
  {
    slug: "react-elements-components-rerender",
    title: "Elements, Components, and Re-renders",
    description: "Learn the difference between React elements and components, and how understanding this unlocks powerful optimization patterns.",
    content: `# Elements, Components, and Re-renders

Understanding the difference between elements and components is fundamental to mastering React performance. Let's break it down with simple examples.

## What is a Component?

A Component is just a function. Here's the simplest one:

\`\`\`jsx
const Parent = () => {
  return <Child />;
};
\`\`\`

That's it! A component is a function that returns Elements. If it has props, those are just the first argument:

\`\`\`jsx
const Parent = (props) => {
  return <Child />;
};
\`\`\`

## What is an Element?

Every time we use those angle brackets, we create an Element:

\`\`\`jsx
<Child />  // This is an Element
<Parent /> // This is also an Element
\`\`\`

An Element is simply an object that describes what needs to be rendered on the screen. The nice HTML-like syntax is just sugar for the \`React.createElement\` function.

These two are exactly the same:

\`\`\`jsx
// JSX syntax
<Child />

// What it actually becomes
React.createElement(Child, null, null)
\`\`\`

## Understanding Object.is()

Before we dive into re-renders, we need to understand how React compares objects. React uses \`Object.is()\` to check if two element objects are the same.

\`Object.is()\` checks **reference equality**, not value equality:

\`\`\`jsx
// Primitives - compares values
Object.is(5, 5);           // true
Object.is('hello', 'hello'); // true

// Objects - compares references
const obj1 = { name: 'React' };
const obj2 = { name: 'React' };
const obj3 = obj1;

Object.is(obj1, obj2); // false - different objects, same content
Object.is(obj1, obj3); // true - same reference
\`\`\`

**Key point**: Even if two objects have identical content, \`Object.is()\` returns false if they're different objects in memory.

Learn more about [\`Object.is()\` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

## How React Re-renders

When we talk about "re-render," we mean React calling your component function and executing everything inside (including hooks).

Here's what happens:

1. **React calls your function** - Executes the component code
2. **Builds a tree of elements** - Called the Fiber Tree (or Virtual DOM)
3. **Creates two trees** - Before and after re-render
4. **Compares them (diffing)** - Finds what changed
5. **Updates the DOM (reconciliation)** - Only updates what's necessary

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('Component re-rendered'); // Runs on every render

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## The Key Rule

Here's the magic: **If the element object before and after re-render is exactly the same (according to \`Object.is()\`), React skips re-rendering that component and its children.**

React doesn't do deep comparison. It only checks if it's the same object reference.

## The Problem: Direct Child Rendering

Let's see what happens when a Parent component has state:

\`\`\`jsx
const Parent = () => {
  const [state, setState] = useState(0);

  return <Child />; // Element created here
};
\`\`\`

When \`setState\` is called:

1. React re-renders Parent
2. Parent function is called again
3. \`<Child />\` element is **created again** (new object)
4. \`Object.is(oldChild, newChild)\` returns **false**
5. Child re-renders (even though nothing changed!)

\`\`\`jsx
// On first render
const elementRender1 = <Child />; // Object created in memory

// On second render (after setState)
const elementRender2 = <Child />; // NEW object created in memory

Object.is(elementRender1, elementRender2); // false! 🔴
\`\`\`

**Result**: Every time Parent re-renders, Child also re-renders.

## The Solution: Children as Props

Now watch what happens when we pass the child as a prop:

\`\`\`jsx
const Parent = ({ child }) => {
  const [state, setState] = useState(0);

  return child; // Just returns the prop
};

// Somewhere else in your app
<Parent child={<Child />} />
\`\`\`

When \`setState\` is called:

1. React re-renders Parent
2. Parent function is called again
3. Returns \`child\` prop (same object reference!)
4. \`Object.is(oldChild, newChild)\` returns **true** ✅
5. Child re-render is **skipped**!

\`\`\`jsx
// Child element created ONCE, outside Parent
const childElement = <Child />;

// First render
<Parent child={childElement} /> // Uses same reference

// Second render (after setState)
<Parent child={childElement} /> // STILL same reference

Object.is(childElement, childElement); // true! ✅
\`\`\`

**Result**: Parent re-renders, but Child doesn't!

## Practical Example: Before and After

### ❌ Before (Child re-renders unnecessarily)

\`\`\`jsx
function Layout() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme}>
      <Header />
      <ExpensiveSidebar /> {/* Re-renders when theme changes */}
      <ExpensiveContent /> {/* Re-renders when theme changes */}
      <Footer />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
\`\`\`

### ✅ After (Child doesn't re-render)

\`\`\`jsx
function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme}>
      {children} {/* Doesn't re-render when theme changes! */}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

// Usage
function App() {
  return (
    <Layout>
      <Header />
      <ExpensiveSidebar />
      <ExpensiveContent />
      <Footer />
    </Layout>
  );
}
\`\`\`

Now when theme changes, only the Layout re-renders. The children stay untouched!

## Understanding the Children Prop

Here's something that surprises many developers: \`children\` is just a regular prop!

These two are identical:

\`\`\`jsx
// Nesting syntax
<Parent>
  <Child />
</Parent>

// Explicit prop syntax
<Parent children={<Child />} />
\`\`\`

Both pass the \`<Child />\` element as a prop named \`children\`. That's why the optimization works!

## Real-World Pattern: Modal Component

\`\`\`jsx
function Modal({ isOpen, children }) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation logic that triggers re-renders
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={\`modal \${isAnimating ? 'animating' : ''}\`}>
      {children} {/* Won't re-render during animation! */}
    </div>
  );
}

// Usage
<Modal isOpen={showModal}>
  <ComplexForm /> {/* Only renders once, not during animations */}
</Modal>
\`\`\`

## Key Takeaways

Let's recap everything:

1. **Component** = A function that accepts props and returns Elements
   \`\`\`jsx
   const A = () => <B />
   \`\`\`

2. **Element** = An object that describes what to render
   \`\`\`jsx
   const b = <B />
   \`\`\`

3. **Re-render** = React calling your component function

4. **Re-render trigger** = When element object reference changes (\`Object.is()\` comparison)

5. **Optimization** = Elements passed as props don't re-render when parent state updates

6. **Children** = Just a prop! These are the same:
   \`\`\`jsx
   <Parent><Child /></Parent>
   <Parent children={<Child />} />
   \`\`\`

## When to Use This Pattern

Use children as props when:
- Parent has state that changes frequently
- Children are expensive to render
- Children don't need parent's state

Don't over-optimize! Use this pattern when you actually have performance issues, not preemptively.

Understanding elements vs components is the foundation. Master this, and React performance becomes much clearer!`,
    author: "Soufiane Chaoufi",
    publishedAt: "2025-03-01",
    readingTime: 8,
    category: "technical",
    tags: ["React", "Performance", "JavaScript", "Frontend", "Optimization"],
    featured: true,
  },
];

/*
Example BlogPost structure for future reference:
{
  slug: "example-article-slug",
  title: "Example Article Title",
  description: "Brief description of the article for SEO and previews",
  content: `
    # Article Title

    Write your markdown content here...

    ## Section 1
    Your content...

    ## Section 2
    More content...
  `,
  author: "Your Name",
  publishedAt: "2024-12-01", // YYYY-MM-DD format
  readingTime: 8, // estimated reading time in minutes
  category: "technical", // must match one of the categories below
  tags: ["React", "TypeScript", "Web Development"], // array of relevant tags
  featured: false, // set to true for featured articles (shows on homepage)
  imageUrl: "/blog/article-image.jpg" // optional hero image
}
*/

export const categories = [
  { name: "All", slug: "all", description: "All articles" },
  {
    name: "Technical",
    slug: "technical",
    description: "Technical deep dives and tutorials",
  },
  {
    name: "Career",
    slug: "career",
    description: "Career development and industry insights",
  },
  { name: "Tools", slug: "tools", description: "Tool reviews and comparisons" },
  {
    name: "Industry",
    slug: "industry",
    description: "Industry trends and analysis",
  },
];
