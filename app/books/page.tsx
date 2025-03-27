import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { books } from "./data/books";
import { Book } from "@/types/book";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata = {
  title: "Books | Soufiane Chaoufi",
  description:
    "Books I've read and recommend about software development, technology, and personal growth.",
};

export default function BooksPage() {
  // Group books by category
  const booksByCategory = books.reduce(
    (acc, book) => {
      const category = book.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(book);
      return acc;
    },
    {} as Record<string, Book[]>,
  );

  const categories = Object.keys(booksByCategory).sort(); // Sort categories alphabetically

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Reading List</h1>
        <p className="text-muted-foreground">
          A curated collection of books that have influenced my professional
          growth and technical understanding.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="mb-6 text-2xl font-semibold">{category}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {booksByCategory[category].map((book) => (
                <Card
                  key={book.id}
                  className="flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="flex-1">
                    <CardTitle>{book.title}</CardTitle>
                    <p className="text-muted-foreground">by {book.author}</p>
                  </CardHeader>
                  {/* Wrap CardContent with Tooltip components */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CardContent className="flex justify-center">
                          <Image
                            src={book.coverImage}
                            alt={`${book.title} cover`}
                            width={200}
                            height={300}
                            className="cursor-help rounded-md object-cover shadow-md transition-transform hover:scale-105" // Added cursor-help
                          />
                        </CardContent>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        {" "}
                        {/* Constrain width */}
                        <p>{book.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <CardFooter className="flex flex-col items-start gap-2">
                    {/* Tags */}
                    {book.tags && book.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {book.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Amazon Link Button */}
                    {book.amazonLink && (
                      <a
                        href={book.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="link" className="p-0 text-sm">
                          View on Amazon
                        </Button>
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
