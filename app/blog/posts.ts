import { BlogPost } from "@/types/blog";

// Blog posts array - currently empty for clean slate
// Add new articles by following the BlogPost interface structure
export const posts: BlogPost[] = [];

/*
Example BlogPost structure for future reference:
{
  slug: "example-article-slug",
  title: "Example Article Title",
  description: "Brief description of the article for SEO and previews",
  content: `
    # Article Title

    Write your markdown content here...

    ## Section 1
    Your content...

    ## Section 2
    More content...
  `,
  author: "Your Name",
  publishedAt: "2024-12-01", // YYYY-MM-DD format
  readingTime: 8, // estimated reading time in minutes
  category: "technical", // must match one of the categories below
  tags: ["React", "TypeScript", "Web Development"], // array of relevant tags
  featured: false, // set to true for featured articles (shows on homepage)
  imageUrl: "/blog/article-image.jpg" // optional hero image
}
*/

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
