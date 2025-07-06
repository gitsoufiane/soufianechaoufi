import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { posts } from "../posts";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = posts.find((post) => post.slug === params.slug);

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postIndex = posts.findIndex((p) => p.slug === params.slug);
  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  // Simple markdown-to-JSX renderer for demonstration
  // In a real app, you'd use a proper markdown parser like react-markdown
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements = [];
    let currentElement = [];
    let inCodeBlock = false;
    let codeLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre key={i} className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
              <code className={`language-${codeLanguage}`}>
                {currentElement.join('\n')}
              </code>
            </pre>
          );
          currentElement = [];
          inCodeBlock = false;
          codeLanguage = '';
        } else {
          // Start code block
          inCodeBlock = true;
          codeLanguage = line.replace('```', '');
        }
        continue;
      }

      if (inCodeBlock) {
        currentElement.push(line);
        continue;
      }

      // Handle headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-4xl font-bold mt-8 mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-3xl font-bold mt-8 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-2xl font-bold mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // Handle inline code
      else if (line.includes('`') && !line.startsWith('```')) {
        const parts = line.split('`');
        const formatted = parts.map((part, index) => 
          index % 2 === 1 ? (
            <code key={index} className="bg-muted px-1 py-0.5 rounded text-sm">
              {part}
            </code>
          ) : part
        );
        elements.push(
          <p key={i} className="mb-4 leading-relaxed">
            {formatted}
          </p>
        );
      }
      // Handle regular paragraphs
      else if (line.trim() && !line.startsWith('#')) {
        elements.push(
          <p key={i} className="mb-4 leading-relaxed">
            {line}
          </p>
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
    <article className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          {post.imageUrl && (
            <div className="relative h-64 sm:h-80 mb-8 rounded-xl overflow-hidden">
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
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {post.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {renderContent(post.content)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t">
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
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/profil.png"
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{post.author}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Senior Frontend Developer with 5+ years of experience building scalable web applications. 
                  Passionate about React, TypeScript, and sharing knowledge with the developer community.
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/about">
                      Learn More
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contact">
                      Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        {(previousPost || nextPost) && (
          <div className="grid md:grid-cols-2 gap-6">
            {previousPost && (
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">Previous Article</div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${previousPost.slug}`}>
                      {previousPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {previousPost.description}
                  </p>
                </CardContent>
              </Card>
            )}
            {nextPost && (
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">Next Article</div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${nextPost.slug}`}>
                      {nextPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {nextPost.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you found this helpful, check out my other articles or get in touch to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/blog">
                More Articles
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </article>
  );
}