import { books } from './data/books';
import { BookCard } from '@/components/custom/BookCard';

export const metadata = {
  title: 'Books I Read | Soufiane Chaoufi',
  description: 'A collection of books I have read, including programming, software development, and other technical topics.',
};

export default function BooksPage() {
  const categories = [...new Set(books.map((book) => book.category))];

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Books I Read</h1>
        <p className="text-muted-foreground">
          A collection of books that have influenced my journey in software development and technology.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4 mt-8">
          <h2 className="text-2xl font-bold">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books
              .filter((book) => book.category === category)
              .map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
