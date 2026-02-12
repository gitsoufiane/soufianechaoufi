import { Project } from "@/types/project";

// Projects sorted by publishedAt descending (newest first)
// Homepage shows the first 3 entries
const unsortedProjects: Project[] = [
  {
    id: "qyra",
    title: "Qyra",
    description:
      "A QR code generator and scanner app with custom color styling, camera scanning, and content-aware actions",
    longDescription:
      "Qyra is a two-tab Expo app for generating and scanning QR codes. The generator supports four content types (URL, Text, WiFi, Contact/vCard) with customizable foreground and background colors via swatch pickers, contrast warnings, and save/share functionality. The scanner uses the device camera with content-aware actions — opening URLs, saving contacts, or copying text. Includes persistent history with AsyncStorage for re-generation.",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo SDK 54",
      "React 19",
      "expo-router",
      "expo-camera",
      "react-native-qrcode-svg",
      "react-native-reanimated",
    ],
    githubUrl: "https://github.com/gitsoufiane/qyra",
    category: "mobile-app",
    status: "ongoing",
    publishedAt: "2025-02-12",
    highlights: [
      "QR generation for URLs, text, WiFi, and vCard contacts",
      "Custom foreground and background color pickers with contrast warning",
      "Camera-based QR scanner with content-aware actions",
      "Persistent history with AsyncStorage",
      "Dark-only UI with haptic feedback throughout",
      "Save to gallery and share QR codes as images",
    ],
  },
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
    id: "truenorth",
    title: "TrueNorth Citizen",
    description:
      "A React Native app for Canadian citizenship test preparation using adaptive spaced repetition learning",
    longDescription:
      "TrueNorth Citizen is a mobile app that helps users prepare for the Canadian citizenship test through an adaptive spaced repetition algorithm. Built with an offline-first architecture using SQLite for local storage, it features progress tracking, multiple question categories, and supports both iOS and Android platforms.",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo",
      "SQLite",
      "Zustand",
      "Zod",
      "Jest",
    ],
    githubUrl: "https://github.com/gitsoufiane/trueNorth",
    category: "mobile-app",
    status: "ongoing",
    publishedAt: "2025-01-01",
    highlights: [
      "Adaptive spaced repetition algorithm for optimal learning",
      "Offline-first architecture with SQLite",
      "Progress tracking across question categories",
      "iOS and Android support",
    ],
  },
  {
    id: "kintra",
    title: "Kintra",
    description:
      "A mobile app for finding players for local activities like bowling, tennis, pickleball, and more",
    longDescription:
      "Kintra is a social mobile application that connects people looking for partners to play local activities such as bowling, tennis, pickleball, and more. Built with Expo 54 and React Native, it features location-based discovery, real-time notifications, and a Supabase-powered backend for authentication, database, and storage.",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo",
      "Supabase",
      "Zustand",
      "TanStack Query",
      "NativeWind",
      "React Hook Form",
      "Zod",
    ],
    githubUrl: "https://github.com/gitsoufiane/kintra",
    category: "mobile-app",
    status: "ongoing",
    publishedAt: "2025-01-01",
    highlights: [
      "Location-based player discovery with maps",
      "Supabase backend for auth, database, and storage",
      "Real-time notifications for activity matching",
      "NativeWind styling with Tailwind CSS patterns",
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

export const projects = unsortedProjects.sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

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
