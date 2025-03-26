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
import { Star } from "lucide-react";

export const metadata = {
  title: "Books | Soufiane Chaoufi",
  description:
    "Books I've read and recommend about software development, technology, and personal growth.",
};

export default function BooksPage() {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Reading List</h1>
        <p className="text-muted-foreground">
          A curated collection of books that have influenced my professional
          growth and technical understanding.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <Card
            key={index}
            className="flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader className="flex-1">
              <CardTitle>{book.title}</CardTitle>
              <p className="text-muted-foreground">by {book.author}</p>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src={book.coverImage}
                alt={`${book.title} cover`}
                width={200}
                height={300}
                className="rounded-md object-cover shadow-md transition-transform hover:scale-105"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <p className="text-muted-foreground text-sm">
                {book.readDate} • {book.category}
              </p>
              {book.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              )}
              <Button variant="link" className="p-0 text-sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
