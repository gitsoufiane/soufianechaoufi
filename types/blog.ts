export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}