"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  }, [posts]);

  // Filter posts by search query (title only) and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Articles</h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Sharing knowledge and insights about frontend development, best
            practices, and the ever-evolving world of web technologies.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative mx-auto max-w-md">
            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              placeholder="Search articles by title..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tag Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <span className="text-muted-foreground text-sm">Filter by tag:</span>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-2"
              >
                <X className="h-3 w-3 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        {hasActiveFilters && (
          <div className="mb-6 text-center">
            <p className="text-muted-foreground text-sm">
              Showing {filteredPosts.length} of {posts.length} articles
            </p>
          </div>
        )}

        {/* All Articles */}
        <section>
          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <h3 className="mb-4 text-xl font-semibold">Coming Soon</h3>
              <p className="text-muted-foreground mx-auto max-w-md">
                I&apos;m working on creating valuable content for you. Check
                back soon for articles about frontend development, React,
                TypeScript, and more.
              </p>
            </Card>
          ) : filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <h3 className="mb-4 text-xl font-semibold">No articles found</h3>
              <p className="text-muted-foreground mx-auto max-w-md">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
