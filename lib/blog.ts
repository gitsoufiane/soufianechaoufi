import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "app/blog/content");

export function getAllPosts(): BlogPost[] {
  // Get all markdown files
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Read markdown file
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Parse frontmatter
      const { data, content } = matter(fileContents);

      // Calculate reading time
      const { minutes } = readingTime(content);

      return {
        slug: data.slug,
        title: data.title,
        description: data.description,
        content,
        author: data.author,
        publishedAt: data.publishedAt,
        readingTime: Math.ceil(minutes),
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        imageUrl: data.imageUrl,
      } as BlogPost;
    });

  // Sort by date (newest first)
  return allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

export const categories = [
  { name: "All", slug: "all", description: "All articles" },
  {
    name: "Technical",
    slug: "technical",
    description: "Technical deep dives and tutorials",
  },
  {
    name: "Career",
    slug: "career",
    description: "Career development and industry insights",
  },
  { name: "Tools", slug: "tools", description: "Tool reviews and comparisons" },
  {
    name: "Industry",
    slug: "industry",
    description: "Industry trends and analysis",
  },
];
