import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";
import { posts, categories } from "./posts";

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
                <Card
                  key={post.slug}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl || "/blog/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute right-4 bottom-4 left-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground mb-4 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="group w-full">
                      <Link href={`/blog/${post.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
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
                I'm working on creating valuable content for you. Check back soon for articles about frontend development, React, TypeScript, and more.
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
                  <Card
                    key={post.slug}
                    className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={post.imageUrl || "/blog/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute right-2 bottom-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
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
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
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
                        <Link href={`/blog/${post.slug}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
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
                      <Card
                        key={post.slug}
                        className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="relative h-32 overflow-hidden">
                          <Image
                            src={post.imageUrl || "/blog/placeholder.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute right-2 bottom-2 left-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-2 text-sm">
                            {post.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(
                                  post.publishedAt,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readingTime} min</span>
                            </div>
                          </div>
                          <div className="mb-3 flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
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
                            <Link href={`/blog/${post.slug}`}>Read More</Link>
                          </Button>
                        </CardContent>
                      </Card>
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
