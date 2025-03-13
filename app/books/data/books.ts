interface Book {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  link?: string;
  category: string[];
  readDate?: string;
  rating?: number;
}

export const books: Book[] = [
  {
    title: "Example Book",
    author: "Author Name",
    description: "A brief description of the book.",
    coverImage: "/books/example.jpg",
    link: "https://example.com/book",
    category: ["Programming", "Web Development"],
    readDate: "2024-01",
    rating: 5
  }
];
