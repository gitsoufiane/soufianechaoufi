import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { books } from "./data/books";

export const metadata = {
  title: 'Books | Soufiane Chaoufi',
  description: 'Books I\'ve read and recommend about software development, technology, and personal growth.',
};

export default function BooksPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Reading List</h1>
        <p className="text-muted-foreground">
          A curated collection of books that have influenced my professional growth and technical understanding.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <p className="text-muted-foreground">by {book.author}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
