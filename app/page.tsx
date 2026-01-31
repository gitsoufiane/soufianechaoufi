import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Zap,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/app/blog/BlogCard";
import { projects } from "@/app/projects/projects";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);
  const posts = getAllPosts();
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8 text-center">
            <div className="relative mx-auto mb-8 h-32 w-32">
              <Image
                src="/profil.png"
                alt="Soufiane Chaoufi"
                fill
                sizes="(max-width: 768px) 128px, 128px"
                className="border-primary/10 rounded-full border-4 object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-foreground text-5xl font-bold capitalize sm:text-6xl">
                soufiane chaoufi
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl">
                Hi! I'm Soufiane. I write code, build interfaces, and love
                sharing what I learn along the way. This space is equal parts
                portfolio, blog, and digital notebook where I document my
                ongoing adventure in web development.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/projects">
                  See What I've Built
                  <Code className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/blog">
                  Read My Thoughts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <Link
                href="https://github.com/gitsoufiane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/soufianechaoufi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:contact@soufianechaoufi.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Featured Projects
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                A selection of my recent work showcasing different technologies
                and approaches to modern web development.
              </p>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Articles Section */}
      {featuredPosts.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Latest Articles
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                Insights, tutorials, and thoughts on modern web development,
                career growth, and the evolving tech landscape.
              </p>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  Read All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Explore My Work
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Discover the projects I've built and the articles I've written about
            modern web development.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/projects">
                View My Work
                <Code className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/blog">
                Read My Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
