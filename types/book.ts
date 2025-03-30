export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  review?: string;
  tags?: string[];
  category: BookCategory;
}

type BookCategory =
  | "Fiction"
  | "Self-Improvement"
  | "Productivity"
  | "Psychology"
  | "Business";
