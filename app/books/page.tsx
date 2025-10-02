"use client";

import { useState, useMemo } from "react";
import { books } from "./books";
import BookCard from "@/components/BookCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Book as BookIcon } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const categoryMatch = selectedCategory === "all" || book.category === selectedCategory;
      const statusMatch = selectedStatus === "all" || book.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [selectedCategory, selectedStatus]);

  // Count books by status
  const counts = useMemo(() => {
    return {
      all: books.length,
      reading: books.filter((b) => b.status === "reading").length,
      completed: books.filter((b) => b.status === "completed").length,
      "want-to-read": books.filter((b) => b.status === "want-to-read").length,
    };
  }, []);

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Reading List</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Books I've read or am currently reading. A mix of technical deep-dives,
            leadership insights, and career development resources.
          </p>
        </div>

        {/* Status Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedStatus}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="all">
              All (<AnimatedNumber value={counts.all} />)
            </TabsTrigger>
            <TabsTrigger value="reading">
              Reading (<AnimatedNumber value={counts.reading} />)
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed (<AnimatedNumber value={counts.completed} />)
            </TabsTrigger>
            <TabsTrigger value="want-to-read">
              Want to Read (<AnimatedNumber value={counts["want-to-read"]} />)
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["all", "technical", "leadership", "design", "career", "other"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <BookIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg text-muted-foreground">
              No books found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
