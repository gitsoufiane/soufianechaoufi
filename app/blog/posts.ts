import { BlogPost } from "@/types/blog";

// Blog posts array - currently empty for clean slate
// Add new articles by following the BlogPost interface structure
export const posts: BlogPost[] = [
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
