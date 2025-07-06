interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category?: string;
  year?: string;
  status?: 'completed' | 'in-progress' | 'planning';
}

export const projects: Project[] = [

];
