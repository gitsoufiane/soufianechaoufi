import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/blog";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Articles | Soufiane Chaoufi",
  description:
    "Technical articles, insights, and tutorials about frontend development, React, TypeScript, and modern web technologies.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Suspense fallback={null}>
      <BlogClient posts={posts} />
    </Suspense>
  );
}
