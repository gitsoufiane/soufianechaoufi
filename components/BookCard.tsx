import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/app/books/books";
import { BookOpen, Star, ExternalLink } from "lucide-react";
import Link from "next/link";

interface BookCardProps {
  book: Book;
}

const statusConfig = {
  reading: {
    label: "Currently Reading",
    color: "bg-foreground text-background",
  },
  completed: {
    label: "Completed",
    color: "bg-muted text-foreground border border-border",
  },
  "want-to-read": {
    label: "Want to Read",
    color: "bg-muted/50 text-muted-foreground border border-border",
  },
};

const categoryConfig = {
  technical: {
    label: "Technical",
    color: "bg-transparent text-muted-foreground border border-border",
  },
  leadership: {
    label: "Leadership",
    color: "bg-transparent text-muted-foreground border border-border",
  },
  design: {
    label: "Design",
    color: "bg-transparent text-muted-foreground border border-border",
  },
  career: {
    label: "Career",
    color: "bg-transparent text-muted-foreground border border-border",
  },
  other: {
    label: "Other",
    color: "bg-transparent text-muted-foreground border border-border",
  },
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex gap-4">
          {/* Book Cover */}
          <div className="bg-muted relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-md">
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
                <BookOpen className="text-muted-foreground h-12 w-12" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge className={statusConfig[book.status].color}>
                {statusConfig[book.status].label}
              </Badge>
              <Badge
                variant="outline"
                className={categoryConfig[book.category].color}
              >
                {categoryConfig[book.category].label}
              </Badge>
            </div>

            <CardTitle className="text-lg leading-snug">{book.title}</CardTitle>

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
                        ? "fill-foreground text-foreground"
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
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {book.notes}
          </p>
        )}

        {/* Dates */}
        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {book.startedDate && (
            <span>
              Started: {new Date(book.startedDate).toLocaleDateString()}
            </span>
          )}
          {book.finishedDate && (
            <span>
              Finished: {new Date(book.finishedDate).toLocaleDateString()}
            </span>
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
                className="text-foreground hover:text-muted-foreground inline-flex items-center gap-1 text-xs transition-colors"
              >
                Amazon <ExternalLink className="h-3 w-3" />
              </Link>
            )}
            {book.goodreadsUrl && (
              <Link
                href={book.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted-foreground inline-flex items-center gap-1 text-xs transition-colors"
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
