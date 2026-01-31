---
slug: "memoization-with-usememo-usecallback-and-react-memo"
title: "Memoization with useMemo, useCallback and React.memo"
description: "A deep dive into React's memoization tools and when to actually use them without shooting yourself in the foot."
author: "Soufiane Chaoufi"
publishedAt: "2025-10-04"
category: "technical"
tags: ["React", "Performance", "Hooks", "Optimization", "JavaScript"]
featured: false
---

# Memoization with useMemo, useCallback and React.memo

I spent a whole afternoon debugging why my "optimized" React component was re-rendering more than before I "optimized" it. Turns out, I had wrapped everything in [`React.memo`](https://react.dev/reference/react/memo), sprinkled [`useCallback`](https://react.dev/reference/react/useCallback) everywhere, and somehow made things worse. Sound familiar?

Let me share what I've learned about React memoization the hard way, so you don't have to make the same mistakes.

## The reference vs. value trap

Here's the thing that tripped me up for way too long: **React compares objects, arrays, and functions by reference, not by their contents**.

This matters in two critical places:

1. When React checks hook dependencies (like in `useEffect`, `useMemo`, `useCallback`)
2. When React compares props on components wrapped in `React.memo`

```jsx
// ❌ This will trigger the effect on every render
function ProfileCard({ user }) {
  useEffect(() => {
    console.log("User changed!");
  }, [user]); // user is an object - new reference each time

  return <div>{user.name}</div>;
}

// ✅ Better - depend on specific values
function ProfileCard({ user }) {
  useEffect(() => {
    console.log("User ID changed!");
  }, [user.id]); // primitive value - stable comparison

  return <div>{user.name}</div>;
}
```

Every time the parent re-renders and creates a new `user` object, even with identical data, React sees it as different because it's a new reference in memory.

## useMemo: cache the result

[`useMemo`](https://react.dev/reference/react/useMemo) lets you cache the **result** of an expensive calculation between re-renders. Think of it as saying "hey React, only recalculate this when these specific values change."

```jsx
function DataDashboard({ transactions }) {
  // Without useMemo - recalculates on every render
  const summary = calculateExpensiveSummary(transactions);

  // With useMemo - only recalculates when transactions change
  const summary = useMemo(() => {
    return calculateExpensiveSummary(transactions);
  }, [transactions]);

  return <SummaryView data={summary} />;
}
```

**But here's the catch**: the function you pass to `useMemo` is still recreated on every render. React just decides whether to _execute_ it based on the dependencies.

### When I actually use useMemo

I reach for `useMemo` in these situations:

1. **Heavy computations** that run on every render
2. **Preserving object reference** to prevent child re-renders
3. **Derived state** from props or state that's expensive to calculate
4. **When the value is used as a dependency** in another hook

```jsx
function ProductList({ items, filters }) {
  // This filtering might be expensive with thousands of items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return filters.every((filter) => filter.test(item));
    });
  }, [items, filters]);

  return (
    <ExpensiveList
      items={filteredItems} // Stable reference when deps don't change
    />
  );
}
```

Here's an example where memoization is necessary because the prop is used as a dependency:

```jsx
const DataFetcher = React.memo(function DataFetcher({ onFetch }) {
  useEffect(() => {
    // onFetch is in dependencies - needs stable reference
    onFetch();
  }, [onFetch]);

  return <div>Fetching...</div>;
});

function Dashboard() {
  // ❌ Without useCallback, onFetch changes every render
  // and useEffect runs every time
  const handleFetch = () => {
    fetchDashboardData();
  };

  // ✅ With useCallback, onFetch has stable reference
  const handleFetch = useCallback(() => {
    fetchDashboardData();
  }, []);

  return <DataFetcher onFetch={handleFetch} />;
}
```

Without `useCallback`, the effect inside `DataFetcher` would run on every render, even though the function does the same thing.

## useCallback: cache the function itself

While `useMemo` caches the result, [`useCallback`](https://react.dev/reference/react/useCallback) caches the **function itself**. It's essentially shorthand for `useMemo(() => fn, deps)`.

```jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");

  // ❌ New function on every render
  const handleSubmit = () => {
    onSearch(query);
  };

  // ✅ Same function reference until query changes
  const handleSubmit = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);

  return <SearchButton onClick={handleSubmit} />;
}
```

### The useCallback trap I fell into

Here's where I wasted hours: wrapping functions in `useCallback` without wrapping the component in `React.memo` does absolutely nothing for performance.

```jsx
// ❌ Pointless - SearchButton will re-render anyway
function SearchForm() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <SearchButton onClick={handleClick} />;
}

// ✅ Now it actually helps
const SearchButton = React.memo(function SearchButton({ onClick }) {
  console.log("SearchButton rendered");
  return <button onClick={onClick}>Search</button>;
});

function SearchForm() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <SearchButton onClick={handleClick} />;
}
```

## What's actually happening under the hood

Before we go deeper, let me explain what React is doing behind the scenes. Understanding this helped me stop making silly mistakes.

When you call `useCallback` or `useMemo`, React stores the value somewhere in memory. On subsequent renders, it checks if the dependencies changed. If they haven't, it returns the stored value. If they have, it updates the cache.

Here's a mental model I use for `useCallback`:

```jsx
// Simplified version of what React does internally
let storedFunction;
let previousDeps;

function useCallback(fn, deps) {
  // Check if dependencies changed
  if (previousDeps && depsAreEqual(deps, previousDeps)) {
    return storedFunction; // Return cached function
  }

  // Dependencies changed or first render
  storedFunction = fn;
  previousDeps = deps;
  return fn;
}
```

And `useMemo` works similarly, except it calls the function and stores the result:

```jsx
// Simplified version of what React does internally
let storedResult;
let previousDeps;

function useMemo(fn, deps) {
  if (previousDeps && depsAreEqual(deps, previousDeps)) {
    return storedResult; // Return cached result
  }

  // Call the function and cache its result
  storedResult = fn();
  previousDeps = deps;
  return storedResult;
}
```

**Critical point**: The function you pass to either hook gets recreated on every render. That's just how JavaScript works. React doesn't prevent that - it just decides whether to use the new function or return the cached value.

This means there's always some overhead. React has to:

1. Recreate the function you passed
2. Check if dependencies changed
3. Decide whether to execute it or return cached value

On initial render, there's no cached value, so React does extra work storing it. With hundreds of `useMemo` calls scattered everywhere, this can actually slow down your app's startup time.

## React.memo: skip re-renders with shallow comparison

[`React.memo`](https://react.dev/reference/react/memo) is a higher-order component that tells React: "only re-render this component if its props actually changed."

```jsx
// Without React.memo - re-renders whenever parent re-renders
function UserCard({ name, email }) {
  console.log("UserCard rendered");
  return (
    <div>
      {name} - {email}
    </div>
  );
}

// With React.memo - only re-renders when name or email change
const UserCard = React.memo(function UserCard({ name, email }) {
  console.log("UserCard rendered");
  return (
    <div>
      {name} - {email}
    </div>
  );
});
```

**Important**: React.memo only prevents re-renders triggered by the parent. If the component uses internal state or context that changes, it will still re-render.

### When a single prop breaks everything

Here's a mistake I've seen (and made) countless times: you carefully memoize most props, but miss just one. That single unmemoized prop destroys the entire optimization.

```jsx
const ExpensiveList = React.memo(function ExpensiveList({
  items,
  onSelect,
  theme,
}) {
  console.log("ExpensiveList rendered");
  return items.map((item) => (
    <Item key={item.id} data={item} onSelect={onSelect} theme={theme} />
  ));
});

function Dashboard() {
  const items = useMemo(() => fetchItems(), []);
  const handleSelect = useCallback((id) => {
    /* ... */
  }, []);

  // ❌ theme is created inline - new object every render
  return (
    <ExpensiveList
      items={items}
      onSelect={handleSelect}
      theme={{ primary: "#blue", secondary: "#gray" }}
    />
  );
}
```

You memoized `items` and `handleSelect` perfectly, but `theme` breaks everything. `ExpensiveList` re-renders on every Dashboard re-render because of that one inline object.

The fix? Memoize that too:

```jsx
function Dashboard() {
  const items = useMemo(() => fetchItems(), []);
  const handleSelect = useCallback((id) => {
    /* ... */
  }, []);
  const theme = useMemo(
    () => ({
      primary: "#blue",
      secondary: "#gray",
    }),
    [],
  );

  return <ExpensiveList items={items} onSelect={handleSelect} theme={theme} />;
}
```

## The children prop gotcha

This one burned me badly. The `children` prop is also compared by reference, and it's almost always a new reference.

```jsx
// ❌ OptimizedCard will still re-render every time
const OptimizedCard = React.memo(function Card({ children }) {
  return <div className="card">{children}</div>;
});

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <OptimizedCard>
        <p>This is new JSX on every render!</p>
      </OptimizedCard>
    </>
  );
}

// ✅ Extract children to a separate memoized component
const CardContent = React.memo(function CardContent() {
  return <p>This is stable now!</p>;
});

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <OptimizedCard>
        <CardContent />
      </OptimizedCard>
    </>
  );
}
```

## The props spreading trap

This one cost me hours of debugging. When you spread props through component chains, you lose control over what's being passed down.

```jsx
const ProductCard = React.memo(function ProductCard(props) {
  console.log("ProductCard rendered");
  return <div>{props.name}</div>;
});

function ProductWrapper(props) {
  // Just passing everything through, seems harmless right?
  return <ProductCard {...props} />;
}

function ProductList() {
  const products = useMemo(() => fetchProducts(), []);

  return products.map((product) => (
    // ❌ Adding extra data that's not memoized
    <ProductWrapper
      key={product.id}
      {...product}
      metadata={{ timestamp: Date.now() }} // This breaks memoization!
    />
  ));
}
```

That `metadata` prop with `Date.now()` creates a new object every render. Even though `ProductCard` is memoized, it re-renders every time because `metadata` keeps changing.

The problem gets worse in larger codebases where components are spread across multiple files. Someone adds a non-memoized prop three components up the tree, and suddenly your carefully optimized leaf component is re-rendering like crazy.

**My rules for React.memo components:**

1. **Never spread props** - Be explicit about what you're passing
2. **Avoid non-primitive props from parent props** - They're almost never memoized
3. **Watch out for props from custom hooks** - More on this next

## Custom hooks: the hidden memoization killer

Custom hooks are amazing for extracting logic, but they're also a common source of broken memoization. Here's why:

```jsx
const FormCard = React.memo(function FormCard({ onSubmit }) {
  console.log("FormCard rendered");
  return <form onSubmit={onSubmit}>...</form>;
});

function useFormHandler() {
  const [data, setData] = useState({});

  // ❌ New function created every render
  const handleSubmit = (e) => {
    e.preventDefault();
    submitData(data);
  };

  return { handleSubmit, setData };
}

function ContactForm() {
  const { handleSubmit } = useFormHandler();

  // FormCard re-renders every time because handleSubmit is always new
  return <FormCard onSubmit={handleSubmit} />;
}
```

The custom hook runs on every render and creates a new `handleSubmit` function each time. From the outside, you can't tell if `handleSubmit` has a stable reference or not without diving into the hook's implementation.

The fix is to memoize inside the custom hook:

```jsx
function useFormHandler() {
  const [data, setData] = useState({});

  // ✅ Memoized function with stable reference
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submitData(data);
    },
    [data],
  );

  return { handleSubmit, setData };
}
```

This is why I'm careful about what I extract into custom hooks when working with memoized components. Sometimes it's better to keep the logic inline where you can see exactly what's memoized.

## Nested memoized components

Ready for a mind-bender? Even when both parent and child are memoized, you can still break the optimization:

```jsx
const ChildCard = React.memo(function ChildCard() {
  console.log("ChildCard rendered");
  return <div>Child content</div>;
});

const ParentCard = React.memo(function ParentCard({ children }) {
  console.log("ParentCard rendered");
  return <div className="parent">{children}</div>;
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      {/* ❌ Both are memoized, but both re-render! */}
      <ParentCard>
        <ChildCard />
      </ParentCard>
    </>
  );
}
```

What's happening? The `<ChildCard />` JSX creates a new element object on every render. That object becomes the `children` prop for `ParentCard`. New object = re-render.

The fix? Memoize the child element itself:

```jsx
function App() {
  const [count, setCount] = useState(0);

  const childElement = useMemo(() => <ChildCard />, []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <ParentCard>{childElement}</ParentCard>
    </>
  );
}
```

Now `childElement` has a stable reference, `ParentCard` doesn't re-render, and neither does `ChildCard`. You might not even need `ChildCard` to be memoized at that point.

### Children as render functions

The same trap exists with render props:

```jsx
const DataContainer = React.memo(function DataContainer({ children }) {
  const data = fetchData();
  return children(data);
});

function Dashboard() {
  // ❌ New function every render
  return <DataContainer>{(data) => <div>{data.title}</div>}</DataContainer>;
}
```

Fix it by memoizing the render function:

```jsx
function Dashboard() {
  const renderData = useCallback((data) => {
    return <div>{data.title}</div>;
  }, []);

  return <DataContainer>{renderData}</DataContainer>;
}
```

## When NOT to memoize

Real talk: I probably over-memoized my code for the first year of using hooks. Here's when memoization is a waste:

**1. Cheap renders**

```jsx
// ❌ Over-engineering
const SimpleLabel = React.memo(function Label({ text }) {
  return <span>{text}</span>;
});

// ✅ Just let it render - it's fast enough
function Label({ text }) {
  return <span>{text}</span>;
}
```

**2. Props that always change**

```jsx
// ❌ Pointless - data is always a new array
const List = React.memo(function List({ data }) {
  return data.map((item) => <div key={item.id}>{item.name}</div>);
});

function Dashboard() {
  const data = items.filter((item) => item.active); // New array every render
  return <List data={data} />;
}
```

**3. When you can't control all props**

```jsx
// ❌ Incomplete memoization - onUpdate is not memoized
function Parent() {
  const [state, setState] = useState(0);

  return (
    <MemoizedChild
      value={state}
      onUpdate={() => setState((s) => s + 1)} // New function every time!
    />
  );
}
```

**4. Components that never re-render**

If a component only renders once and never updates, `useMemo` does nothing except add overhead on that initial render. You're just making React do extra work for zero benefit.

## The "expensive calculation" myth

Let's talk about something that bothers me: the obsession with memoizing "expensive calculations" without actually measuring anything.

I see code like this all the time:

```jsx
function ProductGrid({ products }) {
  // "This filter is expensive, better memoize it!"
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.inStock);
  }, [products]);

  return filteredProducts.map((p) => <ProductCard key={p.id} product={p} />);
}
```

Is filtering an array expensive? Maybe. Maybe not. **It depends.**

Here's what I learned after actually profiling: JavaScript operations are usually blazing fast compared to React rendering.

I ran a test on my laptop (with 6x CPU slowdown in DevTools):

- Sorting 300 items: **~2ms**
- Filtering 1000 items: **~3ms**
- Rendering those 300 items as simple buttons: **~25ms**

The rendering was **10x slower** than the JavaScript! If I want better performance, memoizing the filter won't move the needle. I need to prevent unnecessary re-renders of the components themselves.

### What actually matters

Before wrapping something in `useMemo`, ask:

1. **How long does this calculation actually take?** Use `console.time()` to measure it.
2. **How long does re-rendering the components take?** Use React DevTools Profiler.
3. **Does this component re-render frequently?** If it only renders once, memoization is pointless.

```jsx
function Analytics({ data }) {
  // Measure the calculation
  console.time("process data");
  const processed = processData(data);
  console.timeEnd("process data");

  // If this logs "process data: 2ms" and the component only renders
  // on initial load, useMemo is just adding complexity for nothing
  return <Chart data={processed} />;
}
```

Your laptop might handle that array operation in 2ms, but an old Android phone might take 100ms. Or maybe the calculation is instant, but you're running it inside a loop that fires on every mouse move. Context is everything.

**Measure first. Optimize second.**

And remember: with hundreds of `useMemo` calls scattered everywhere, you're asking React to manage hundreds of cached values. That's memory and processing overhead on every render, especially the initial render where there's nothing cached yet.

## My mental model for memoization

After making every mistake possible, here's the decision tree I use:

1. **Is the component slow to render?** If not, don't memoize.
2. **Does it re-render often with the same props?** If not, don't memoize.
3. **Can I memoize ALL non-primitive props?** If not, maybe composition is better.
4. **Is the parent passing down props from other props or hooks?** Danger zone - hard to memoize properly.

## Composition over memoization

Here's my hot take: before reaching for `React.memo`, try splitting components and moving state down.

```jsx
// ❌ Complex memoization needed
function Dashboard() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(
    () => items.filter((item) => item.name.includes(searchQuery)),
    [searchQuery],
  );

  return (
    <>
      <ExpensiveChart data={chartData} />
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <ItemList
        items={filteredItems}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </>
  );
}

// ✅ Move state closer to where it's used
function Dashboard() {
  return (
    <>
      <ExpensiveChart data={chartData} />
      <SearchableList />
    </>
  );
}

function SearchableList() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(
    () => items.filter((item) => item.name.includes(searchQuery)),
    [searchQuery],
  );

  return (
    <>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <ItemList
        items={filteredItems}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </>
  );
}
```

Now `ExpensiveChart` doesn't re-render when search or selection changes. No memoization needed.

## Key takeaways

After all the trial and error, here's what actually matters:

1. **Reference equality is everything** - React compares objects, arrays, and functions by reference, not content. This affects both hook dependencies and `React.memo` comparisons. Two objects with identical contents are still different if they're different objects in memory.

2. **The function always recreates** - Whether you use `useMemo` or `useCallback`, the inline function you pass gets recreated every render. React just decides whether to execute it or return the cached value. There's always some overhead.

3. **Memoization must be complete** - Wrapping a component in `React.memo` only helps if **ALL** non-primitive props are memoized or stable. One unmemoized prop breaks the entire optimization. This is harder than it sounds.

4. **Children are props too** - The `children` prop is usually a new reference on every render. JSX creates new objects. If you pass `<ChildComponent />` as children to a memoized parent, that parent will re-render every time unless you memoize the child element itself.

5. **Props spreading is dangerous** - When you spread props through component chains, you lose visibility into what's being passed down. Someone can add a non-memoized prop several components up and break memoization deep in the tree.

6. **Custom hooks hide memoization state** - You can't tell from outside a custom hook whether its returned values have stable references. This makes them risky to use with memoized components unless you control the hook implementation.

7. **Composition beats memoization** - Moving state closer to where it's used often eliminates the need for memoization entirely. Try that first before reaching for `React.memo`.

8. **Measure before optimizing** - JavaScript calculations are often 10x faster than React rendering. Profile with [React DevTools Profiler](https://react.dev/learn/react-developer-tools) to find real bottlenecks. Premature memoization adds complexity and overhead on initial renders.

9. **React.memo only works for parent-triggered re-renders** - If a component re-renders because of its own state, context, or hooks, `React.memo` does nothing. It only prevents re-renders caused by the parent re-rendering.

## What's next?

Start by identifying your actual performance bottlenecks with React DevTools Profiler. You might be surprised that the components you thought needed optimization are perfectly fine, while something else is the real culprit.

When you do need memoization, start conservative: wrap the slow component in `React.memo`, then work backward to memoize only the props that need it. It's easier to add memoization than to debug why your "optimized" component isn't working.

And remember: a slightly slower app that's easy to maintain beats a highly optimized mess every time.

## References

- [React.memo API Reference](https://react.dev/reference/react/memo) - Official React documentation
- [useMemo Hook Reference](https://react.dev/reference/react/useMemo) - Official React documentation
- [useCallback Hook Reference](https://react.dev/reference/react/useCallback) - Official React documentation
- [React Developer Tools](https://react.dev/learn/react-developer-tools) - Profiling and debugging tools
- "Advanced React" by Nadia Makarevich - Deep dive into performance patterns and techniques
