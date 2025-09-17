# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Soufiane Chaoufi, Senior Frontend Developer. Built with Next.js 15, TypeScript, and Tailwind CSS 4.1. Features static content management, blog system, project showcase, and email integration via Resend.

## Development Commands

```bash
# Development with Turbopack (fast refresh)
yarn dev

# Production build
yarn build

# Production server
yarn start

# Linting
yarn lint

# Code formatting
yarn format
```

## Package Management

**IMPORTANT: Use yarn exclusively** - this project uses yarn.lock

```bash
yarn add <package>      # Add dependency
yarn add -D <package>   # Add dev dependency
yarn install            # Install all dependencies
```

## Architecture

### Core Stack

- **Next.js 15** with App Router and Turbopack
- **TypeScript** - strict mode, all files must be .tsx/.ts
- **Tailwind CSS 4.1** - custom design system
- **shadcn/ui + Radix UI** - component primitives
- **React Hook Form + Zod** - form validation
- **Resend** - email API integration
- **Three.js** - 3D graphics (React Three Fiber)
- **next-themes** - dark/light mode

### Static Content Management

All content managed through TypeScript files, no CMS:

- `app/blog/posts.ts` - Blog articles with markdown content
- `app/tech-stack/tech.ts` - Technology showcase
- `app/books/books.ts` - Reading recommendations

### Email Integration

- API endpoint: `app/api/send-email/route.ts`
- Validation: `lib/validations/contact.ts`
- Template: `components/email-template.tsx`
- Environment: `RESEND_API_KEY` required in `.env`

### Project Structure

```
/app/
├── page.tsx              # Homepage
├── about/page.tsx        # About page
├── blog/
│   ├── page.tsx          # Blog listing
│   ├── [slug]/page.tsx   # Blog post pages
│   └── posts.ts          # Blog content
├── contact/page.tsx      # Contact form
├── tech-stack/
│   ├── page.tsx          # Tech showcase
│   └── tech.ts           # Technology data
├── books/page.tsx        # Reading list
├── api/send-email/       # Email API
├── layout.tsx            # Root layout with metadata
├── sitemap.ts            # Dynamic sitemap
└── robots.ts             # SEO config

/components/
├── ui/                   # shadcn/ui components
├── custom/               # Custom components
├── Navbar.tsx            # Navigation with theme toggle
├── ContactForm.tsx       # Contact form component
├── email-template.tsx    # Email template
└── StructuredData.tsx    # Schema.org markup

/types/                   # TypeScript interfaces
├── api.ts                # API response types
├── blog.ts               # BlogPost, BlogCategory
├── project.ts            # Project interface
└── book.ts               # Book interface

/lib/
├── utils.ts              # Utility functions
└── validations/
    └── contact.ts        # Form validation schemas
```

### Key Implementation Details

#### SEO Architecture

- Comprehensive metadata in `app/layout.tsx`
- Dynamic sitemap generation includes all blog posts
- Structured data for Person, Website, ProfessionalService schemas
- OpenGraph and Twitter Card meta tags

#### Icon Management

- Tech icons: `/public/tech-stack/`
- Icons integrated directly in tech.ts using iconUrl field

#### Type Safety

- All components use TypeScript interfaces from `/types/`
- Form validation uses Zod schemas
- Strict mode enabled in TypeScript config

## Development Standards

### TypeScript Requirements

- Use TypeScript for ALL files - never plain JavaScript
- Maintain strict type checking, avoid `any` types
- Create proper interfaces in `/types/` directory for shared types
- Use proper return type annotations for functions and components

Example type structure:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}
```

### Component Patterns

- Follow single responsibility principle - one purpose per component
- Use composition over inheritance
- Import only necessary shadcn/ui components to minimize bundle size
- Follow established theming system with consistent variants
- Use React Hook Form + Zod for all forms with proper error handling

### Validation Patterns

All forms use Zod schemas in `/lib/validations/` with consistent error messages:

```typescript
const schema = z.object({
  field: z.string().min(2, "Field must be at least 2 characters"),
});
```

## Development Workflow

### Content Updates

- **Blog Posts**: Add new articles to `app/blog/posts.ts` with proper BlogPost interface
- **Tech Stack**: Modify `app/tech-stack/tech.ts` for new technologies with icons
- **Books**: Add reading recommendations to `app/books/books.ts`

### Adding New Features

1. Create TypeScript interfaces in `/types/` for new data models
2. Add validation schemas in `/lib/validations/` for forms
3. Create Server Components in `/app/` with proper metadata
4. Update navigation in `components/Navbar.tsx` if needed
5. Add to sitemap in `app/sitemap.ts` for SEO
6. Test form handling and error states

### API Routes & Email

- Email functionality uses Resend via `/app/api/send-email/route.ts`
- Contact form validation uses `contactFormSchema` from `/lib/validations/contact.ts`
- Email template is in `components/email-template.tsx`

## Adding Content

### Blog Posts

Add to `app/blog/posts.ts` following BlogPost interface:

```typescript
{
  slug: string;
  title: string;
  description: string;
  content: string;  // Markdown content
  author: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured?: boolean;
}
```

### Tech Icons

Add technologies directly to `app/tech-stack/tech.ts` with iconUrl field pointing to icon images

## Environment Variables

Required in `.env`:

```
RESEND_API_KEY=<your_resend_api_key>
```

## Three.js Configuration

Next.js config includes Three.js transpilation:

```typescript
transpilePackages: ["three"];
```
- always use shaddcn mcp for new design and component before create any custom component