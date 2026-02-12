export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: "web-app" | "mobile-app" | "library" | "tool" | "other";
  status: "completed" | "ongoing" | "maintained";
  publishedAt: string;
  highlights?: string[];
}

export interface ProjectCategory {
  name: string;
  slug: string;
  description: string;
}
