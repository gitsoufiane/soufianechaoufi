import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS featuring blog functionality and project showcase.",
    longDescription: "A comprehensive portfolio website showcasing my skills and projects. Built with the latest web technologies including Next.js 15 App Router, TypeScript for type safety, and Tailwind CSS for responsive design. Features include a blog system for sharing articles, project showcase with detailed descriptions, and a contact form integrated with Resend for email functionality.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "React", "Vercel"],
    githubUrl: "https://github.com/soufianechaoufi/portfolio",
    liveUrl: "https://soufianechaoufi.com",
    imageUrl: "/projects/portfolio-hero.jpg",
    featured: true,
    category: "web-app",
    status: "maintained",
    publishedAt: "2024-12-01",
    highlights: [
      "100% TypeScript with strict mode enabled",
      "Responsive design with mobile-first approach",
      "Blog system with markdown content support",
      "Email integration with Resend API",
      "SEO optimized with structured data"
    ]
  },
  {
    id: "task-management-app",
    title: "Task Management Application",
    description: "A collaborative task management app with real-time updates, drag & drop functionality, and team collaboration features.",
    longDescription: "A full-featured task management application designed for teams. Includes real-time collaboration, drag-and-drop task organization, project management, time tracking, and comprehensive reporting. Built with modern React patterns and state management.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Socket.io"],
    githubUrl: "https://github.com/soufianechaoufi/task-manager",
    liveUrl: "https://tasks.soufianechaoufi.com",
    imageUrl: "/projects/task-manager.jpg",
    featured: true,
    category: "web-app",
    status: "completed",
    publishedAt: "2024-10-15",
    highlights: [
      "Real-time collaboration with Socket.io",
      "Drag & drop interface with React Beautiful DND",
      "Advanced filtering and search capabilities",
      "Team management and permission system",
      "Time tracking and productivity analytics"
    ]
  },
  {
    id: "react-ui-library",
    title: "React UI Component Library",
    description: "A comprehensive, accessible React component library with TypeScript support, Storybook documentation, and comprehensive testing.",
    longDescription: "A modern React component library built with accessibility and developer experience in mind. Features over 50 components with full TypeScript support, comprehensive Storybook documentation, automated testing, and npm distribution.",
    technologies: ["React", "TypeScript", "Storybook", "Jest", "React Testing Library", "Rollup"],
    githubUrl: "https://github.com/soufianechaoufi/react-ui-lib",
    liveUrl: "https://ui.soufianechaoufi.com",
    imageUrl: "/projects/ui-library.jpg",
    featured: true,
    category: "library",
    status: "maintained",
    publishedAt: "2024-09-01",
    highlights: [
      "50+ fully accessible components",
      "Comprehensive TypeScript definitions",
      "100% test coverage with Jest",
      "Interactive Storybook documentation",
      "Tree-shakable bundle with Rollup"
    ]
  },
  {
    id: "weather-dashboard",
    title: "Weather Analytics Dashboard",
    description: "A data visualization dashboard showing weather patterns, forecasts, and historical data with interactive charts and maps.",
    longDescription: "An advanced weather analytics platform that aggregates data from multiple weather APIs to provide comprehensive weather insights. Features interactive maps, detailed charts, historical data analysis, and customizable alerts.",
    technologies: ["Next.js", "TypeScript", "D3.js", "Chart.js", "Leaflet", "Weather API"],
    githubUrl: "https://github.com/soufianechaoufi/weather-dashboard",
    liveUrl: "https://weather.soufianechaoufi.com",
    category: "web-app",
    status: "completed",
    publishedAt: "2024-08-20",
    highlights: [
      "Interactive weather maps with Leaflet",
      "Advanced data visualization with D3.js",
      "Real-time weather alerts system",
      "Historical weather data analysis",
      "Mobile-responsive design"
    ],
    featured: false
  },
  {
    id: "markdown-editor",
    title: "Collaborative Markdown Editor",
    description: "A real-time collaborative markdown editor with live preview, syntax highlighting, and export functionality.",
    technologies: ["React", "TypeScript", "Monaco Editor", "WebSockets", "Express"],
    githubUrl: "https://github.com/soufianechaoufi/markdown-editor",
    liveUrl: "https://markdown.soufianechaoufi.com",
    category: "tool",
    status: "maintained",
    publishedAt: "2024-07-10",
    highlights: [
      "Real-time collaborative editing",
      "Syntax highlighting with Monaco Editor",
      "Live markdown preview",
      "Export to PDF and HTML",
      "Version history tracking"
    ],
    featured: false
  },
  {
    id: "api-testing-tool",
    title: "API Testing Tool",
    description: "A developer tool for testing REST APIs with request collections, environment variables, and automated testing capabilities.",
    technologies: ["Electron", "React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/soufianechaoufi/api-tester",
    category: "tool",
    status: "ongoing",
    publishedAt: "2024-11-01",
    highlights: [
      "Desktop application built with Electron",
      "Request collections and environments",
      "Automated API testing workflows",
      "Request history and favorites",
      "Export test results to various formats"
    ],
    featured: false
  }
];

export const categories = [
  { name: "All", slug: "all", description: "All projects" },
  { name: "Web Applications", slug: "web-app", description: "Full-stack web applications" },
  { name: "Tools", slug: "tool", description: "Developer tools and utilities" },
  { name: "Libraries", slug: "library", description: "Open source libraries and packages" },
  { name: "Mobile Apps", slug: "mobile-app", description: "Mobile applications" },
  { name: "Other", slug: "other", description: "Miscellaneous projects" },
];