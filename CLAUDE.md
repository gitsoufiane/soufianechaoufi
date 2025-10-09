# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Soufiane Chaoufi, Frontend Developer. Built with Next.js 15, TypeScript, and Tailwind CSS 4.1. Features static content management and blog system.

## Development Commands

```bash
# Development with Turbopack (fast refresh)
yarn dev

# Storybook development server (port 6006)
yarn storybook

# Production build (builds Storybook first, then Next.js)
yarn build

# Build Storybook only (outputs to .storybook-static, then copies to public/)
yarn build-storybook

# Production server
yarn start

# Linting
yarn lint

# Code formatting
yarn format

# Type checking
yarn type-check

# Bundle analysis
yarn build:analyze
```

## Architecture

### Core Stack

- **Next.js 15** with App Router and Turbopack
- **TypeScript** - strict mode enabled
- **Tailwind CSS 4.1** with custom design system
- **shadcn/ui + Radix UI** - component primitives
- **React Hook Form + Zod** - form validation
- **Three.js** - 3D graphics (React Three Fiber)
- **next-themes** - theme switching
- **Framer Motion** - animations
- **Storybook 9.1** - component development and documentation (with a11y addon)

### Static Content Management

Content managed through markdown and TypeScript files:
- `app/blog/content/*.md` - Blog articles as markdown files with frontmatter
- `app/projects/projects.ts` - Project showcase data
- `app/books/books.ts` - Reading list with book metadata
- `lib/blog.ts` - Blog post reading and parsing utilities

### SEO & Metadata

- **Root Layout**: `app/layout.tsx` contains comprehensive metadata configuration
- **Structured Data**: `components/StructuredData.tsx` implements Person, Website, and ProfessionalService schemas
- **Dynamic Sitemap**: `app/sitemap.ts` automatically includes all blog posts
- **Error Boundary**: `components/ErrorBoundary.tsx` for graceful error handling

## Environment Configuration

Required environment variables (validated via `lib/env.ts`):

```env
NODE_ENV=development|production|test
```

## Adding Content

### Blog Posts

Blog posts are markdown files with YAML frontmatter stored in `app/blog/content/`.

**File Structure:**
- Location: `app/blog/content/your-slug.md`
- Filename: Must be in kebab-case and match the slug
- Reading time is auto-calculated by the `reading-time` package

**Required Frontmatter:**

```yaml
---
slug: "url-friendly-slug"
title: "Article Title"
description: "Brief summary for cards and SEO (1-2 sentences)"
author: "Soufiane Chaoufi"
publishedAt: "YYYY-MM-DD"
category: "technical"  # Must be: technical, career, tools, or industry
tags: ["React", "Performance", "JavaScript"]  # 3-6 tags recommended
featured: true  # Optional: set to true for homepage display
imageUrl: "/blog/image.jpg"  # Optional: hero image path
---
```

**Categories:**
- `technical` - Technical deep dives and tutorials
- `career` - Career development and industry insights
- `tools` - Tool reviews and comparisons
- `industry` - Industry trends and analysis

See "Blog Writing Guidelines" section below for detailed writing standards.

### Projects

Add to `app/projects/projects.ts` following the Project interface:

```typescript
{
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;     // Shows on homepage
  category: string;       // 'web-app' | 'mobile-app' | 'library' | 'tool' | 'other'
  status: string;         // 'completed' | 'ongoing' | 'maintained'
  publishedAt: string;    // YYYY-MM-DD format
  highlights?: string[];  // Key features
}
```

### Books

Add to `app/books/books.ts` following the Book interface:

```typescript
{
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'completed' | 'want-to-read';
  rating?: number;        // 1-5 stars
  coverUrl?: string;      // Store images in /public/books/
  category: 'technical' | 'leadership' | 'design' | 'career' | 'other';
  notes?: string;
  finishedDate?: string;  // YYYY-MM-DD format
  startedDate?: string;   // YYYY-MM-DD format
  amazonUrl?: string;
  goodreadsUrl?: string;
}
```

## Blog Writing Guidelines

### Writing Style and Tone

Blog articles should follow these established patterns to maintain consistency:

**Voice and Perspective:**
- Use **first-person perspective** ("I", "my") to share personal experiences
- Be **conversational and approachable**, not academic or formal
- Share **honest opinions** and real-world insights ("Real talk:", "My take:", "But hold on:")
- Focus on **practical applications** over theoretical concepts

**IMPORTANT - Original Content Policy:**
- **NEVER copy-paste** content directly from source materials, documentation, or other articles
- **Always rephrase and rewrite** in your own words with fresh phrasing
- **Create new, original examples** - do not reuse examples from documentation or tutorials
- **Transform concepts** into unique explanations with personal insight
- When the user provides reference material to read/resume, use it for understanding only
- Synthesize information and express it in a completely new way that reflects personal voice
- Ensure all code examples are freshly written and relevant to the specific point being made

**Content Structure:**
- **Hook Opening** - Start with a relatable problem, story, or surprising fact
- **Clear Sections** - Use descriptive H2/H3 headers that tell a story
- **Code Examples** - Show complete, runnable examples with explanations
- **Visual Markers** - Use ✅ for good examples, ❌ for bad examples
- **Comparison Tables** - When comparing tools or approaches
- **Key Takeaways** - Summarize main points in a dedicated section
- **Conclusion** - End with "What's Next?" or call-to-action

### Markdown Formatting Standards

**Headers:**
- Use sentence case: "Understanding React re-renders" (not "Understanding React Re-Renders")
- H1 for article title (auto-generated from frontmatter)
- H2 for main sections
- H3 for subsections

**Code Blocks:**
```jsx
// Always specify language (jsx, typescript, bash, etc.)
// Include inline comments explaining key points
// Show complete, runnable examples when possible
// Use syntax highlighting appropriately
```

**Inline Formatting:**
- Use `backticks` for technical terms, function names, commands, package names
- Use **bold** for emphasis on key concepts or takeaways
- Use *italics* sparingly for subtle emphasis
- Use ✅/❌ emoji for comparing good vs bad approaches

**Links:**
- Link to official documentation when referencing libraries or APIs
- Use descriptive link text: `[useState hook](https://react.dev/reference/react/useState)` not "click here"
- External links automatically open in new tabs

**Lists:**
- Bullet points for features, benefits, or unordered items
- Numbered lists for sequential steps or ranked items
- Keep list items concise and scannable

**Tables:**
- Use for comparing features, tools, or options
- Include header row with clear column names
- Keep cells concise

**Blockquotes:**
- Use for important callouts or key concepts
- Not for regular paragraphs

### Technical Content Best Practices

**Code Examples:**
- Show both "before" and "after" examples when explaining improvements
- Include comments explaining non-obvious code
- Use realistic variable names and scenarios
- Demonstrate the problem before showing the solution

**Explanations:**
- Break down complex topics into numbered points
- Use analogies to explain technical concepts
- Provide context before diving into implementation details
- Explain the "why" not just the "what"

**Technical Terms:**
- Link to official documentation on first mention
- Use consistent terminology throughout
- Define acronyms on first use

### Content Quality Checklist

Before publishing, verify:

- ✅ Frontmatter is complete and properly formatted
- ✅ Category matches allowed values (technical, career, tools, industry)
- ✅ Date is in YYYY-MM-DD format
- ✅ Tags are relevant and well-chosen (3-6 recommended)
- ✅ Slug matches filename (kebab-case)
- ✅ Personal, conversational tone with "I" perspective
- ✅ Hook opening that draws readers in
- ✅ Code examples have language tags
- ✅ Headers use sentence case
- ✅ Practical examples over pure theory
- ✅ Links to official documentation
- ✅ Key takeaways or conclusion section
- ✅ No spelling or grammar errors
- ✅ Content provides genuine value and insights
- ✅ **All content is original** - no copied phrases from source material
- ✅ **All examples are newly created** - not reused from documentation
- ✅ **Concepts explained in fresh language** - rephrased with personal insight

### Example Article Structure

```markdown
---
slug: "example-article"
title: "Your Compelling Title"
description: "Brief summary in 1-2 sentences"
author: "Soufiane Chaoufi"
publishedAt: "2025-01-15"
category: "technical"
tags: ["React", "Performance", "JavaScript"]
featured: false
---

# Your Article Title

Start with a hook - a relatable problem or personal story that draws the reader in.

## Main Section 1

Explain the concept with clear, conversational language.

```jsx
// Show a practical code example
function Example() {
  return <div>Hello World</div>;
}
```

## Main Section 2

Continue building on concepts with real-world examples.

### Subsection

Break down complex ideas into digestible parts.

## Key Takeaways

Summarize the main points:

1. **First key point** - Brief explanation
2. **Second key point** - Brief explanation
3. **Third key point** - Brief explanation

## What's Next?

Suggest related topics or next steps for learning.
```

## Three.js Configuration

Next.js config transpiles Three.js packages and optimizes lucide-react imports for performance.

## Package Management

Always use **yarn** for package installation:
```bash
# ✅ Correct
yarn add package-name
yarn add -D dev-package

# ❌ Incorrect
npm install package-name
```

## Component Patterns

### Animation Components

The project uses Framer Motion for animations. Several animated components are available:

- **AnimatedNumber** (`components/AnimatedNumber.tsx`) - Incremental number counter that animates on viewport entry
  - Usage: `<AnimatedNumber value={42} duration={2000} decimals={0} className="..." />`
  - Triggers once when element enters viewport
  - Uses ease-out animation curve

- **Animated Navigation** - Menu button, nav links, logo, and theme toggle with Framer Motion
  - Consistent animation patterns across navigation elements
  - Hover and active states handled via motion variants

### Layout Structure

- **Root Layout** (`app/layout.tsx`) includes:
  - Theme provider with next-themes
  - Error boundary wrapper
  - Skip navigation links for accessibility
  - Structured data (JSON-LD) for SEO
  - Global navbar and footer

## Storybook Integration

The project includes Storybook for component development and documentation:

- **Location**: Stories are in `/stories` directory
- **Addons**: Theme switching and accessibility testing enabled
- **Build Process**: Storybook builds to `.storybook-static/` and is copied to `public/.storybook-static/`
- **Embedded View**: Access via `/storybook` route (configured with CSP headers for iframe embedding)
- **Development**: Run `yarn storybook` to access at `http://localhost:6006`

## TypeScript Guidelines

- Always use TypeScript (.ts, .tsx) - never JavaScript
- Maintain strict type checking
- Avoid `any` type
- Define proper return types for functions and components
- Create shared types in `/types` directory
- Use interface for object definitions that can be extended
- Use type for unions, intersections, and primitive types
