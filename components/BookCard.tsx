import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/app/books/books";
import { BookOpen, Star, ExternalLink } from "lucide-react";
import Link from "next/link";

interface BookCardProps {
  book: Book;
}

const statusConfig = {
  reading: { label: "Currently Reading", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  "want-to-read": { label: "Want to Read", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
};

const categoryConfig = {
  technical: { label: "Technical", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  leadership: { label: "Leadership", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
  design: { label: "Design", color: "bg-pink-500/10 text-pink-500 border-pink-500/20" },
  career: { label: "Career", color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" },
  other: { label: "Other", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex gap-4">
          {/* Book Cover */}
          <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={`${book.title} cover`}
                fill
                sizes="(max-width: 768px) 112px, 112px"
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge className={statusConfig[book.status].color}>
                {statusConfig[book.status].label}
              </Badge>
              <Badge variant="outline" className={categoryConfig[book.category].color}>
                {categoryConfig[book.category].label}
              </Badge>
            </div>

            <CardTitle className="text-lg leading-snug">
              {book.title}
            </CardTitle>

            <CardDescription className="text-sm">
              by {book.author}
            </CardDescription>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < book.rating!
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Notes */}
        {book.notes && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {book.notes}
          </p>
        )}

        {/* Dates */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {book.startedDate && (
            <span>Started: {new Date(book.startedDate).toLocaleDateString()}</span>
          )}
          {book.finishedDate && (
            <span>Finished: {new Date(book.finishedDate).toLocaleDateString()}</span>
          )}
        </div>

        {/* External Links */}
        {(book.amazonUrl || book.goodreadsUrl) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {book.amazonUrl && (
              <Link
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Amazon <ExternalLink className="h-3 w-3" />
              </Link>
            )}
            {book.goodreadsUrl && (
              <Link
                href={book.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Goodreads <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
