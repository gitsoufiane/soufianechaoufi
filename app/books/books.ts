import { Book } from "@/types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/books/atomic-habits.jpg",
    description:
      "James Clear's groundbreaking book reveals how tiny changes can lead to remarkable results. Learn the science behind habit formation and practical strategies to transform your daily routines.",
    amazonLink:
      "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    category: "Self-Improvement",
    tags: ["habits", "productivity"],
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/books/deep-work.jpg",
    description:
      "Cal Newport makes a compelling case for cultivating deep focus in an age of constant distraction. Discover how to produce valuable work by mastering the art of concentration.",
    amazonLink:
      "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692",
    category: "Productivity",
    tags: ["focus", "work"],
  },

  {
    id: "15",
    title: "Deception Point",
    author: "Dan Brown",
    coverImage: "/books/deception-point.jpg",
    description:
      "When a NASA satellite discovers an astonishingly rare object buried deep in the Arctic ice, the floundering space agency proclaims a much-needed victory -- a victory with profound implications for NASA policy and the impending presidential election. To verify the the find, the White House calls upon intelligence analyst Rachel Sexton. Accompanied by a team of experts, Rachel travels to the Arctic and uncovers the unthinkable: evidence of scientific trickery -- a bold deception that threatens to plunge the world into controversy. But before she can warn the President, Rachel and Michael are ambushed by a deadly team of assassins.",
    amazonLink: "https://www.amazon.com/dp/B0006925551",
    category: "Fiction",
    tags: ["action", "thriller", "adventure", "mystery"],
  },
  {
    id: "18",
    title: "The Social Animal: A Story of How Success Happens",
    author: "David Brooks",
    coverImage: "/books/the-social-animal.jpg",
    description: "",
    amazonLink: "https://www.amazon.com/dp/1780720378",
    category: "Psychology",
    tags: ["psychology", "favorite"],
  },
];
