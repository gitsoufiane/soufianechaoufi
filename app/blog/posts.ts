import { BlogPost } from "@/types/blog";

export const posts: BlogPost[] = [
  {
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications: Best Practices for 2024",
    description: "Learn how to structure React applications that can grow with your team and requirements, covering architecture patterns, state management, and performance optimization.",
    content: `
# Building Scalable React Applications: Best Practices for 2024

Building React applications that can scale with your team and requirements is crucial for long-term success. In this comprehensive guide, we'll explore the key strategies and patterns that I've learned over 5+ years of React development.

## Project Structure That Scales

One of the most important decisions you'll make is how to structure your project. Here's a structure that has served me well:

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI primitives
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── pages/               # Page components (if using file-based routing)
├── services/            # API calls and external service integrations
├── stores/              # State management (Redux, Zustand, etc.)
├── types/               # TypeScript type definitions
└── utils/               # Pure utility functions
\`\`\`

## Component Design Principles

### 1. Single Responsibility Principle
Each component should have one clear purpose. If a component is doing too many things, break it down into smaller, focused components.

### 2. Composition Over Inheritance
React favors composition. Build complex UIs by combining simpler components rather than creating complex inheritance hierarchies.

### 3. Props Interface Design
Design your props interfaces carefully. They're the public API of your components:

\`\`\`typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
\`\`\`

## State Management Strategy

Choose your state management solution based on your application's complexity:

- **Local state** (useState, useReducer) for component-specific state
- **Context API** for theme, auth, and other global but rarely changing state
- **External libraries** (Redux Toolkit, Zustand) for complex application state

## Performance Optimization

### 1. Code Splitting
Use React.lazy and dynamic imports to split your bundle:

\`\`\`typescript
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
\`\`\`

### 2. Memoization
Use React.memo, useMemo, and useCallback judiciously:

\`\`\`typescript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveOperation(data);
  }, [data]);

  return <div>{processedData}</div>;
});
\`\`\`

### 3. Virtualization
For large lists, use libraries like react-window or react-virtualized.

## Testing Strategy

A scalable application needs a solid testing strategy:

1. **Unit tests** for individual components and functions
2. **Integration tests** for component interactions
3. **E2E tests** for critical user flows

## Conclusion

Building scalable React applications is about making thoughtful decisions early and consistently applying best practices. Focus on maintainability, performance, and developer experience to create applications that can grow with your needs.

What strategies have worked best for you? I'd love to hear your thoughts and experiences!
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-03-15",
    readingTime: 8,
    category: "Technical",
    tags: ["React", "JavaScript", "Architecture", "Best Practices"],
    featured: true,
    imageUrl: "/blog/react-scalable.jpg"
  },
  {
    slug: "typescript-best-practices-large-codebases",
    title: "TypeScript Best Practices for Large Codebases",
    description: "Essential TypeScript patterns and practices that will help you maintain type safety and developer productivity as your codebase grows.",
    content: `
# TypeScript Best Practices for Large Codebases

TypeScript has become an essential tool for building maintainable JavaScript applications. Here are the practices I've found most valuable when working with large codebases.

## Strict Configuration

Start with a strict TypeScript configuration:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

## Type Organization

### 1. Domain-Driven Type Organization
Organize your types by domain, not by technical concern:

\`\`\`
types/
├── user/
│   ├── user.ts
│   └── userPermissions.ts
├── product/
│   ├── product.ts
│   └── productCategory.ts
└── shared/
    ├── api.ts
    └── common.ts
\`\`\`

### 2. Progressive Type Safety
Start with broader types and narrow them progressively:

\`\`\`typescript
// Start broad
type ApiResponse = unknown;

// Narrow down
type UserApiResponse = {
  data: User[];
  meta: PaginationMeta;
};
\`\`\`

## Advanced Type Patterns

### 1. Branded Types
Create types that are structurally identical but logically different:

\`\`\`typescript
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function getUser(id: UserId): User {
  // Implementation
}
\`\`\`

### 2. Discriminated Unions
Use discriminated unions for better type safety:

\`\`\`typescript
type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  data: any;
};

type ErrorState = {
  status: 'error';
  error: string;
};

type AsyncState = LoadingState | SuccessState | ErrorState;
\`\`\`

## Utility Types and Helpers

Create reusable utility types for common patterns:

\`\`\`typescript
// Make all properties optional recursively
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Extract function return type
type AsyncReturnType<T extends (...args: any) => Promise<any>> = 
  T extends (...args: any) => Promise<infer R> ? R : any;
\`\`\`

## Testing with TypeScript

Use TypeScript's type system to improve your tests:

\`\`\`typescript
// Type-safe test factories
function createUser(overrides: Partial<User> = {}): User {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    ...overrides,
  };
}
\`\`\`

## Performance Considerations

### 1. Module Resolution
Use path mapping to avoid deep imports:

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"]
    }
  }
}
\`\`\`

### 2. Incremental Compilation
Enable incremental compilation for faster builds:

\`\`\`json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
\`\`\`

## Conclusion

TypeScript's power lies in its ability to scale with your codebase. By following these practices, you'll maintain type safety and developer productivity even as your application grows to hundreds of thousands of lines of code.

The key is to start strict and gradually adopt more advanced patterns as your team becomes comfortable with TypeScript.
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-03-10",
    readingTime: 6,
    category: "Technical",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Large Codebases"],
    featured: true,
    imageUrl: "/blog/typescript-practices.jpg"
  },
  {
    slug: "modern-css-techniques-tailwind",
    title: "Modern CSS Techniques with Tailwind CSS",
    description: "Explore advanced CSS patterns and how to implement them effectively using Tailwind CSS for maintainable and scalable styling.",
    content: `
# Modern CSS Techniques with Tailwind CSS

Tailwind CSS has revolutionized how we think about styling web applications. Let's explore advanced techniques that will make your designs both beautiful and maintainable.

## Advanced Layout Patterns

### CSS Grid with Tailwind
Create complex layouts with ease:

\`\`\`html
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-8 lg:col-span-9">
    <!-- Main content -->
  </div>
  <div class="col-span-12 md:col-span-4 lg:col-span-3">
    <!-- Sidebar -->
  </div>
</div>
\`\`\`

### Flexbox Patterns
Master modern flexbox layouts:

\`\`\`html
<!-- Holy Grail Layout -->
<div class="min-h-screen flex flex-col">
  <header class="flex-none">Header</header>
  <div class="flex-1 flex">
    <nav class="flex-none w-64">Nav</nav>
    <main class="flex-1">Content</main>
    <aside class="flex-none w-48">Aside</aside>
  </div>
  <footer class="flex-none">Footer</footer>
</div>
\`\`\`

## Custom Design System

### 1. Extending the Theme
Customize Tailwind to match your design system:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    }
  }
}
\`\`\`

### 2. Component Classes
Create reusable component classes:

\`\`\`css
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
  
  .card {
    @apply bg-white shadow-md rounded-lg p-6 border border-gray-200;
  }
}
\`\`\`

## Responsive Design Patterns

### Container Queries (with @tailwindcss/container-queries)
Style components based on their container size:

\`\`\`html
<div class="@container">
  <div class="@lg:flex @lg:items-center">
    <!-- Content adapts to container size -->
  </div>
</div>
\`\`\`

### Fluid Typography
Create responsive typography that scales smoothly:

\`\`\`css
@layer utilities {
  .text-fluid-lg {
    font-size: clamp(1.125rem, 0.875rem + 1.25vw, 1.875rem);
  }
}
\`\`\`

## Advanced Animations

### Micro-interactions
Create delightful micro-interactions:

\`\`\`html
<button class="transform transition-all duration-150 hover:scale-105 active:scale-95 hover:shadow-lg">
  Click me
</button>
\`\`\`

### Stagger Animations
Animate lists with staggered timing:

\`\`\`css
@layer utilities {
  .stagger-animation > * {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .stagger-animation > *:nth-child(1) { animation-delay: 0.1s; }
  .stagger-animation > *:nth-child(2) { animation-delay: 0.2s; }
  .stagger-animation > *:nth-child(3) { animation-delay: 0.3s; }
}
\`\`\`

## Performance Optimization

### 1. Purging Unused Styles
Ensure your CSS bundle stays small:

\`\`\`javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  // ...
}
\`\`\`

### 2. Critical CSS
Extract critical styles for above-the-fold content:

\`\`\`html
<style>
  /* Critical styles inline */
  .hero { @apply bg-blue-500 text-white py-20; }
</style>
\`\`\`

## Dark Mode Implementation

Create a seamless dark mode experience:

\`\`\`html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
    Title
  </h1>
</div>
\`\`\`

## Accessibility Considerations

### Focus Management
Ensure keyboard navigation works properly:

\`\`\`html
<button class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Accessible Button
</button>
\`\`\`

### Screen Reader Support
Use sr-only for screen reader content:

\`\`\`html
<button>
  <svg>...</svg>
  <span class="sr-only">Close dialog</span>
</button>
\`\`\`

## Conclusion

Tailwind CSS enables you to build modern, responsive, and accessible designs quickly. The key is to leverage its utility-first approach while creating a cohesive design system that scales with your project.

By combining Tailwind's utilities with custom components and modern CSS features, you can create stunning user interfaces that are both maintainable and performant.
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-03-05",
    readingTime: 7,
    category: "Technical",
    tags: ["CSS", "Tailwind CSS", "Design", "Frontend"],
    featured: false,
    imageUrl: "/blog/tailwind-css.jpg"
  },
  {
    slug: "remote-work-lessons-five-years",
    title: "Remote Work: Lessons from 5 Years of Distributed Development",
    description: "Practical insights and strategies for thriving as a remote developer, from communication best practices to maintaining work-life balance.",
    content: `
# Remote Work: Lessons from 5 Years of Distributed Development

After 5 years of working remotely as a frontend developer, I've learned valuable lessons about what makes distributed teams successful. Here are the insights that have shaped my approach to remote work.

## Communication is Everything

### 1. Overcommunicate by Default
In remote work, you can't rely on casual conversations or body language. Make everything explicit:

- Share your working hours and timezone
- Communicate your availability and focus times
- Update your status regularly (working, in a meeting, taking a break)
- Document decisions and context, not just outcomes

### 2. Choose the Right Communication Channel
Different types of communication need different tools:

- **Slack/Teams**: Quick questions, updates, informal chat
- **Email**: Formal communication, external stakeholders
- **Video calls**: Complex discussions, brainstorming, team building
- **Documentation**: Decisions, processes, technical specifications

### 3. Asynchronous First
Design your workflows to be asynchronous by default:

\`\`\`markdown
## Code Review Template
**What changed:** Brief description of the changes
**Why:** Context and reasoning
**Testing:** How to test the changes
**Concerns:** Anything reviewers should pay special attention to
\`\`\`

## Technical Practices for Remote Teams

### 1. Comprehensive Documentation
Document everything as if you're writing for someone who will join the team in 6 months:

\`\`\`markdown
# Project Setup Guide
## Prerequisites
- Node.js 18+
- Docker
- Access to staging environment

## Local Development
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Copy \`.env.example\` to \`.env.local\`
4. Start the development server: \`npm run dev\`

## Common Issues
### Port 3000 already in use
Solution: Kill the process or use a different port
\`\`\`

### 2. Code Review Culture
Establish clear expectations for code reviews:

- Reviews should be thorough but kind
- Include both technical feedback and learning opportunities
- Use automated tools (linting, testing) to catch basic issues
- Set clear timelines for review turnaround

### 3. Shared Development Environment
Use tools that ensure consistency across team members:

- **Docker** for consistent environments
- **Dev containers** for standardized setups
- **Shared staging environments** for testing
- **Feature flags** for safe deployments

## Work-Life Balance Strategies

### 1. Physical Separation
Create clear boundaries between work and personal space:

- Dedicated workspace, even if it's just a corner of a room
- Different user accounts on your computer for work and personal use
- Physical rituals to start and end your workday

### 2. Time Management
Structure your day to stay productive and healthy:

\`\`\`
9:00 AM  - Start work, check messages
9:30 AM  - Deep work block (2-3 hours)
12:00 PM - Lunch break
1:00 PM  - Meetings and collaboration
3:00 PM  - Deep work block (2 hours)
5:00 PM  - Wrap up, plan tomorrow
5:30 PM  - End work day
\`\`\`

### 3. Social Connection
Combat isolation with intentional social interactions:

- Regular coffee chats with teammates
- Virtual team lunches
- Online gaming or hobby groups
- Local co-working spaces occasionally

## Team Building and Culture

### 1. Intentional Team Building
Remote teams need to be more intentional about building relationships:

- **Show and tell** sessions where team members share projects or interests
- **Virtual coffee breaks** with no agenda
- **Online games** or activities
- **Annual in-person meetups** if possible

### 2. Inclusive Practices
Ensure everyone can participate equally:

- Record important meetings for different timezones
- Use collaborative tools that everyone can access
- Be mindful of cultural differences and holidays
- Rotate meeting times to share timezone burden

## Tools and Setup

### Essential Software
- **Communication**: Slack, Zoom, Loom for screen recordings
- **Development**: VS Code with Live Share, GitHub, Docker
- **Project Management**: Linear, Notion, Figma
- **Time Management**: Toggl, RescueTime, Focus apps

### Hardware Investment
Good tools make a huge difference:

- Quality webcam and microphone for clear communication
- Ergonomic desk setup with proper monitor height
- Good lighting for video calls
- Reliable internet with backup options

## Managing Challenges

### 1. Timezone Differences
Strategies for working across timezones:

- Use tools like World Clock Pro to track team timezones
- Document decisions so they don't get lost in chat
- Establish core hours when everyone is available
- Be flexible with your schedule when possible

### 2. Technical Issues
Be prepared for common remote work problems:

- Have backup internet (mobile hotspot)
- Keep important files synced to cloud storage
- Test your setup before important meetings
- Have a plan for hardware failures

### 3. Career Development
Don't let remote work limit your growth:

- Be proactive about seeking feedback
- Document your achievements and impact
- Participate in online communities and conferences
- Seek mentorship relationships
- Share your knowledge through blog posts or talks

## Conclusion

Remote work isn't just about working from home—it's about building sustainable, productive, and fulfilling work practices. The key is being intentional about communication, maintaining boundaries, and investing in relationships.

The future of work is distributed, and the developers who master these skills will have significant advantages in their careers. What has your remote work experience taught you?
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-02-28",
    readingTime: 9,
    category: "Career",
    tags: ["Remote Work", "Career", "Productivity", "Team Management"],
    featured: true,
    imageUrl: "/blog/remote-work.jpg"
  },
  {
    slug: "state-management-when-to-use-what",
    title: "State Management: When to Use What",
    description: "A comprehensive guide to choosing the right state management solution for your React application, from useState to Redux and beyond.",
    content: `
# State Management: When to Use What

Choosing the right state management solution can make or break your React application. Let's explore when and why to use different approaches.

## The State Management Spectrum

State management in React exists on a spectrum from simple to complex:

1. **Local State** (useState, useReducer)
2. **Lifted State** (props drilling)
3. **Context API** (React's built-in global state)
4. **External Libraries** (Redux, Zustand, Jotai)

## Local State: The Starting Point

Use local state when:
- State is only needed in one component
- State doesn't need to persist across route changes
- The logic is simple and straightforward

\`\`\`typescript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
\`\`\`

### When to use useReducer instead of useState

Use useReducer when:
- You have complex state logic
- The next state depends on the previous one
- You want to optimize performance (dispatch is stable)

\`\`\`typescript
type State = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

type Action = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Item[] }
  | { type: 'FETCH_ERROR'; payload: string };

function itemsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
\`\`\`

## Context API: Built-in Global State

Use Context API when:
- You need to share state across multiple components
- The state doesn't change frequently
- You want to avoid props drilling
- The state is relatively simple

\`\`\`typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

### Context API Limitations

Avoid Context API when:
- State changes frequently (causes unnecessary re-renders)
- You have complex state logic
- You need middleware (logging, persistence, etc.)
- Performance is critical

## Redux Toolkit: The Scalable Solution

Use Redux Toolkit when:
- You have complex state logic
- Multiple components need the same state
- You need time-travel debugging
- Your team is familiar with Redux patterns

\`\`\`typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer makes this safe
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
\`\`\`

## Zustand: Lightweight and Flexible

Use Zustand when:
- You want something simpler than Redux
- You need external store access
- You prefer a more functional approach
- Bundle size matters

\`\`\`typescript
import { create } from 'zustand';

interface BearState {
  bears: number;
  increase: (by: number) => void;
  decrease: (by: number) => void;
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  decrease: (by) => set((state) => ({ bears: state.bears - by })),
}));

// Usage
function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  
  return (
    <div>
      <span>{bears} bears</span>
      <button onClick={() => increase(1)}>Add bear</button>
    </div>
  );
}
\`\`\`

## Jotai: Atomic State Management

Use Jotai when:
- You want fine-grained reactivity
- You prefer bottom-up composition
- You need derived state
- You want to avoid provider hell

\`\`\`typescript
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubled] = useAtom(doubledAtom);
  
  return (
    <div>
      <span>Count: {count}</span>
      <span>Doubled: {doubled}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
\`\`\`

## Decision Matrix

Here's a quick decision matrix to help you choose:

| Scenario | Recommended Solution |
|----------|----------------------|
| Single component state | useState |
| Complex component logic | useReducer |
| Theme, auth, user preferences | Context API |
| Large app with complex state | Redux Toolkit |
| Need simple external store | Zustand |
| Fine-grained reactivity | Jotai |
| Real-time data (websockets) | External library + local state |

## Performance Considerations

### 1. Minimize Re-renders
- Use useCallback and useMemo strategically
- Split context providers to limit scope
- Consider using atomic updates

### 2. Optimize Selectors
\`\`\`typescript
// Bad: creates new object every render
const selectUserData = (state) => ({
  name: state.user.name,
  email: state.user.email
});

// Good: stable reference when values don't change
const selectUserData = createSelector(
  (state) => state.user.name,
  (state) => state.user.email,
  (name, email) => ({ name, email })
);
\`\`\`

### 3. Code Splitting
Load state management code only when needed:

\`\`\`typescript
const ChatStore = lazy(() => import('./stores/chatStore'));
\`\`\`

## Migration Strategies

### From Context to External Library
1. Start by wrapping your Context API in a custom hook
2. Gradually replace the implementation behind the hook
3. Update components one by one

### From Local State to Global State
1. Identify state that's being lifted frequently
2. Create a store for that specific domain
3. Migrate components incrementally

## Conclusion

There's no one-size-fits-all solution for state management. The key is to:

1. Start simple with local state
2. Use Context API for simple global state
3. Graduate to external libraries when you need more features
4. Consider your team's experience and preferences
5. Plan for future scalability

Remember: you can mix and match these approaches in the same application. Use the right tool for each piece of state based on its characteristics and requirements.

What state management challenges have you faced? I'd love to hear about your experiences and solutions!
    `,
    author: "Soufiane Chaoufi",
    publishedAt: "2024-02-20",
    readingTime: 10,
    category: "Technical",
    tags: ["React", "State Management", "Redux", "Context API", "Zustand"],
    featured: false,
    imageUrl: "/blog/state-management.jpg"
  }
];

export const categories = [
  { name: "All", slug: "all", description: "All articles" },
  { name: "Technical", slug: "technical", description: "Technical deep dives and tutorials" },
  { name: "Career", slug: "career", description: "Career development and industry insights" },
  { name: "Tools", slug: "tools", description: "Tool reviews and comparisons" },
  { name: "Industry", slug: "industry", description: "Industry trends and analysis" }
];