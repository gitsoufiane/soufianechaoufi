import { Book } from '@/types/book';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    description: 'A guide to becoming a better programmer through practical advice and best practices.',
    readDate: '2024-01',
    rating: 5,
    tags: ['Programming', 'Software Development', 'Career'],
    amazonLink: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052',
    coverImage: '/images/pragmatic-programmer.jpg',
    category: 'Programming'
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship that emphasizes writing clean, maintainable code.',
    readDate: '2024-02',
    rating: 4,
    tags: ['Programming', 'Software Development', 'Code Quality'],
    amazonLink: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    coverImage: '/images/clean-code.jpg',
    category: 'Programming'
  },
  {
    id: '3',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    description: 'A fascinating exploration of why some products satisfy customers while others only frustrate.',
    readDate: '2024-03',
    rating: 5,
    tags: ['Design', 'Usability', 'UX'],
    amazonLink: 'https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0262374418',
    coverImage: '/images/design-of-everyday-things.jpg',
    category: 'Design'
  },
  {
    id: '4',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    description: 'A new approach to business that’s being adopted around the world.',
    readDate: '2024-04',
    rating: 4,
    tags: ['Business', 'Startup', 'Lean'],
    amazonLink: 'https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898',
    coverImage: '/images/lean-startup.jpg',
    category: 'Business'
  }
];
