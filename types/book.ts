export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  review?: string;
  tags?: string[];
  category: BookCategory;
  rating: number;
  description?: string;
  readDate?: string;
  amazonLink?: string;
}

type BookCategory =
  | "Fiction"
  | "Self-Improvement"
  | "Productivity"
  | "Psychology"
  | "Business";
