export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  slug: string;
  image?: string;
  published: boolean;
}
