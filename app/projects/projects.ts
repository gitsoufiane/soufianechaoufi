import { Project } from "@/types/project";

// Projects array - currently empty for clean slate
// Add new projects by following the Project interface structure
export const projects: Project[] = [];

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
  { name: "Web Applications", slug: "web-app", description: "Full-stack web applications" },
  { name: "Tools", slug: "tool", description: "Developer tools and utilities" },
  { name: "Libraries", slug: "library", description: "Open source libraries and packages" },
  { name: "Mobile Apps", slug: "mobile-app", description: "Mobile applications" },
  { name: "Other", slug: "other", description: "Miscellaneous projects" },
];