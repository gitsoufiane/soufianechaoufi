# GitHub Copilot Instructions

This document provides comprehensive guidance for GitHub Copilot while working on this Next.js 15 project.

## Core Principles

- **Progressive Prompting**: Start with simple prompts and iteratively refine them
- **Context Awareness**: Provide sufficient context in comments for more accurate suggestions
- **Pattern Recognition**: Follow established project patterns for consistency

## Project Setup Requirements

- **TypeScript Only**: Always use TypeScript for all components, pages, and utilities - never plain JavaScript
- **Package Management**: Use yarn for all package installations (e.g., `yarn add package-name`)
- **Type Safety**: Maintain strict type checking and avoid using `any` type whenever possible

## Technology Stack

### Next.js 15 with TypeScript
- Use App Router for all new pages and features
- Implement Server Components for data fetching operations
- Utilize Server Actions for form handling
- Implement proper metadata for SEO optimization
- Use proper loading and error states with suspense boundaries
- Always use TypeScript for all files (.ts, .tsx)
- Create proper type definitions for API responses and data models

### Shadcn UI Components
- Import only necessary components to minimize bundle size
- Follow the established theming system in the project
- Extend component variants using the project's convention
- Use Lucide Icons for consistent iconography

### Tailwind CSS v4
- Follow the project's custom design tokens and color scheme
- Use the established breakpoints: sm, md, lg, xl, 2xl
- Implement responsive designs using Tailwind's utilities
- Use the project's custom utility classes when available

### Form Handling
- Use React Hook Form for all form implementations
- Implement Zod schemas for validation following project patterns
- Handle form errors and success states consistently
- Follow accessibility best practices for forms

### Animation and Effects
- Use Framer Motion for complex animations
- Implement consistent motion variants across the project
- Add proper accessibility considerations for animations
- Use Three.js (@react-three/fiber) for 3D elements

### AI Features
- Implement Vercel AI SDK for AI-powered features
- Follow established patterns for streaming responses
- Implement proper error handling and fallbacks

## Code Examples

### Next.js Server Component

```tsx
// Create a server component that fetches product data
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/product-card";

export default async function ProductsPage() {
  // Fetch products with proper error handling
  const products = await getProducts();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Form With Validation

```tsx
// Create a contact form with validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define schema with proper validation rules
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactForm() {
  // Initialize form with proper types
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Submit form data
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Form fields with proper validation */}
      </form>
    </Form>
  );
}
```

## Project Structure

Follow this structure for new code:

```
├── app/                  # App Router pages and layouts
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   └── custom/           # Custom project components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
├── styles/               # Global styles and Tailwind config
└── types/                # TypeScript type definitions
```

## Package Installation Examples

Always use yarn for package installation:

```bash
# ✅ DO use yarn
yarn add @hookform/resolvers
yarn add -D @types/three

# ❌ DON'T use npm
npm install @hookform/resolvers
npm install --save-dev @types/three
```

## TypeScript Guidelines

- Use interface for object definitions that can be extended
- Use type for unions, intersections, and primitive types
- Always define proper return types for functions and components
- Create dedicated type files in the `/types` directory for shared types
- Use generics where appropriate for reusable components and functions

Example:

```tsx
// Define proper types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Use proper return type annotations
function getUserDisplayName(user: User): string {
  return `${user.name} (${user.role})`;
}

// Type React component props and return type
interface UserCardProps {
  user: User;
  showEmail?: boolean;
}

export default function UserCard({ user, showEmail = false }: UserCardProps): React.ReactElement {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.role}</p>
      {showEmail && <p className="text-sm">{user.email}</p>}
    </div>
  );
}
```

## Additional Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)