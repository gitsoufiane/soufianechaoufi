interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Example Project",
    description: "A description of your project.",
    technologies: ["React", "TypeScript", "TailwindCSS"],
    imageUrl: "/projects/example.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    featured: true
  }
];
