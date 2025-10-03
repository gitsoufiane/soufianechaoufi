import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "../posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Soufiane Chaoufi`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];


  return (
    <article className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="space-y-4">
            <Badge variant="secondary">{post.category}</Badge>
            <h1 className="text-4xl leading-tight font-bold sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-xl">{post.description}</p>

            <div className="flex items-center gap-6 text-sm border-t pt-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="mb-12 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => (
                <h1 className="mt-8 mb-4 text-4xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-8 mb-4 text-3xl font-bold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-6 mb-3 text-2xl font-bold">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-base">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-muted">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="border border-border px-4 py-2 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-4 py-2">{children}</td>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-primary underline hover:text-primary/80"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mb-12 flex flex-wrap gap-2 border-t pt-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Author Info */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src="/profil.png"
                  alt={post.author}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold">{post.author}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Senior Frontend Developer with 5+ years of experience building
                  scalable web applications. Passionate about React, TypeScript,
                  and sharing knowledge with the developer community.
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/blog">More Articles</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        {(previousPost || nextPost) && (
          <div className="grid gap-6 md:grid-cols-2">
            {previousPost && (
              <Card className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="text-muted-foreground mb-2 text-sm">
                    Previous Article
                  </div>
                  <h3 className="group-hover:text-primary mb-2 font-semibold transition-colors">
                    <Link href={`/blog/${previousPost.slug}`}>
                      {previousPost.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {previousPost.description}
                  </p>
                </CardContent>
              </Card>
            )}
            {nextPost && (
              <Card className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="text-muted-foreground mb-2 text-sm">
                    Next Article
                  </div>
                  <h3 className="group-hover:text-primary mb-2 font-semibold transition-colors">
                    <Link href={`/blog/${nextPost.slug}`}>
                      {nextPost.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {nextPost.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Call to Action */}
        <Card className="from-primary/10 to-primary/5 mt-12 bg-gradient-to-r p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold">Enjoyed this article?</h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            If you found this helpful, check out my other articles or get in
            touch to discuss your next project.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/blog">More Articles</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </Card>
      </div>
    </article>
  );
}
