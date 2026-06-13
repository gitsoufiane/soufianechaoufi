"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

interface FilterUpdates {
  search?: string;
  tags?: string[];
  category?: string;
}

function formatCategory(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function BlogClient({ posts }: BlogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") ?? "";
  const selectedTags = useMemo(
    () => searchParams.getAll("tag"),
    [searchParams],
  );
  const selectedCategory = searchParams.get("category") ?? "all";

  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  }, [posts]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.category))).sort();
  }, [posts]);

  const updateFilters = (updates: FilterUpdates) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.search !== undefined) {
      const search = updates.search.trim();
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
    }

    if (updates.tags !== undefined) {
      params.delete("tag");
      updates.tags.forEach((tag) => params.append("tag", tag));
    }

    if (updates.category !== undefined) {
      if (updates.category === "all") {
        params.delete("category");
      } else {
        params.set("category", updates.category);
      }
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim();

    return posts.filter((post) => {
      const searchableText = [
        post.title,
        post.description,
        post.category,
        post.content,
        ...post.tags,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      return matchesSearch && matchesTags && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory, selectedTags]);

  const handleTagClick = (tag: string) => {
    const tags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];

    updateFilters({ tags });
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedTags.length > 0 || selectedCategory !== "all",
  );

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Articles</h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Sharing knowledge and insights about frontend development, best
            practices, and the ever-evolving world of web technologies.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative mx-auto max-w-md">
            <Search
              aria-hidden="true"
              className="text-muted-foreground absolute top-3 left-3 h-4 w-4"
            />
            <Input
              aria-label="Search articles"
              placeholder="Search articles..."
              className="pl-9"
              value={searchQuery}
              onChange={(event) =>
                updateFilters({ search: event.target.value })
              }
            />
          </div>
        </div>

        {allCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-muted-foreground text-sm">
              Filter by category:
            </span>
            <Button
              type="button"
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ category: "all" })}
            >
              All
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ category })}
              >
                {formatCategory(category)}
              </Button>
            ))}
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-muted-foreground text-sm">
              Filter by tag:
            </span>
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
                <X className="mr-1 h-3 w-3" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-6 text-center">
            <p className="text-muted-foreground text-sm">
              Showing {filteredPosts.length} of {posts.length} articles
            </p>
          </div>
        )}

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
              <Button variant="outline" onClick={clearFilters} className="mt-4">
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
