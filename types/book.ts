export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  readDate: string;
  rating: number;
  review?: string;
  amazonLink?: string;
  tags?: string[];
  category: string;
}
