import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { posts } from "../posts";

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

  // Simple markdown-to-JSX renderer for demonstration
  // In a real app, you'd use a proper markdown parser like react-markdown
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements = [];
    let currentElement = [];
    let inCodeBlock = false;
    let codeLanguage = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre
              key={i}
              className="bg-muted my-6 overflow-x-auto rounded-lg p-4"
            >
              <code className={`language-${codeLanguage}`}>
                {currentElement.join("\n")}
              </code>
            </pre>,
          );
          currentElement = [];
          inCodeBlock = false;
          codeLanguage = "";
        } else {
          // Start code block
          inCodeBlock = true;
          codeLanguage = line.replace("```", "");
        }
        continue;
      }

      if (inCodeBlock) {
        currentElement.push(line);
        continue;
      }

      // Handle headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="mt-8 mb-4 text-4xl font-bold">
            {line.replace("# ", "")}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="mt-8 mb-4 text-3xl font-bold">
            {line.replace("## ", "")}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="mt-6 mb-3 text-2xl font-bold">
            {line.replace("### ", "")}
          </h3>,
        );
      }
      // Handle inline code
      else if (line.includes("`") && !line.startsWith("```")) {
        const parts = line.split("`");
        const formatted = parts.map((part, index) =>
          index % 2 === 1 ? (
            <code key={index} className="bg-muted rounded px-1 py-0.5 text-sm">
              {part}
            </code>
          ) : (
            part
          ),
        );
        elements.push(
          <p key={i} className="mb-4 leading-relaxed">
            {formatted}
          </p>,
        );
      }
      // Handle regular paragraphs
      else if (line.trim() && !line.startsWith("#")) {
        elements.push(
          <p key={i} className="mb-4 leading-relaxed">
            {line}
          </p>,
        );
      }
      // Handle empty lines (spacing)
      else if (!line.trim()) {
        // Skip empty lines, spacing is handled by margins
      }
    }

    return elements;
  };

  return (
    <article className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
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
          {post.imageUrl && (
            <div className="relative mb-8 h-64 overflow-hidden rounded-xl sm:h-80">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="space-y-4">
            <Badge variant="secondary">{post.category}</Badge>
            <h1 className="text-4xl leading-tight font-bold sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-xl">{post.description}</p>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-muted-foreground flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg mb-12 max-w-none">
          {renderContent(post.content)}
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
