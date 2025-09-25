import { BlogPost } from "@/types/blog";

export const posts: BlogPost[] = [
  {
    slug: "getting-started-with-nextjs-15",
    title: "Getting Started with Next.js 15: A Complete Guide",
    description: "Explore the latest features and improvements in Next.js 15, including the new App Router, Server Components, and performance optimizations that make building React applications faster and more efficient.",
    content: `
# Getting Started with Next.js 15: A Complete Guide

Next.js 15 brings a revolutionary set of features that transform how we build React applications. From the enhanced App Router to improved performance optimizations, this release marks a significant milestone in the framework's evolution.

## What's New in Next.js 15?

### Enhanced App Router
The App Router in Next.js 15 provides a more intuitive way to structure your applications with:
- File-system based routing
- Nested layouts and loading states
- Built-in error boundaries
- Streaming and progressive enhancement

### Server Components by Default
Server Components are now the default, offering:
- Reduced bundle sizes
- Better SEO performance
- Faster initial page loads
- Seamless data fetching

### Turbopack Integration
The integration of Turbopack brings:
- 10x faster local development
- Incremental computation
- Better caching strategies
- Improved hot module replacement

## Getting Started

Setting up a new Next.js 15 project is straightforward:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

1. **App Router**: Use the new \`app\` directory for your routes
2. **Layouts**: Create nested layouts with \`layout.tsx\` files
3. **Loading States**: Add \`loading.tsx\` for better UX
4. **Error Handling**: Use \`error.tsx\` for error boundaries

## Best Practices

- Always use TypeScript for better developer experience
- Leverage Server Components for data fetching
- Use Client Components only when necessary
- Optimize images with the built-in Image component
- Implement proper error boundaries

## Conclusion

Next.js 15 represents a major step forward in React development. The combination of Server Components, improved App Router, and Turbopack makes it an excellent choice for modern web applications.

Whether you're building a simple blog or a complex web application, Next.js 15 provides the tools and performance optimizations you need to create exceptional user experiences.
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-12-01",
    readingTime: 8,
    category: "technical",
    tags: ["Next.js", "React", "TypeScript", "Web Development", "Server Components"],
    featured: true,
    imageUrl: "/blog/nextjs-15-guide.jpg"
  },
  {
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications: Architecture Patterns and Best Practices",
    description: "Learn how to structure large React applications with proper component architecture, state management strategies, and performance optimization techniques for long-term maintainability.",
    content: `
# Building Scalable React Applications

As React applications grow in complexity, maintaining clean architecture and performance becomes increasingly challenging. This guide covers essential patterns and practices for building scalable React applications.

## Component Architecture

### Container and Presentational Components
Separate your components into two categories:
- **Container Components**: Handle logic and state
- **Presentational Components**: Focus on UI rendering

### Custom Hooks for Logic Reuse
Extract common logic into custom hooks:

\`\`\`typescript
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## State Management

### Choose the Right Tool
- **useState/useReducer**: Local component state
- **Context API**: Shared state across components
- **Zustand/Redux**: Complex global state
- **React Query**: Server state management

### State Colocation
Keep state as close to where it's used as possible:

\`\`\`typescript
// Good: State is colocated
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  return <div>{/* Component content */}</div>;
}
\`\`\`

## Performance Optimization

### React.memo and useMemo
Prevent unnecessary re-renders:

\`\`\`typescript
const MemoizedComponent = React.memo(({ data }) => {
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
  }, [data]);

  return <div>{expensiveValue}</div>;
});
\`\`\`

### Code Splitting
Use React.lazy for route-based code splitting:

\`\`\`typescript
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
\`\`\`

## Testing Strategies

1. **Unit Tests**: Test individual components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows

## Conclusion

Building scalable React applications requires careful consideration of architecture, state management, and performance. By following these patterns and practices, you can create applications that grow gracefully with your team and requirements.
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-11-20",
    readingTime: 12,
    category: "technical",
    tags: ["React", "Architecture", "Performance", "Scalability", "Best Practices"],
    featured: true
  },
  {
    slug: "typescript-tips-for-react-developers",
    title: "TypeScript Tips Every React Developer Should Know",
    description: "Master TypeScript in React with practical tips, advanced patterns, and common pitfalls to avoid. Learn how to write type-safe components and improve your development experience.",
    content: `
# TypeScript Tips Every React Developer Should Know

TypeScript has become an essential tool for React development. Here are practical tips to help you write better, more maintainable React applications with TypeScript.

## Component Props Typing

### Basic Props Interface
Always define proper interfaces for your component props:

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ children, variant = 'primary', disabled, onClick }: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
\`\`\`

### Extending HTML Attributes
Extend built-in HTML attributes for better flexibility:

\`\`\`typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
\`\`\`

## Advanced Patterns

### Generic Components
Create reusable components with generics:

\`\`\`typescript
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select
      value={getLabel(value)}
      onChange={(e) => {
        const option = options.find(o => getLabel(o) === e.target.value);
        if (option) onChange(option);
      }}
    >
      {options.map(option => (
        <option key={getLabel(option)} value={getLabel(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
\`\`\`

### Discriminated Unions
Use discriminated unions for different component states:

\`\`\`typescript
type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function DataComponent<T>({ state }: { state: AsyncState<T> }) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>{/* Render data */}</div>;
    case 'error':
      return <div>Error: {state.error}</div>;
  }
}
\`\`\`

## Common Pitfalls and Solutions

### Event Handlers
Use specific event types instead of \`any\`:

\`\`\`typescript
// Good
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
};

// Avoid
const handleChange = (e: any) => {
  setInputValue(e.target.value);
};
\`\`\`

### Ref Usage
Properly type refs for better IDE support:

\`\`\`typescript
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);
\`\`\`

## Utility Types

Take advantage of TypeScript's utility types:
- \`Partial<T>\`: Make all properties optional
- \`Pick<T, K>\`: Pick specific properties
- \`Omit<T, K>\`: Omit specific properties
- \`Record<K, T>\`: Create object type with specific keys

## Conclusion

TypeScript significantly improves the React development experience by catching errors early and providing better IDE support. These patterns and tips will help you write more robust and maintainable React applications.
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-11-15",
    readingTime: 10,
    category: "technical",
    tags: ["TypeScript", "React", "Development", "Best Practices", "Types"],
    featured: false
  },
  {
    slug: "modern-css-techniques-for-2024",
    title: "Modern CSS Techniques Every Developer Should Master in 2024",
    description: "Discover the latest CSS features and techniques including Container Queries, CSS Grid, Custom Properties, and modern layout patterns that will elevate your web development skills.",
    content: `
# Modern CSS Techniques Every Developer Should Master in 2024

CSS continues to evolve rapidly, introducing powerful new features that make creating beautiful, responsive designs easier than ever. Here are the essential techniques you should master this year.

## Container Queries: The Game Changer

Container queries allow components to adapt based on their container size, not just the viewport:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}
\`\`\`

## Advanced CSS Grid Patterns

### Intrinsic Web Design
Create layouts that adapt automatically:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### Subgrid for Complex Layouts
Align nested grid items with parent grid:

\`\`\`css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.child-grid {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;
}
\`\`\`

## CSS Custom Properties (Variables) Advanced Usage

### Dynamic Theming
Create flexible theme systems:

\`\`\`css
:root {
  --primary-h: 220;
  --primary-s: 100%;
  --primary-l: 50%;

  --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
  --primary-light: hsl(var(--primary-h), var(--primary-s), calc(var(--primary-l) + 20%));
  --primary-dark: hsl(var(--primary-h), var(--primary-s), calc(var(--primary-l) - 20%));
}
\`\`\`

### Responsive Typography
Use custom properties for fluid typography:

\`\`\`css
:root {
  --font-size-base: clamp(1rem, 2.5vw, 1.25rem);
  --font-size-lg: calc(var(--font-size-base) * 1.25);
  --font-size-xl: calc(var(--font-size-base) * 1.5);
}
\`\`\`

## Modern Layout Techniques

### Flexbox Gap Property
Replace margins with gap for cleaner spacing:

\`\`\`css
.flex-container {
  display: flex;
  gap: 1rem; /* Much cleaner than margin tricks */
}
\`\`\`

### Logical Properties
Use logical properties for better internationalization:

\`\`\`css
.element {
  margin-inline: auto; /* Instead of margin-left/right */
  padding-block: 1rem; /* Instead of padding-top/bottom */
  border-inline-start: 2px solid blue; /* Instead of border-left */
}
\`\`\`

## CSS Functions You Should Know

### clamp() for Responsive Design
Create truly responsive values:

\`\`\`css
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  margin-bottom: clamp(0.5rem, 2vw, 2rem);
}
\`\`\`

### min() and max() for Smart Sizing
Set intelligent constraints:

\`\`\`css
.container {
  width: min(100%, 1200px); /* Never exceed 100% or 1200px */
  padding: max(1rem, 5vw); /* At least 1rem, but can be larger */
}
\`\`\`

## Performance Optimization

### CSS Containment
Help the browser optimize rendering:

\`\`\`css
.card {
  contain: layout style paint;
}
\`\`\`

### content-visibility for Large Lists
Improve rendering performance:

\`\`\`css
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 200px;
}
\`\`\`

## Conclusion

These modern CSS techniques provide powerful tools for creating responsive, maintainable, and performant web applications. As browser support continues to improve, incorporating these techniques will give you a significant advantage in creating exceptional user experiences.

Start experimenting with these techniques in your projects and see how they can simplify your CSS and improve your design workflow.
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-11-10",
    readingTime: 9,
    category: "technical",
    tags: ["CSS", "Web Development", "Responsive Design", "Modern Web", "Frontend"],
    featured: false
  },
  {
    slug: "career-lessons-from-5-years-in-frontend",
    title: "5 Years in Frontend Development: Lessons Learned",
    description: "Reflecting on my journey as a frontend developer, sharing insights about career growth, technical decisions, and the evolution of modern web development over the past five years.",
    content: `
# 5 Years in Frontend Development: Lessons Learned

As I look back on five years of frontend development, I've learned valuable lessons about technology, career growth, and the ever-evolving landscape of web development. Here are the insights that have shaped my journey.

## Technical Lessons

### 1. Fundamentals Never Go Out of Style
While frameworks come and go, mastering JavaScript fundamentals has been my best investment:
- Understanding closures, prototypes, and async programming
- Knowing when to use different data structures
- Writing clean, readable code that others can maintain

### 2. Performance Matters More Than You Think
Users notice when applications are slow:
- Measure before optimizing
- Bundle size impacts user experience significantly
- Lazy loading and code splitting are essential for large applications

### 3. TypeScript is a Game Changer
After initially resisting it, TypeScript has become indispensable:
- Catches errors before they reach production
- Improves refactoring confidence
- Makes large codebases maintainable
- Enhances developer experience with better IDE support

## Career Growth Insights

### 1. Communication Skills Are As Important As Technical Skills
The best developers I've worked with share common traits:
- They ask clarifying questions before coding
- They explain technical concepts in simple terms
- They give constructive feedback in code reviews
- They document their decisions and reasoning

### 2. Specialization vs. Generalization
Finding the right balance has been crucial:
- **Deep expertise** in one area (React/TypeScript for me)
- **Broad knowledge** of the ecosystem (testing, build tools, deployment)
- **Curiosity** about adjacent fields (design, backend, DevOps)

### 3. Learning Never Stops
The frontend landscape changes rapidly:
- Follow key influencers and newsletters
- Build side projects with new technologies
- Contribute to open source when possible
- Attend conferences and meetups (virtual or in-person)

## Common Pitfalls I've Observed

### 1. Over-Engineering Solutions
- Not every project needs the latest framework
- Simple problems often have simple solutions
- Consider maintenance burden of complex architectures

### 2. Ignoring the User Experience
- Technical excellence means nothing if users can't accomplish their goals
- Always test on different devices and network conditions
- Accessibility should be built in, not bolted on

### 3. Not Staying Current (But Also Not Chasing Every Trend)
Finding the balance between:
- Staying updated with important developments
- Not jumping on every new shiny tool
- Evaluating technologies based on project needs

## Industry Evolution

### What's Changed
- **Build Tools**: From Webpack to Vite and beyond
- **Frameworks**: React's dominance, Vue's growth, Svelte's innovation
- **Development Experience**: Hot reload, TypeScript adoption, better debugging tools
- **Deployment**: From FTP to Git-based deployments and edge computing

### What Hasn't Changed
- The importance of semantic HTML
- CSS fundamentals and responsive design principles
- User experience being paramount
- The value of clean, maintainable code

## Advice for New Frontend Developers

### 1. Start with the Fundamentals
- Master HTML, CSS, and JavaScript before moving to frameworks
- Understand how the browser works
- Learn debugging techniques early

### 2. Build Projects
- Create projects that solve real problems
- Deploy them so others can see your work
- Write about what you've learned

### 3. Find Your Community
- Join developer communities (Discord, Reddit, Twitter)
- Attend local meetups or conferences
- Find mentors and be willing to help others

### 4. Develop a Growth Mindset
- Embrace challenges as learning opportunities
- Don't be afraid to ask questions
- View feedback as a gift, not criticism

## Looking Ahead

The frontend landscape will continue evolving rapidly. Technologies like WebAssembly, micro-frontends, and edge computing are reshaping what's possible. The key is maintaining curiosity while building deep expertise in proven technologies.

## Conclusion

These five years have been a journey of constant learning and growth. The most important lesson? Stay curious, be kind to your teammates, and always keep the user's needs at the center of your decisions.

Whether you're just starting out or are a seasoned developer, remember that we're all learning together in this ever-changing field.
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-11-05",
    readingTime: 11,
    category: "career",
    tags: ["Career", "Frontend Development", "Learning", "Growth", "Experience"],
    featured: false
  }
];

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
