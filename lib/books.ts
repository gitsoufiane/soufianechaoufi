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
    amazonLink: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052'
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship that emphasizes writing clean, maintainable code.',
    readDate: '2024-02',
    rating: 4,
    tags: ['Programming', 'Software Development', 'Code Quality'],
    amazonLink: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882'
  }
];
