export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  review?: string;
  amazonLink?: string;
  tags?: string[];
  category: string;
}
