'use client';

import { Book } from '@/types/book';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < book.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
        <div className="flex items-center space-x-1 mb-4">{renderStars()}</div>
        <div className="flex flex-wrap gap-2">
          {book.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Read: {book.readDate}</span>
        {book.amazonLink && (
          <Button variant="outline" size="sm" onClick={() => window.open(book.amazonLink, '_blank')}>
            View on Amazon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
