import { BlogPost } from "@/types/blog";

// Blog posts array - currently empty for clean slate
// Add new articles by following the BlogPost interface structure
export const posts: BlogPost[] = [
  {
    slug: "react-re-render",
    title: "Understanding React Re-renders: A Deep Dive",
    description: "Learn how React re-renders work, when they happen, and how to optimize your components for better performance.",
    content: `# Understanding React Re-renders: A Deep Dive

Have you ever typed into an input field and watched your entire page slow down? Or clicked a button and wondered why your app froze for a second? I've been there. Let me tell you about the time I built a search bar that re-rendered a thousand product cards every time someone typed a letter. Ouch.

The culprit? I didn't understand re-renders. Once I learned how they work, everything clicked. Let's fix that for you too.

## Think of Components Like Living Things

Imagine your React components are like actors on a stage. They have three acts in their life:

**Component Created → 🟢 Enter Stage → 🔵 Change Costume ↻ → 🔴 Exit Stage**

**🟢 Mounting (Entering the stage)**
Think of this as an actor walking onto stage for the first time:
- They introduce themselves (React creates the component)
- They get their props and costume (state gets initialized)
- They take their position (element appears in the browser)

**🔵 Re-rendering (Changing costume)**
The actor is already on stage, they just change their appearance:
- They stay in the same spot (same component, same place)
- They might change clothes or expression (state/props update)
- The audience sees the new look (DOM updates)

**🔴 Unmounting (Exiting the stage)**
Time to leave:
- They pack up and say goodbye (cleanup runs)
- They leave the stage (component removed from DOM)
- No one remembers their lines (state is destroyed)

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('🟢 I just appeared!'); // Runs once when component mounts

    return () => {
      console.log('🔴 Goodbye!'); // Runs when component leaves
    };
  }, []);

  console.log('🔵 I changed!'); // Runs every time component re-renders

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## So When Does React Actually Re-render?

Here's the thing: re-renders happen more often than you think. Let me show you the most common triggers:

### 1. You Changed Some State

This one's obvious. Every time you call \`setState\`, React re-renders:

\`\`\`jsx
function SearchBar() {
  const [text, setText] = useState('');

  // Every keystroke = new state = re-render
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
\`\`\`

Real talk: This is totally fine! That's literally how React works. You type, state updates, component re-renders with new text. Don't optimize this.

### 2. Your Parent Re-rendered (The Sneaky One)

Here's where it gets interesting. When a parent re-renders, **all children re-render too**—even if their props didn't change.

Let me show you:

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="Alice" /> {/* Yep, this re-renders too! */}
    </div>
  );
}

function Child({ name }) {
  console.log('Child rendered'); // This logs every time you click the button
  return <div>Hello {name}</div>;
}
\`\`\`

Wait, what? The \`name\` prop never changes, but \`Child\` still re-renders every time? Yep!

**Here's the truth**: Props don't prevent re-renders by default. React doesn't check if they changed. It just says "Parent re-rendered? Cool, let's re-render all the kids too."

This surprised me when I first learned it. You're not alone.

#### The Secret Weapon: React.memo

Want props to actually matter? Use \`React.memo\`:

\`\`\`jsx
// Regular component - re-renders whenever parent does
function RegularChild({ name }) {
  console.log('Regular child rendered');
  return <div>Hello {name}</div>;
}

// Wrapped with React.memo - only re-renders when props actually change
const SmartChild = React.memo(function Child({ name }) {
  console.log('Smart child rendered');
  return <div>Hello {name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <RegularChild name="Alice" /> {/* Logs on every click 😅 */}
      <SmartChild name="Bob" /> {/* Only logs if name changes 🎯 */}
    </div>
  );
}
\`\`\`

Think of \`React.memo\` as a bouncer at a club:

1. Parent tries to re-render child
2. Bouncer stops and asks: "Did any props change?"
3. If nothing changed → "Nope, you're not getting in" → skip re-render ✅
4. If something changed → "Alright, go ahead" → re-render as usual

**Pro tip**: Don't wrap everything in \`React.memo\`! Only use it when re-renders actually cause performance issues. Most components render fast enough that you won't notice.

### 3. Context Changed

Using \`useContext\`? When that context value changes, your component re-renders:

\`\`\`jsx
const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext); // Subscribed to theme changes
  return <button className={theme}>Click me</button>;
}

// When theme provider updates, ThemedButton re-renders automatically
\`\`\`

Think of context like a radio station. When you tune in (\`useContext\`), you hear every broadcast. Change the song (update context), and everyone listening gets the new tune.

### 4. Custom Hook Has State

Custom hooks are just functions that use hooks. If they have state, they'll trigger re-renders:

\`\`\`jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth); // Updates state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Use it
function MyComponent() {
  const width = useWindowWidth(); // Re-renders when window resizes
  return <div>Width: {width}px</div>;
}
\`\`\`

## What Doesn't Trigger Re-renders?

Not everything causes a re-render. These are totally safe:

\`\`\`jsx
function NoRerender() {
  const countRef = useRef(0);
  let regularVar = 0;

  const increment = () => {
    countRef.current += 1; // ✅ No re-render, just updates the ref
    regularVar += 1; // ✅ No re-render, but... the value resets on next render anyway
    console.log(countRef.current, regularVar);
  };

  return <button onClick={increment}>Increment</button>;
}
\`\`\`

**Things that DON'T trigger re-renders:**
- Updating a \`useRef\` value
- Changing regular variables (but they reset on re-render, so what's the point?)
- Direct DOM manipulation (\`document.getElementById(...)\`)
- Promise resolving (unless it calls \`setState\` when done)

This is why refs are great for things like tracking previous values or storing timers—you can update them without causing a re-render.

## Behind the Scenes: What React Actually Does

Curious how React handles a re-render? Here's the simple version:

1. **Render Phase** - React calls your component function (runs your code)
2. **Diffing** - React compares the new output with the old one ("what changed?")
3. **Commit Phase** - React updates only the parts of the DOM that actually changed

\`\`\`jsx
function Example() {
  const [count, setCount] = useState(0);

  console.log('1. 🏃 Render phase - I run first');

  useLayoutEffect(() => {
    console.log('2. 🎨 DOM updated but screen not painted yet');
  });

  useEffect(() => {
    console.log('3. ✅ Everything done, screen painted!');
  });

  return <div>{count}</div>;
}
\`\`\`

The cool part? Even if React re-renders your component, it doesn't always update the DOM. If nothing changed in the output, React skips the DOM update entirely. Smart, right?

## How to Optimize Re-renders (When You Actually Need To)

Okay, so you've identified a performance problem. Now what? Here are your tools:

### 1. useMemo - Cache Expensive Calculations

Got a heavy calculation that runs on every render? Cache it:

\`\`\`jsx
function ProductList({ products }) {
  // Without useMemo: sorts on EVERY render (even if products didn't change)
  // With useMemo: only sorts when products actually changes
  const sortedProducts = useMemo(() => {
    console.log('Sorting 10,000 products...'); // Only logs when needed
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]);

  return (
    <ul>
      {sortedProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
\`\`\`

**When to use**: Expensive operations (sorting, filtering large arrays, complex math). Don't use it for simple stuff like \`fullName = firstName + lastName\`—that's faster than the memoization overhead!

### 2. useCallback - Cache Functions

When passing functions to memoized children, wrap them so the reference stays the same:

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Without useCallback: new function every render = child re-renders
  // ✅ With useCallback: same function reference = child skips re-render
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = React.memo(function Child({ onClick }) {
  console.log('Child rendered'); // Only logs when onClick changes
  return <button onClick={onClick}>Click me</button>;
});
\`\`\`

**Real talk**: Only use \`useCallback\` with \`React.memo\`. Otherwise, you're just adding complexity for no benefit.

### 3. Component Composition (The Secret Sauce)

This is my favorite optimization. No fancy hooks, just better structure:

\`\`\`jsx
// ❌ Bad: typing in search box re-renders EVERYTHING
function BadLayout() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <ExpensiveHeader /> {/* Re-renders on every keystroke */}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ExpensiveContent /> {/* Re-renders on every keystroke */}
    </div>
  );
}

// ✅ Good: move state to where it's actually used
function GoodLayout() {
  return (
    <div>
      <ExpensiveHeader /> {/* Never re-renders */}
      <SearchBar /> {/* Only this re-renders */}
      <ExpensiveContent /> {/* Never re-renders */}
    </div>
  );
}

function SearchBar() {
  const [search, setSearch] = useState(''); // State lives here now
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
\`\`\`

**The rule**: Push state down to the smallest component that needs it. This alone solves 90% of performance issues I've seen.

## Mistakes I See All The Time

### Mistake #1: Creating Objects/Arrays Inline

\`\`\`jsx
// ❌ Bad: New object every render = breaks React.memo
function Bad() {
  return <MemoizedChild config={{ theme: 'dark' }} />; // New object every time!
}

// ✅ Better: Stable reference
function Good() {
  const config = useMemo(() => ({ theme: 'dark' }), []);
  return <MemoizedChild config={config} />;
}

// ✅ Best: Just move it outside if it never changes
const CONFIG = { theme: 'dark' };
function Best() {
  return <MemoizedChild config={CONFIG} />;
}
\`\`\`

### Mistake #2: Inline Functions with React.memo

\`\`\`jsx
// ❌ New function every render = child re-renders anyway
<MemoizedChild onClick={() => doSomething()} />

// ✅ Stable function reference
const handleClick = useCallback(() => doSomething(), []);
<MemoizedChild onClick={handleClick} />
\`\`\`

But honestly? If the child isn't expensive to render, just skip the memoization entirely.

### Mistake #3: Over-Optimizing Everything

This is the big one. I see developers wrapping every component in \`React.memo\` and every function in \`useCallback\`. Stop!

\`\`\`jsx
// ❌ Unnecessary - this renders in microseconds
const SimpleText = React.memo(function Text({ children }) {
  return <p>{children}</p>;
});

// ✅ Just let it re-render!
function SimpleText({ children }) {
  return <p>{children}</p>;
}
\`\`\`

**My rule**: Don't optimize until you have a real performance issue. Measure first (use React DevTools Profiler), then optimize.

## How to Debug Re-renders

Got a performance issue? Here's how to find the culprit:

### Use React DevTools Profiler

1. Install [React DevTools](https://react.dev/learn/react-developer-tools) browser extension
2. Open DevTools → Profiler tab
3. Click record, interact with your app, stop recording
4. See exactly which components re-rendered and how long each took

This tool is a game-changer. Use it!

### Good Old console.log

Sometimes simple is best:

\`\`\`jsx
function Component(props) {
  console.log('🔵 Component rendered', props);

  useEffect(() => {
    console.log('Props changed:', props);
  }, [props]);

  return <div>...</div>;
}
\`\`\`

### why-did-you-render Library

This npm package automatically logs unnecessary re-renders:

\`\`\`bash
npm install @welldone-software/why-did-you-render
\`\`\`

Great for catching issues you didn't even know existed.

## The Bottom Line

Let's wrap this up with what actually matters:

1. **Re-renders are normal and good** - They're how React updates your UI. Don't fear them.

2. **State changes trigger re-renders** - Update state → component re-renders. That's the deal.

3. **Kids follow parents** - Parent re-renders → all children re-render (unless you use \`React.memo\`).

4. **Props are ignored by default** - React doesn't check if props changed. Only \`React.memo\` makes props matter.

5. **Move state down** - Keep state as close as possible to where it's used. This beats any optimization hook.

6. **Custom hooks = shared state** - Use a hook with state? Your component re-renders when that state changes.

7. **Measure before optimizing** - Use React DevTools Profiler. Don't guess.

8. **Simple structure beats clever code** - Rearranging components is usually better than adding memoization.

9. **Most re-renders are fine** - Seriously, React is fast. Don't optimize unless you have an actual, measurable problem.

**My advice**: Build your app first. If it feels slow, profile it. Then—and only then—optimize the real bottlenecks. You'll write better code and stay sane.

Happy coding! 🚀`,
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

I remember the first time I ran \`npm install\` on a new project. I went to grab coffee, came back five minutes later, and it was still installing. Then I checked my disk space: I had the same React library installed 47 times across different projects. 47 times!

That's when I started exploring alternatives. Let me save you some time and break down what I've learned.

## What Even Is a Package Manager?

Think of it like the App Store on your phone, but for code. Need a date picker? A chart library? HTTP requests? Someone already built it. Package managers download these tools and keep them organized.

All four tools (npm, Yarn, pnpm, Bun) do this same basic job. The differences? Speed, disk space, and some bonus features.

## Meet The Contenders

### npm - The Default Choice

This is the OG. It comes with [Node.js](https://nodejs.org), so if you've installed Node, you already have [npm](https://docs.npmjs.com). No extra setup needed.

**Why it's good:**
- Already on your machine (probably)
- Massive community - every tutorial uses npm
- Works everywhere without any fuss

**The downsides:**
- Slowest of the bunch (we're talking minutes vs seconds)
- Eats disk space like crazy (duplicates the same packages across projects)
- Sometimes different team members get different results (annoying!)

### Yarn - The Reliable Upgrade

Facebook built [Yarn](https://yarnpkg.com) when npm was having issues. There are two versions: Yarn Classic (v1) is rock-solid and what most people use. Yarn Berry (v2+) is a total rewrite with wild new features.

**Why I like it:**
- Way faster than npm
- Works offline! (Downloaded packages before? No internet needed)
- More secure (verifies packages weren't tampered with)
- Great for managing multiple related packages ([workspaces](https://yarnpkg.com/features/workspaces))

**The gotchas:**
- Yarn Berry is powerful but weird (it's a whole thing)
- Some packages don't play nice with it
- You have to install it separately

**Real talk**: I used Yarn for years on production apps. It's solid and you can't go wrong with it.

### pnpm - The Space Saver

Here's the clever part: [pnpm](https://pnpm.io) doesn't copy packages to every project. It stores each package once on your computer and creates shortcuts (symlinks) to them. Got 50 projects using React? Only one copy on disk.

**Why it's awesome:**
- Lightning fast installs
- Saved me 50GB+ of disk space (seriously)
- Strict about dependencies (catches mistakes other tools miss)
- Perfect for big projects with multiple packages ([monorepos](https://monorepo.tools))

**The trade-offs:**
- Shortcuts can confuse some older tools
- Smaller community (but growing fast!)
- Strictness can break badly-written packages

**My take**: I switched to pnpm a year ago and never looked back. The disk savings alone are worth it.

### Bun - The Speed Demon

[Bun](https://bun.sh) is the new hotness. It's not just a package manager—it runs your code, bundles it, and even has built-in testing. Built from scratch for pure speed.

**The hype is real:**
- FAST. Like, scary fast (10-20x faster than npm)
- Does everything - run code, install packages, bundle apps, run tests
- Works with existing npm packages (mostly)
- One tool instead of five

**But hold on:**
- Still new (released in 2023)
- Some npm packages don't work yet
- Smaller community means fewer Stack Overflow answers

**My opinion**: Bun is incredible for new projects and experimenting. For critical production stuff? I'd wait a bit longer for the ecosystem to mature.

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

## So Which One Should You Actually Use?

Let me give you the real answer, not the "it depends" cop-out:

**Use npm if:**
- You're just learning JavaScript (stick with what tutorials use)
- You want zero friction (it's already installed)
- You work on simple side projects
- Compatibility is your top priority

**Use Yarn if:**
- You're on a team that already uses it (don't fight the team)
- You manage a big project with multiple packages
- You need offline installs (sketchy wifi? I feel you)
- You want reliable speed without learning something new

**Use pnpm if:**
- You work on a laptop with limited disk space
- You have tons of projects on one machine
- You want the fastest possible installs
- You're building a monorepo (multiple related packages)

**Use Bun if:**
- You love trying new tech
- You're starting a greenfield project
- You want one tool for everything
- You're okay troubleshooting weird edge cases

## My Honest Recommendation

**If you're new to web dev**: Stick with npm. Learn the fundamentals first. Don't overwhelm yourself.

**If you're comfortable with JavaScript**: Switch to pnpm. You'll thank me when you save 50GB of disk space and installs finish in seconds instead of minutes.

**If you love shiny new things**: Try Bun! It's genuinely impressive. Just don't bet your startup on it quite yet.

**If you're on a team**: Use whatever they're using. Seriously, don't be that person who changes the package manager mid-project.

## How to Switch (It's Easier Than You Think)

Want to try a different package manager? Here's the complete guide:

1. **Delete the old stuff:**
   \`\`\`bash
   rm -rf node_modules           # Delete all installed packages
   rm package-lock.json          # npm's lock file
   rm yarn.lock                  # Yarn's lock file
   rm pnpm-lock.yaml             # pnpm's lock file
   rm bun.lockb                  # Bun's lock file
   \`\`\`

2. **Install with your new tool:**
   \`\`\`bash
   pnpm install  # or: yarn install, bun install, etc.
   \`\`\`

3. **Update your [CI/CD](https://about.gitlab.com/topics/ci-cd/) pipelines** - Change GitHub Actions, GitLab CI, etc. to use the new package manager

4. **Commit the new lock file** - This is important! Your team needs it.

That's literally it. Your [\`package.json\`](https://docs.npmjs.com/creating-a-package-json-file) doesn't change at all.

I've switched package managers on production apps multiple times. Never had a major issue. Just make sure to test everything after the switch.

## The Real Answer

Here's what nobody tells you: **there's no perfect choice**. Each tool has trade-offs.

npm is slow but reliable. Yarn is fast and proven. pnpm saves disk space. Bun is bleeding-edge.

My workflow? I use pnpm for everything now. It's fast, stable, and that disk space savings is chef's kiss. But npm is totally fine for most projects. And Bun? I'm watching it closely.

**The best advice**: Pick one, learn it well, and only switch when you have a real reason. Don't chase the shiny new tool every month.

Now go build something cool! 🚀`,
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

Ever had a component that re-renders way too much for no reason? I spent two hours debugging why my modal kept re-rendering during its animation, making everything janky. Turns out, I didn't understand the difference between elements and components.

Once I got it, I fixed the bug in 5 minutes and learned a powerful performance trick. Let me share what I learned.

## Components Are Just Functions

Seriously, that's all they are. Here's a component:

\`\`\`jsx
const Parent = () => {
  return <Child />;
};
\`\`\`

That's it! It's a function that returns some JSX. If it needs props, they're just the first argument:

\`\`\`jsx
const Parent = (props) => {
  return <Child name={props.userName} />;
};
\`\`\`

No magic, just JavaScript functions.

## So What Are Elements Then?

Every time you write those angle brackets (\`<Child />\`), you're creating an Element:

\`\`\`jsx
<Child />  // This is an Element
<Parent /> // This is also an Element
<div />    // Yep, this too
\`\`\`

An Element is just a plain JavaScript object that tells React what to show on screen. That nice HTML-looking syntax? It's just shorthand.

These are identical:

\`\`\`jsx
// What you write (JSX)
<Child name="Alice" />

// What it becomes (plain JavaScript)
React.createElement(Child, { name: "Alice" }, null)
\`\`\`

JSX is basically fancy syntax sugar. Your code gets converted to \`React.createElement()\` calls before it runs.

## The Secret: How React Compares Objects

Here's where it gets interesting. React needs to know if something changed, so it uses \`Object.is()\` to compare stuff.

\`Object.is()\` doesn't look at what's inside objects—it checks if they're literally the same object in memory:

\`\`\`jsx
// Primitives work as expected
Object.is(5, 5);              // true
Object.is('hello', 'hello');  // true

// But objects? Different story
const obj1 = { name: 'React' };
const obj2 = { name: 'React' };  // Looks identical, right?
const obj3 = obj1;               // Points to the same object

Object.is(obj1, obj2); // false! Different objects in memory
Object.is(obj1, obj3); // true! Same object reference
\`\`\`

**This is huge**: Even if two objects have the exact same stuff inside, \`Object.is()\` says they're different if they're separate objects.

Think of it like this: Two houses can have the same furniture and layout, but they're still different houses at different addresses.

Learn more about [\`Object.is()\` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

## What Happens During a Re-render

A re-render just means React runs your component function again. That's it.

Here's the process:

1. **Run your function** - React executes all your code and hooks
2. **Build element tree** - Creates a blueprint of what should be on screen
3. **Compare with last time** - What changed?
4. **Update the DOM** - Only touch what actually changed

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('Function running!'); // Logs every re-render

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

Every click runs the entire function. That's a re-render.

## The Magic Rule That Changes Everything

Ready for the game-changer?

**If the element object is the same before and after re-render (same reference via \`Object.is()\`), React skips re-rendering that component and its children.**

React doesn't care what's inside the element. It only checks: "Is this literally the same object?"

Same reference = skip re-render. Different reference = re-render.

This one rule is the key to the performance trick I'm about to show you.

## The Problem: Why Children Keep Re-rendering

Here's a common scenario that causes unnecessary re-renders:

\`\`\`jsx
const Parent = () => {
  const [state, setState] = useState(0);

  return <Child />; // Creating the element here
};
\`\`\`

When you update state, here's what happens:

1. \`setState\` called → Parent re-renders
2. Parent function runs again
3. \`<Child />\` gets created **again** → new object in memory
4. React compares: \`Object.is(oldChild, newChild)\` → **false**
5. Child re-renders even though nothing about it changed!

Think about it:

\`\`\`jsx
// First render
const elementRender1 = <Child />; // New object

// Second render (after setState)
const elementRender2 = <Child />; // Different new object

Object.is(elementRender1, elementRender2); // false! 🔴
\`\`\`

**The result**: Parent re-renders → creates new child element → child re-renders.

Even though \`Child\` doesn't use Parent's state! Wasteful, right?

## The Solution: Pass Children as Props (Mind Blown 🤯)

Now watch this trick. Instead of creating the child inside Parent, pass it as a prop:

\`\`\`jsx
const Parent = ({ child }) => {
  const [state, setState] = useState(0);

  return child; // Just using the prop
};

// Create the child element OUTSIDE Parent
<Parent child={<Child />} />
\`\`\`

Now when state updates:

1. \`setState\` called → Parent re-renders
2. Parent function runs again
3. Returns \`child\` prop → **same object reference!**
4. React compares: \`Object.is(oldChild, newChild)\` → **true** ✅
5. Child re-render skipped! 🎉

Here's why it works:

\`\`\`jsx
// Child element created ONCE, outside Parent
const childElement = <Child />;

// First render
<Parent child={childElement} /> // Using this reference

// Second render (after setState)
<Parent child={childElement} /> // SAME reference!

Object.is(childElement, childElement); // true! ✅
\`\`\`

**The magic**: The child element is created outside Parent, so it doesn't get recreated when Parent re-renders.

Parent's state changes → Parent re-renders → Child doesn't! 🚀

## Real Example: The Theme Switcher

Let me show you this with a real scenario. Say you have a layout with a theme toggle:

### ❌ The Slow Way

\`\`\`jsx
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
\`\`\`

Click the theme button → everything re-renders. If sidebar and content are heavy, your UI will lag.

### ✅ The Fast Way

\`\`\`jsx
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
\`\`\`

Now click the theme button → only Layout re-renders. Children are untouched. Butter smooth! 🧈

This is the exact pattern that fixed my janky modal animation.

## Wait, Children is Just a Prop?

Yep! This blew my mind when I learned it.

These are **exactly the same**:

\`\`\`jsx
// Nested syntax (what you usually see)
<Parent>
  <Child />
</Parent>

// Explicit prop syntax (literally the same thing)
<Parent children={<Child />} />
\`\`\`

\`children\` is just a special prop name. React automatically passes nested elements as the \`children\` prop.

Mind. Blown. 🤯

## Another Real Example: The Modal

Here's the modal that was killing me with janky animations:

\`\`\`jsx
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
    <div className={\`modal \${isAnimating ? 'animating' : ''}\`}>
      {children} {/* Doesn't re-render during animation! */}
    </div>
  );
}

// Usage
<Modal isOpen={showModal}>
  <HeavyForm /> {/* Renders once, not 60 times during animation */}
</Modal>
\`\`\`

Before I knew this trick, the form would re-render during the animation. Laggy mess.

After? Smooth as butter. The form renders once, and the modal animates independently.

## What You Need to Remember

Let me distill this down to the essentials:

1. **Component = Function**
   \`\`\`jsx
   const MyComponent = () => <div>Hi</div>
   \`\`\`
   Just a function. Nothing fancy.

2. **Element = Object**
   \`\`\`jsx
   const element = <MyComponent />
   \`\`\`
   An object describing what to show.

3. **Re-render = Function runs again**
   When state updates, React calls your function again.

4. **Same reference = skip re-render**
   React uses \`Object.is()\` to check if an element changed.

5. **Pass children as props for free optimization**
   Element created outside parent → doesn't recreate on parent re-render → child skips re-render.

6. **\`children\` is just a normal prop**
   \`\`\`jsx
   <Parent><Child /></Parent>
   // Same as:
   <Parent children={<Child />} />
   \`\`\`

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

Now go forth and build fast UIs! ⚡`,
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
