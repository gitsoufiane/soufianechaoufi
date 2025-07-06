import { Book } from "@/types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/books/atomic-habits.jpg",
    category: "Self-Improvement",
    tags: ["habits", "productivity"],
    rating: 5,
    description:
      "A revolutionary guide to building good habits and breaking bad ones",
    readDate: "2023-05-15",
    amazonLink:
      "https://www.amazon.com/Atomic-Habits-James-Clear/dp/0735211299",
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/books/deep-work.jpg",
    category: "Productivity",
    tags: ["focus", "work"],
    rating: 4,
    description: "Rules for focused success in a distracted world",
    readDate: "2023-02-10",
    amazonLink:
      "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692",
  },
  {
    id: "15",
    title: "Deception Point",
    author: "Dan Brown",
    coverImage: "/books/deception-point.jpg",
    category: "Fiction",
    tags: ["action", "thriller", "adventure", "mystery"],
    rating: 4,
    description: "A NASA discovery that will change the world... if it's real",
    readDate: "2022-11-20",
    amazonLink:
      "https://www.amazon.com/Deception-Point-Dan-Brown/dp/0671027387",
  },
  {
    id: "18",
    title: "The Social Animal: A Story of How Success Happens",
    author: "David Brooks",
    coverImage: "/books/the-social-animal.jpg",
    category: "Psychology",
    tags: ["psychology", "favorite"],
    rating: 5,
    description:
      "A fascinating exploration of human nature and what drives success",
    readDate: "2023-01-05",
    amazonLink:
      "https://www.amazon.com/Social-Animal-Story-Success-Happens/dp/0812979370",
  },
  {
    id: "19",
    title: "Same as Ever",
    author: "Morgan Housel",
    coverImage: "/books/same-as-ever.jpg",
    category: "Psychology",
    tags: ["human behavior", "timeless", "decision making"],
    rating: 5,
    description:
      "A guide to what never changes about human behavior and decision-making throughout history",
    readDate: "2024-01-15",
    amazonLink:
      "https://www.amazon.com/Same-Ever-Guide-What-Changes/dp/0593332709",
  },
];
