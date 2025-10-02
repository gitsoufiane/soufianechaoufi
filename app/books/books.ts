export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'completed' | 'want-to-read';
  rating?: number; // 1-5 stars
  coverUrl?: string;
  category: 'technical' | 'leadership' | 'design' | 'career' | 'other';
  notes?: string;
  finishedDate?: string; // YYYY-MM-DD format
  startedDate?: string; // YYYY-MM-DD format
  amazonUrl?: string;
  goodreadsUrl?: string;
}

export const books: Book[] = [
  {
    id: 'advanced-react',
    title: 'Advanced React: Deep dives, investigations, performance patterns and techniques',
    author: 'Nadia Makarevich',
    status: 'reading',
    category: 'technical',
    coverUrl: '/books/advanced-react.jpg',
    notes: 'What is happening under the hood? In-depth exploration of React internals and advanced patterns.',
  },
  {
    id: 'web-performance-fundamentals',
    title: 'Web Performance Fundamentals: A Frontend Developer\'s Guide to Profile and Optimize React Web Apps',
    author: 'Nadia Makarevich',
    status: 'reading',
    category: 'technical',
    coverUrl: '/books/web-performance-fundamentals.jpg',
    notes: 'Comprehensive guide to profiling and optimizing React applications for better performance.',
  },
];
