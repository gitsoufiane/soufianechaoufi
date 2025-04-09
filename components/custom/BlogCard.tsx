"use client";

import { BlogPost } from "@/types/blog";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="hover:border-primary transition-colors">
      <Link href={`/blog/${post.slug}`} className="block p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-muted-foreground">{post.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              {formatDate(post.date)}
            </span>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted rounded-full px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
