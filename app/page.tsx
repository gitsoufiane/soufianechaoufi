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
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code, Zap } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/app/blog/BlogCard";
import { projects } from "@/app/projects/projects";
import { posts } from "@/app/blog/posts";

export default function Home() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);

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
              <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent capitalize sm:text-6xl">
                soufiane chaoufi
              </h1>
              <div className="text-muted-foreground text-2xl sm:text-3xl">
                <span className="inline-block">Senior Frontend Developer</span>
              </div>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl">
                Building scalable web experiences that users love. 5+ years
                crafting exceptional digital products with React, TypeScript,
                and modern web technologies.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/projects">
                  View My Work
                  <Code className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/blog">
                  Read Articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <Link
                href="https://github.com/gitsoufiane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/soufianechaoufi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:contact@soufianechaoufi.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 sm:text-4xl">Featured Projects</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A selection of my recent work showcasing different technologies and approaches to modern web development.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 sm:text-4xl">Latest Articles</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Insights, tutorials, and thoughts on modern web development, career growth, and the evolving tech landscape.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} variant="featured" />
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

      {/* Skills Highlight */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl">What I Do Best</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Frontend Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Building responsive, accessible, and performant web applications using React, TypeScript, and modern CSS techniques. Focused on creating exceptional user experiences.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Performance & Optimization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Optimizing applications for speed and scalability through code splitting, lazy loading, and efficient state management. Making web apps fast and user-friendly.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">Performance</Badge>
                  <Badge variant="outline">SEO</Badge>
                  <Badge variant="outline">Accessibility</Badge>
                  <Badge variant="outline">Testing</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>




      {/* Call to Action */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to discuss your next project?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            I'm always interested in hearing about new opportunities and
            challenging projects. Let's create something amazing together.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Get In Touch
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/projects">
                View My Work
                <Code className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
