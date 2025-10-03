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
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  variant?: "featured" | "regular";
  className?: string;
}

export default function BlogCard({
  post,
  variant = "regular",
  className
}: BlogCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <CardHeader className={isFeatured ? "" : "pb-3"}>
        <Badge variant="secondary" className="w-fit text-xs mb-2">
          {post.category}
        </Badge>
        <CardTitle className={cn(
          "group-hover:text-primary line-clamp-2 transition-colors",
          isFeatured ? "" : "text-lg"
        )}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className={cn(
          "line-clamp-2",
          isFeatured ? "" : "text-sm"
        )}>
          {post.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={cn(
          "text-muted-foreground mb-4 flex items-center gap-4",
          isFeatured ? "justify-between text-sm" : "gap-3 text-xs"
        )}>
          <div className="flex items-center gap-1">
            <Calendar className={isFeatured ? "h-4 w-4" : "h-3 w-3"} />
            <span>
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className={isFeatured ? "h-4 w-4" : "h-3 w-3"} />
            <span>{post.readingTime} min{isFeatured ? " read" : ""}</span>
          </div>
        </div>

        <div className={cn(
          "mb-4 flex flex-wrap",
          isFeatured ? "gap-2" : "gap-1 mb-3"
        )}>
          {post.tags.slice(0, isFeatured ? 3 : 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          size={isFeatured ? "default" : "sm"}
          className={cn(
            "w-full",
            isFeatured && "group"
          )}
        >
          <Link href={`/blog/${post.slug}`}>
            {isFeatured ? "Read Article" : "Read More"}
            {isFeatured && (
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}