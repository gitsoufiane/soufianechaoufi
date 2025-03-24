export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  images?: string[];
  location?: string;
  category: "photography" | "hiking" | "cooking";
  tags?: string[];
  coverImage?: string;
}
