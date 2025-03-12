import { books } from '@/lib/books';
import { BookCard } from '@/components/custom/BookCard';

export const metadata = {
  title: 'Books I Read | Soufiane Chaoufi',
  description: 'A collection of books I have read, including programming, software development, and other technical topics.',
};

export default function BooksPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Books I Read</h1>
        <p className="text-muted-foreground">
          A collection of books that have influenced my journey in software development and technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
