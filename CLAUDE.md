# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive portfolio website for Soufiane Chaoufi, a Senior Frontend Developer. Built with Next.js 15 and TypeScript, it features a complete blog system, project showcase, enhanced contact form, and comprehensive SEO optimization. The site demonstrates modern web development practices with static data management and professional design.

## Development Commands

```bash
# Development server with Turbopack
npm run dev
# or
yarn dev

# Production build
npm run build
# or  
yarn build

# Production server
npm start
# or
yarn start

# Linting
npm run lint
# or
yarn lint

# Code formatting
npm run format
# or
yarn format
```

## Architecture

### Core Technologies
- **Next.js 15** with App Router for modern React development
- **TypeScript** strict mode for type safety
- **Tailwind CSS 4.1.11** with custom design system
- **shadcn/ui + Radix UI** for accessible component primitives
- **React Hook Form + Zod** for form validation
- **Resend** for email functionality
- **next-themes** for dark/light mode support

### Content Management Strategy
The site uses a **static data approach** with TypeScript files containing all content:

#### Blog System (`/app/blog/`)
- **Static Posts**: 5 comprehensive articles in `posts.ts` with full markdown content
- **Categories**: Technical and Career with filtering system
- **Featured Posts**: Highlighted articles on homepage and blog page
- **Dynamic Routing**: Individual post pages at `/blog/[slug]`
- **SEO Optimized**: Individual metadata for each post

#### Projects Showcase (`/app/projects/`)
- **Project Data**: 10 detailed projects with categories, tech stacks, and links
- **Filtering System**: Category-based tabs (Full-Stack, Mobile, Web App, etc.)
- **Featured Projects**: Highlighted on homepage
- **Rich Metadata**: Technologies, status, GitHub/live demo links

#### Enhanced Contact Form (`/app/contact/`)
- **Lead Qualification**: Project type, budget range, timeline fields
- **Professional Validation**: Comprehensive Zod schemas
- **Business Intelligence**: Categorizes inquiries for better lead management

### Page Structure
```
/app/
├── page.tsx           # Homepage with hero, featured content, CTA sections
├── about/page.tsx     # Personal story, experience timeline, values
├── projects/page.tsx  # Project showcase with filtering and search
├── blog/              # Blog system with category filtering
│   ├── page.tsx       # Article listing page
│   ├── [slug]/page.tsx # Individual blog posts
│   └── posts.ts       # Blog content and metadata
├── contact/page.tsx   # Enhanced contact form
├── tech-stack/page.tsx # Technology showcase
├── books/page.tsx     # Reading list
├── api/send-email/    # Email API endpoint
├── layout.tsx         # Root layout with SEO metadata
├── sitemap.ts         # Dynamic sitemap generation
└── robots.ts          # SEO robots configuration
```

### Component Architecture
- **Layout Components**: Navbar with theme toggle, Footer with social links
- **Feature Components**: ContactForm with lead qualification, BlogCard, ProjectCard
- **UI Components**: shadcn/ui base components in `/components/ui/`
- **Custom Components**: Business logic components in `/components/custom/`
- **SEO Components**: StructuredData for Schema.org markup

### SEO & Performance Implementation
- **Structured Data**: Schema.org markup for Person, Website, ProfessionalService
- **Meta Tags**: Comprehensive OpenGraph and Twitter Card support
- **Dynamic Sitemap**: Automatically includes all blog posts and pages
- **Performance**: Static generation, image optimization, Turbopack dev builds

### Data Types & Validation
Comprehensive TypeScript interfaces ensure type safety:
- `BlogPost`: Article metadata, content, categories, tags
- `Project`: Technology stacks, URLs, categories, status
- `ContactFormValues`: Enhanced form with lead qualification fields
- `TechItem/TechCategory`: Technology organization system

### Icon & Asset Management
- **Tech Icons**: 100+ technology icons in `/public/tech-stack/`
- **Automated Downloads**: `scripts/download-tech-icons.js` for icon management
- **Book Covers**: Reading list images in `/public/books/`
- **Optimized Images**: Next.js automatic optimization

### Theme & Design System
- **Dark/Light Mode**: Persistent theme switching with next-themes
- **Custom Colors**: Professional color palette in Tailwind config
- **Typography**: Geist font family for modern look
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG compliant components and ARIA labels

## Development Workflow

### Content Updates
- **Blog Posts**: Add new articles to `app/blog/posts.ts`
- **Projects**: Update `app/projects/projects.ts` with new work
- **Tech Stack**: Modify `app/tech-stack/tech.ts` for new technologies
- **Books**: Add reading recommendations to `app/books/books.ts`

### Adding New Pages
1. Create page in `/app/` directory
2. Add metadata for SEO
3. Update navigation in `components/Navbar.tsx`
4. Add to sitemap in `app/sitemap.ts`

### Form Enhancement
- Update Zod schemas in `lib/validations/`
- Modify form components in `components/`
- Update API routes in `app/api/`

### SEO Maintenance
- Structured data in `components/StructuredData.tsx`
- Meta tags in individual page metadata
- Sitemap automatically updates with new content

## Key Features

### Business Intelligence
- **Lead Qualification**: Contact form categorizes project types and budgets
- **Analytics Ready**: Structured for Google Analytics integration
- **Professional Presentation**: Designed to attract quality opportunities

### Content Strategy
- **Technical Articles**: Deep-dive tutorials and best practices
- **Project Portfolio**: Comprehensive work showcase with live demos
- **Professional Story**: About page with career progression
- **Social Proof**: Skills, experience, and reading recommendations

### Performance & SEO
- **Static Generation**: All pages pre-rendered for optimal performance
- **Search Optimization**: Complete SEO implementation with structured data
- **Mobile Optimized**: Responsive design with fast loading times
- **Accessibility**: WCAG 2.1 AA compliant components