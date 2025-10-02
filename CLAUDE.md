# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Soufiane Chaoufi, Senior Frontend Developer. Built with Next.js 15, TypeScript, and Tailwind CSS 4.1. Features static content management, blog system, and email integration via Resend.

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

# Type checking
yarn type-check

# Bundle analysis (requires ANALYZE=true environment variable)
cross-env ANALYZE=true yarn build
```

## Architecture

### Core Stack

- **Next.js 15** with App Router and Turbopack
- **TypeScript** - strict mode enabled
- **Tailwind CSS 4.1** with custom design system
- **shadcn/ui + Radix UI** - component primitives
- **React Hook Form + Zod** - form validation
- **Resend** - email API with batch sending support
- **Three.js** - 3D graphics (React Three Fiber)
- **next-themes** - theme switching
- **Framer Motion** - animations
- **LRU Cache** - rate limiting for API endpoints

### Static Content Management

Content managed through TypeScript files:
- `app/blog/posts.ts` - Blog articles with markdown content (currently empty)
- `app/projects/projects.ts` - Project showcase data

### Email System Architecture

- **API Route**: `app/api/send-email/route.ts` with rate limiting (5 requests per 15 minutes per IP)
- **Environment Validation**: `lib/env.ts` validates required environment variables at startup
- **Email Templates**:
  - `components/email-template.tsx` - Admin notification
  - `components/email-template-confirmation.tsx` - User confirmation
- **Batch Sending**: Uses Resend batch API to send both admin and confirmation emails

### SEO & Metadata

- **Root Layout**: `app/layout.tsx` contains comprehensive metadata configuration
- **Structured Data**: `components/StructuredData.tsx` implements Person, Website, and ProfessionalService schemas
- **Dynamic Sitemap**: `app/sitemap.ts` automatically includes all blog posts
- **Error Boundary**: `components/ErrorBoundary.tsx` for graceful error handling

## Environment Configuration

Required environment variables (validated via `lib/env.ts`):

```env
RESEND_API_KEY=re_xxxxx         # Must start with 're_'
RESEND_FROM_EMAIL=email@domain  # Valid email for sending
RESEND_TO_EMAIL=email@domain    # Valid email for receiving
NODE_ENV=development|production|test
```

## Adding Content

### Blog Posts

Add to `app/blog/posts.ts` following the BlogPost interface:

```typescript
{
  slug: string;
  title: string;
  description: string;
  content: string;        // Markdown content
  author: string;
  publishedAt: string;    // YYYY-MM-DD format
  readingTime: number;    // Minutes
  category: string;       // Must match defined categories
  tags: string[];
  featured?: boolean;     // Shows on homepage
  imageUrl?: string;      // Hero image
}
```

Categories: technical, career, tools, industry

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

## Form Validation

Contact form uses Zod schema (`lib/validations/contact.ts`):
- Name: min 2 characters
- Email: valid format
- Inquiry Type: required
- Subject: min 5 characters
- Message: 20-1000 characters

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

## TypeScript Guidelines

- Always use TypeScript (.ts, .tsx) - never JavaScript
- Maintain strict type checking
- Avoid `any` type
- Define proper return types for functions and components
- Create shared types in `/types` directory
