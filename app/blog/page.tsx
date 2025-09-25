import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { posts, categories } from "./posts";
import BlogCard from "./BlogCard";

export const metadata = {
  title: "Articles | Soufiane Chaoufi",
  description:
    "Technical articles, insights, and tutorials about frontend development, React, TypeScript, and modern web technologies.",
};

export default function BlogPage() {
  const featuredPosts = posts.filter((post) => post.featured);
  const recentPosts = posts.filter((post) => !post.featured).slice(0, 6);

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
        <div className="mb-12 flex flex-col gap-4 sm:flex-row">
          <div className="relative mx-auto max-w-md flex-1 sm:mx-0">
            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input placeholder="Search articles..." className="pl-9" />
          </div>
        </div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">Featured Articles</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  variant="featured"
                />
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className="mb-8 text-2xl font-bold">All Articles</h2>
          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <h3 className="mb-4 text-xl font-semibold">Coming Soon</h3>
              <p className="text-muted-foreground mx-auto max-w-md">
                I&apos;m working on creating valuable content for you. Check back soon for articles about frontend development, React, TypeScript, and more.
              </p>
            </Card>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {categories.slice(0, 5).map((category) => (
                  <TabsTrigger key={category.slug} value={category.slug}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="all" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      variant="regular"
                    />
                  ))}
                </div>
              </TabsContent>
            {categories.slice(1).map((category) => (
              <TabsContent
                key={category.slug}
                value={category.slug}
                className="mt-8"
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts
                    .filter(
                      (post) =>
                        post.category.toLowerCase() ===
                        category.name.toLowerCase(),
                    )
                    .map((post) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        variant="regular"
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
            </Tabs>
          )}
        </section>

      </div>
    </div>
  );
}
