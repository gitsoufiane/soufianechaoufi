import { Project } from "@/types/project";

// Projects array - currently empty for clean slate
// Add new projects by following the Project interface structure
export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "Modern portfolio website built with Next.js 16, React 19, and Tailwind CSS featuring a blog system, project showcase, and reading list",
    longDescription:
      "A performant, accessible portfolio website showcasing my work as a Frontend Developer. Built with the latest Next.js 16 App Router and React 19, featuring static content management with markdown blog posts, project showcase with category filtering, and a reading list. Includes comprehensive SEO with structured data, dark/light theme support, and smooth Framer Motion animations throughout.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "shadcn/ui",
      "Radix UI",
      "MDX",
    ],
    githubUrl: "https://github.com/gitsoufiane/soufianechaoufi",
    liveUrl: "https://soufianechaoufi.com",
    featured: true,
    category: "web-app",
    status: "maintained",
    publishedAt: "2025-03-01",
    highlights: [
      "Next.js 16 App Router with Turbopack",
      "Markdown blog with auto-calculated reading time",
      "Dark/light theme with system preference detection",
      "SEO optimized with structured data (JSON-LD)",
      "Accessible design with skip navigation links",
      "Smooth page transitions with Framer Motion",
    ],
  },
  {
    id: "sheswap",
    title: "SheSwap",
    description:
      "A React Native app empowering women to swap items and give freely in a money-free social economy",
    longDescription:
      "SheSwap is a social economy mobile application built with React Native and Expo Router that enables women to exchange items or give them away for free, fostering a community-driven sharing economy without monetary transactions. The app features real-time messaging, location-based discovery, swap proposal management, and a complete authentication system. Built with Firebase for backend services, it includes advanced features like proximity filtering, real-time notifications, and promotes sustainable consumption through sharing.",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo Router",
      "Firebase",
      "NativeWind",
      "React Hook Form",
      "Zod",
      "React Native Reanimated",
      "Expo Location",
      "Geofire Common",
    ],
    githubUrl: "https://github.com/gitsoufiane/sheswap", // Update with actual GitHub URL
    imageUrl: "/projects/sheswap.png", // Add project screenshot
    featured: true,
    category: "mobile-app",
    status: "ongoing",
    publishedAt: "2024-12-01", // Update with actual date
    highlights: [
      "Money-free social economy platform for women",
      "Item swapping and free giving community",
      "Real-time messaging and notifications",
      "Location-based discovery with proximity filtering",
      "Atomic proposal system for item exchanges",
      "Promotes sustainable consumption and sharing",
    ],
  },
];

/*
Example Project structure for future reference:
{
  id: "unique-project-id",
  title: "Project Title",
  description: "Brief description for cards and previews",
  longDescription: "Detailed description with more context and features", // optional
  technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"], // tech stack used
  githubUrl: "https://github.com/username/repo", // optional
  liveUrl: "https://project-demo.com", // optional
  imageUrl: "/projects/project-image.jpg", // optional
  featured: false, // set to true for featured projects (shows on homepage)
  category: "web-app", // must match one of the categories below: 'web-app' | 'mobile-app' | 'library' | 'tool' | 'other'
  status: "completed", // 'completed' | 'ongoing' | 'maintained'
  publishedAt: "2024-12-01", // YYYY-MM-DD format
  highlights: [ // optional array of key features
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ]
}
*/

export const categories = [
  { name: "All", slug: "all", description: "All projects" },
  {
    name: "Web Applications",
    slug: "web-app",
    description: "Full-stack web applications",
  },
  { name: "Tools", slug: "tool", description: "Developer tools and utilities" },
  {
    name: "Libraries",
    slug: "library",
    description: "Open source libraries and packages",
  },
  {
    name: "Mobile Apps",
    slug: "mobile-app",
    description: "Mobile applications",
  },
  { name: "Other", slug: "other", description: "Miscellaneous projects" },
];
