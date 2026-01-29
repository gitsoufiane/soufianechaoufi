"use client";

import { BlogPost } from "@/types/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  onTagClick?: (tag: string) => void;
}

export default function BlogCard({
  post,
  className,
  onTagClick
}: BlogCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <CardHeader className="pb-3">
        <Badge variant="secondary" className="w-fit text-xs mb-2">
          {post.category}
        </Badge>
        <CardTitle className="group-hover:text-foreground line-clamp-2 transition-colors text-lg">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {post.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="text-muted-foreground mb-4 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readingTime} min</span>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs cursor-pointer hover:bg-secondary"
              onClick={(e) => {
                e.preventDefault();
                onTagClick?.(tag);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Link href={`/blog/${post.slug}`}>
            Read More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}